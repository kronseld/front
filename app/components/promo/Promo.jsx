import Styles from './Promo.module.css'
import { useEffect } from 'react'
export const Promo = (props) => {
  useEffect(() => {
    let timeout;
    if (props.codeIsVisible) {
        timeout = setTimeout(() => {
          props.setCode(false);
        }, 5000);
    }
    return () => {
      clearTimeout(timeout);
  };
  }, [props.codeIsVisible])
    return (
        <section className={Styles['promo']}>
        <div className={Styles['promo__description-block']}>
          <h2 className={Styles['promo__title']}>Твой промо-код</h2>
          <p className={Styles['promo__description']}>Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!</p>
          <button className={`button ${Styles['promo__button']}`} onClick={props.handleButtonClick}>
            {props.codeIsVisible == true ? <span className={Styles["promo-code"]}>WEBTEENS10</span> : 'Получить код' }
          </button>
        </div>
        <img src="/images/promo-illustration.svg" alt="Собака" className={Styles['promo__image']}/>
      </section>
    )
}