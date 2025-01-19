// //код из гайда
// import {PrismaClient} from '@prisma/client'

// const prismaClientSingleton = () => {
//     return new PrismaClient()
// }

// declare global {
//     let prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
// }

// export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma




//код с сайта призма чтобы избежать создания нескольких prisma instances
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
