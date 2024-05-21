"use client";
import { useState, useEffect } from 'react';
import Styles from "./Game.module.css";
import { endpoints } from '@/app/api/config';
import { 
  getNormalizedGameDataById, 
  isResponseOk,
  checkIfUserVoted,
  vote
 } from '@/app/api/api-utils';
import { Preloader } from '@/app/components/Preloader/Preloader';
import { Popup } from '@/app/components/Popup/Popup';
import { Overlay } from '@/app/components/Overlay/Overlay';
import { AuthForm } from '@/app/components/AuthForm/AuthForm';
import { useStore } from '@/app/store/app-store';
export default function GamePage(props) {
  const authContext = useStore();
  const [game, setGame] = useState();
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const handleVote = async () => {
    const jwt = authContext.token;
    let usersIdArray = game.users.length ? game.users.map((user) => user.id) : [];
    usersIdArray.push(authContext.user.id);
    const response = await vote(`${endpoints.games}/${game.id}`,  jwt, usersIdArray);
  if (isResponseOk(response)) {
      setIsVoted(true);
      setGame(() => {
        return {
          ...game,
        users: [...game.users, authContext.user],
      };
    });
    }
  }; 
  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true);
      const game = await getNormalizedGameDataById(
      endpoints.games,
      props.params.id
    );
    isResponseOk(game) ? setGame(game) : setGame(null);
    setPreloaderVisible(false);
  }
  fetchData();
  }, [])
  useEffect(() => {
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
}, [authContext.user, game]); 
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const changePopup = () => {
    setPopupIsOpened(!popupIsOpened)
  }
  const closePopup = () => {
    setPopupIsOpened(false)
  }
  return (
    <main className="main">
      {game ? (
      <>
        <section className={Styles["game"]}>
          <iframe
            className={Styles["game__iframe"]}
            src={game.link}
          ></iframe>
        </section>
        <section className={Styles["about"]}>
          <h2 className={Styles["about__title"]}>{game.title}</h2>
          <div className={Styles["about__content"]}>
            <p className={Styles["about__description"]}>
              {game.description}
            </p>
            <div className={Styles["about__author"]}>
              <p>
                Автор:
                <span className={Styles["about__accent"]}>{game.developer}</span>
              </p>
            </div>
          </div>
          <div className={Styles["about__vote"]}>
            <p className={Styles["about__vote-amount"]}>
              За игру уже проголосовали:
              <span className={Styles["about__accent"]}>{game.users.length}</span>
            </p>            
            <button
                disabled={!authContext.isAuth || isVoted}
                className={`button ${Styles["about__vote-button"]}`}
                onClick={handleVote}
            >
              {isVoted ? "Голос учтён" : "Голосовать"}
            </button>
          </div>
        </section>
      </>
      )
      : ( preloaderVisible ? (
        <Preloader />
      ) : (
        <section className={Styles['game_error']}>
          <img src='https://уцпп.рф/wp-content/uploads/2019/04/error.jpg'/>        
          <p>Такой игры не существует...</p>
        </section>
      )
      )}
        <Overlay popupIsOpened={popupIsOpened} changePopup={changePopup} closePopup={closePopup} />
        <Popup popupIsOpened={popupIsOpened} changePopup={changePopup} closePopup={closePopup}>
         <AuthForm changePopup={changePopup} closePopup={closePopup} />
        </Popup>
    </main>
  );
}