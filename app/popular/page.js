'use client';
import { endpoints } from "../api/config"
import { CardList } from "../components/CardsListSection/CardList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
export default function Popular() {
    const popularGames = useGetDataByCategory(endpoints.games, 'popular')
    return (
        popularGames ? (
            <main className={"main-inner"}>
                <CardsListSection id="popular" title="Популярные" data={popularGames} />
            </main>
        ) : (
            <Preloader />
        )
    )
}