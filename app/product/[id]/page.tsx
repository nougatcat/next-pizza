import { Container, GroupVariants, ProductImage, Title } from "@/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {

    const id_number = Number(id)
    if (isNaN(id_number)) {
        return notFound()
    } //если id не число, то выдаст код 404. Мой квик фикс для гайда
    const product = await prisma.product.findFirst({ where: { id: id_number } })

    if (!product) {
        return notFound()
    }
    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage imageUrl={product.imageUrl} size={40} />
                <div className="w-[490px] bg-[#f7f6f5] p-7">
                    <Title text={product.name} size='md' className="font-extrabold mb-1" />
                    <p className="text-gray-400">ничего ничего ничего еще с сервака не загрузил сюда</p>
                    <GroupVariants
                        selectedValue="2"
                        items={[
                            {
                                name: 'Маленькая',
                                value: '1',
                            },
                            {
                                name: 'Средняя',
                                value: '2',
                            },
                            {
                                name: 'Большая',
                                value: '3',
                                disabled: true
                            }
                        ]} />
                </div>
            </div>
        </Container>
    )
}
