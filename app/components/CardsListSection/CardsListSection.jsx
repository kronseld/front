import Styles from './CardListSection.module.css'
import { CardList } from "./CardList";
import { CardSlider } from "./CardSlider";

export const CardsListSection = (props) => {
  return (
    <section className={Styles["list-section"]}>
      <h2 className={Styles["list-section__title"]} id={props.id}>
        {props.title}
      </h2>
      {props.type === 'slider' ? <CardSlider data={props.data} /> : <CardList data={props.data} />}
    </section>
  );
}; 
