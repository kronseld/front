'use client';
import { endpoints } from "../api/config"
import { CardList } from "../components/CardsListSection/CardList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
export default function Tds() {
    const tdsGames = useGetDataByCategory(endpoints.games, 'TDS')
    return (
        tdsGames ? (
            <main className={"main-inner"}>
                <CardsListSection id="tds" title="Шутеры с видом сверху" data={tdsGames} />
            </main>            
        ) : (
            <Preloader />
        )
    )
}