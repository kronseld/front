import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  return (
    <div
    className={`${Styles["overlay"]} ${props.popupIsOpened && Styles["overlay_is-opened"]}`}
    onClick={props.changePopup}
    ></div>
  );
};
