'use client';
import { endpoints } from "../api/config"
import { CardList } from "../components/CardsListSection/CardList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks"
import { Preloader } from "../components/Preloader/Preloader";
export default function Pixel_games() {
    const pixGames = useGetDataByCategory(endpoints.games, 'pixel')
    return (
        pixGames ? (
            <main className={"main-inner"}>
                <CardsListSection id="pixel" title="Пиксельные" data={pixGames} />
            </main>
        ) : (
            <Preloader />
        )
    )
}