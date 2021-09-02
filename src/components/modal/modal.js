import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import {  CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import s from './style.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CLOSE_MODAL } from '../../services/actions/modal'


const Modal = (props) => {
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch({
            type: CLOSE_MODAL
        })
    }

    const close = (event) => {
        if(event.keyCode === 27) closeModal()
    }

    useEffect(() => {
        window.addEventListener('keydown', close)

        return () => {
            window.removeEventListener('keydown', close)
        }
    },[])

    return ReactDOM.createPortal ((
        <>
        <div className={cn(s.popup)}>
            <div className={cn(s.popup__header, "mt-10  ", "ml-10", "mr-10")}>
                <h1>{props.title}</h1>
                <CloseIcon type="primary" onClick={closeModal}/>
            </div>
            {props.children}
        </div>
            <ModalOverlay closeModal={closeModal}/>
        </>
    ), document.querySelector("#modal"))
}

Modal.propTypes = {
    children: PropTypes.element
}

export default Modal;



