import { TopBar, Container, Title } from "@/components/shared";

export default function Home() {
  return <>
    <Container className="mt-10">
      <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
    </Container> 
    <TopBar /> {/* Отдельно потому что топбар сам обернут в контейнер и не должен быть внутри этого контейнера */}
  </>
}