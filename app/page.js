'use client'
import { getGamesByCategory } from './data/data-utils.js';
import { useGetDataByCategory } from './api/api-hooks.js';
import { Banner } from './components/banner/Banner'
import { CardList } from "./components/CardsListSection/CardList.jsx";
import { CardsListSection } from './components/CardsListSection/CardsListSection.jsx';
import { Promo } from './components/promo/Promo'
import { useState, useEffect } from 'react';
import { endpoints } from './api/config.js';
import { Preloader } from './components/Preloader/Preloader.jsx';
export default function Home() {
  const homePopularGames = useGetDataByCategory(endpoints.games, 'popular');
  const homeNewGames = useGetDataByCategory(endpoints.games, 'new');
  const [codeIsVisible, setCode] = useState(false)
  const handleButtonClick = () => {
    setCode(!codeIsVisible)
  }
  return (
    <main className="main">
      <Banner />
      {homePopularGames ? (
        <CardsListSection id='popular' title='Популярное' type='slider' data={homePopularGames}/>
      ) : (
        <Preloader />
      )}
      {homeNewGames ? (
        <CardsListSection id='new' title='Новое' type='slider' data={homeNewGames} />
      ) : (
        <Preloader />
      )}
      <Promo codeIsVisible={codeIsVisible} handleButtonClick={handleButtonClick} setCode={setCode} />
    </main>
  );
}
