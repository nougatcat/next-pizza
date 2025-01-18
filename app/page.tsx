import { TopBar, Container, Title, ProductsGroupList } from "@/components/shared";
import { Filters } from "@/components/shared";

export default function Home() {
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
    </Container>
    <TopBar /> {/* Отдельно потому что топбар сам обернут в контейнер и не должен быть внутри этого контейнера */}

    <Container className="pb-14 mt-10">
      <div className="flex gap-[80px]">
        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters />
        </div>
        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList title="Пиццы" items={[
              {
                id: 1,
                name: "Бургер-пицца",
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7d61698827ee9b8db6d0aec53410.avif',
                price: 550,
                items: [{ price: 550 }]
              },
              {
                id: 1,
                name: "Бургер-пицца",
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7d61698827ee9b8db6d0aec53410.avif',
                price: 550,
                items: [{ price: 550 }]
              },
              {
                id: 1,
                name: "Бургер-пицца",
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7d61698827ee9b8db6d0aec53410.avif',
                price: 550,
                items: [{ price: 550 }]
              },
              {
                id: 1,
                name: "Бургер-пицца",
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7d61698827ee9b8db6d0aec53410.avif',
                price: 550,
                items: [{ price: 550 }]
              },
            ]} categoryId={1} />
            <ProductsGroupList title="Завтрак" items={[
              {
                id: 1,
                name: "Омлет",
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7970328e722d877398a9cf6e312b.avif',
                price: 550,
                items: [{ price: 550 }]
              },
              {
                id: 1,
                name: "Омлет",
                imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7970328e722d877398a9cf6e312b.avif',
                price: 550,
                items: [{ price: 550 }]
              },
            ]} categoryId={1} />
          </div>
        </div>
      </div>
    </Container>
  </>
}