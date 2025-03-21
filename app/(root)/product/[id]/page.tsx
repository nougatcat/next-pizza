
import { Container, ProductForm} from "@/shared/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {

////
    const id_number = Number(id)
    if (isNaN(id_number)) {
        return notFound()
    } //если id не число, то выдаст код 404. Мой квик фикс для гайда
////
    const product = await prisma.product.findFirst({
        where: { id: id_number }, include: {
            ingredients: true,
            category: { //для рекомендаций
                include: {
                    products: {
                        include: {
                            items: true
                        }
                    }
                }
            },
            items: true
        }
    })
    


    if (!product) {
        return notFound()
    }


    return (
        <Container className="flex flex-col my-10">
            <ProductForm product={product}/>
        </Container>
    )
}
