import { TopBar, Container, Title, ProductsGroupList, Filters, Stories } from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  // ? пропсы params и searchParams next js может передать сам
  const categories = await findPizzas(searchParams)
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
    </Container>
    <TopBar categories={categories.filter((category) => category.products.length > 0)} /> {/* Отдельно потому что топбар сам обернут в контейнер и не должен быть внутри этого контейнера */}

    <Stories />

    <Container className="pb-14 mt-10">
      <div className="flex gap-[80px]">
        {/* Фильтрация */}
        <div className="w-[250px]">
          {/* //? suspense нужен чтобы компонент с useSearchParams не делал всю страницу клиентской */}
          <Suspense>
            <Filters />
          </Suspense>
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