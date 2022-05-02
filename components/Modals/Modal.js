import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Image from "next/image";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={`${classes.modal} ${props.className}`}>
            <span className={classes.close} onClick={props.onClose}>X</span>
            <div className={classes.wrapper}>
                <Image className={classes.successIcon} width={'25px'} height={'25px'} src={props.src} alt="" />
                <span>Sukces!</span>
                {props.children}
            </div>
        </div>
    );
};


const Modal = (props) => {
    const portalElement = document.getElementById("overlays");
    return (
        <Fragment>
            {portalElement && ReactDOM.createPortal(
                <ModalOverlay className={props.className} src={props.src} onClose={props.onClose}>{props.children}</ModalOverlay>,
                portalElement
            )}
            {portalElement && ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;