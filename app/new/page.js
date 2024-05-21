'use client';
import { endpoints } from "../api/config"
import { CardList } from "../components/CardsListSection/CardList"
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
export default function New() {
    const newGames = useGetDataByCategory(endpoints.games, "new");
    return (
        <main className="main-inner">
          {newGames ? (
            <CardsListSection id="new" title="Новые" data={newGames} />
          ) : (
            <Preloader />
          )}
        </main>
      );
}