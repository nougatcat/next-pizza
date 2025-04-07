
import NextAuth, { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';
import { prisma } from "@/prisma/prisma-client";

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            profile(profile) { //вытаскиваем инфу о пользователе из гитхаба
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole
                }
            }
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" }, //чтобы next-auth понимал, какие поля будут передаваться, валидация
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) { //проверка данных по бд
                if (!credentials) {
                    return null
                }
                const values = {
                    email: credentials.email
                }

                const findUser = await prisma.user.findFirst({
                    where: values,
                })

                if (!findUser) {
                    return null
                }

                const isPasswordValid = await compare(credentials.password, findUser.password) // сравнить хэш пароля введенного с тем что в бд

                if (!isPasswordValid) {
                    return null
                }

                if (!findUser.verified) { // пароль верен, но акк не активирован
                    return null
                }

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role
                } // инфа нужна в.т.ч. для дэшборда (админ панели), но самого дэшборда нет
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: { //проверка jwt токена
        async signIn({user, account}) {
            try {
                if (account?.provider === 'credentials') { //если вход по емаил и паролю, то выходим из функции и возвращаем true
                    return true
                }

                if (!user.email) { //если при заходе через провайдер у пользователя нет емаила, то возвращаем false (например, гитхаб без почты, каким-то образом)
                    return false
                }
                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email }, //email мог быть изменен в гитхабе, но должен быть хотя бы AcoountID
                        ]
                    }
                })
                if (findUser) { //если пользователь уже есть в бд, то обновляем его инфу, чтобы сохранить accountId на случай если он сменит почту
                    await prisma.user.update({
                        where: {
                            id: findUser.id
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId
                        }
                    })
                    return true
                }
                //если пользователя по провайдеру нет в бд, то создаем запись о нем в бд
                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || 'User#' + user.id,
                        password: hashSync(user.id.toString(), 10), //! так генерить пароль небезопасно, нужно либо генерить его не по id, либо сделать пароль опциональным, т.к. для провайдера в нем нет необходимости
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId
                    }
                })
                return true
            } catch (error) {
                console.error('Error [SIGNIN]', error)
                return false
            }
        },
        async jwt({ token }) { //находим есть ли в бд такой емаил
            if (!token.email) return token
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })
            if (findUser) { //если есть, то вшиваем в токен инфу пользователя
                token.id = String(findUser.id)
                token.role = findUser.role
                token.fullName = findUser.fullName
                token.email = findUser.email
            }
            return token
        },
        session({session, token}) {
            if (session?.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        }
    }
}