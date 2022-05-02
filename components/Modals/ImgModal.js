import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./ImgModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <span className={classes.close} onClick={props.onClose}>X</span>
      <div className={classes.wrapper}>
        <img className={classes.modalImg} src={props.src} alt="" />
        {props.children}
      </div>
    </div>
  );
};


const ImgModal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {portalElement && ReactDOM.createPortal(
        <ModalOverlay src={props.src} onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
      {portalElement && ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
    </Fragment>
  );
};

export default ImgModal;