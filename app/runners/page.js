'use client';
import { endpoints } from "../api/config"
import { CardList } from "../components/CardsListSection/CardList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
export default function Runners() {
    const runGames = useGetDataByCategory(endpoints.games, 'runner')
    return (
        runGames ? (
            <main className={"main-inner"}>
                <CardsListSection id="runners" title="Раннеры" data={runGames} />
            </main>
        ) : (
            <Preloader />
        )
    )
}