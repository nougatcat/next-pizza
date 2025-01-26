import { prisma } from "@/prisma/prisma-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) { //? NextRequest отличается от Request другой типизацией
    //console.log(req.nextUrl.searchParams.get('query')) //выведет в консоль query запрос
    const query = req.nextUrl.searchParams.get('query') || ''
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive', //к регистру
            }
        },
        take: 5,
    })
    return NextResponse.json(products)
}