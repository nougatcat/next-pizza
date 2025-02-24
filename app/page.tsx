import { TopBar, Container, Title, ProductsGroupList } from "@/components/shared";
import { Filters } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        }
      }
    }
  }) // позволяет получать данные так - categories[0].products[0].items
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
    </Container>
    <TopBar categories={categories.filter((category) => category.products.length > 0)} /> {/* Отдельно потому что топбар сам обернут в контейнер и не должен быть внутри этого контейнера */}

    <Container className="pb-14 mt-10">
      <div className="flex gap-[80px]">
        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters />
        </div>
        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {
              categories.map((category) => (
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                )
              ))
            }
          </div>
        </div>
      </div>
    </Container>
  </>
}