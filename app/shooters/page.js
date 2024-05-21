'use client';
import { endpoints } from "../api/config"
import { CardList } from "../components/CardsListSection/CardList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
export default function Shooters() {
    const shootGames = useGetDataByCategory(endpoints.games, 'shooter')
    return (
        shootGames ? (
            <main className={"main-inner"}>
                <CardsListSection id="shooters" title="Шутеры" data={shootGames} />
            </main>
        ) : (
            <Preloader />
        )
    )
}