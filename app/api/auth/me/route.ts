import { prisma } from "@/prisma/prisma-client"
import { authOptions } from "@/shared/constants/auth-options"
// import { getUserSession } from "@/shared/lib/get-user-session"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic' //для багфикса

export async function GET(req: any, res: any) {
    try {
        // const user = await getUserSession() //! есть баг с асинхронным контекстом на уровне next-js, поэтому билд может не работать в этом месте
        const user = await getServerSession(req, res, authOptions) // багфикс
        
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы'}, { status: 401 })
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.user.id)
            },
            select: { //вытаскиваем эти поля из ответа (первые два, а третье - нет)
                fullName: true,
                email: true,
                password: false,
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: '[USER_GET] Server error'}, {status: 500})
    }
}