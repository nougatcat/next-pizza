import { TopBar, Container, Title } from "@/components/shared";
import { Filters } from "@/components/shared";

export default function Home() {
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
    </Container>
    <TopBar /> {/* Отдельно потому что топбар сам обернут в контейнер и не должен быть внутри этого контейнера */}

    <Container className="pb-14 mt-10">
      <div className="flex gap-[60px]">
        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters />
        </div>
        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">Список товаров</div>
        </div>
      </div>
    </Container>
  </>
}