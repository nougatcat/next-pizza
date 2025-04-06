import { prisma } from './../../../../prisma/prisma-client';
//? Эта директория и этот файл написаны по примеру из документации NextAuth

import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
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
                    id: String(findUser.id),
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
        async jwt({ token }) { //находим есть ли в бд такой емаил
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

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
// export default NextAuth(authOptions) //! так нельзя в App Router