import React, { FC } from 'react';
import s from './style.module.css'
import { TProps } from './types';

const ModalOverlay: FC<TProps> = (props) => {
    return (
        <div className={s.overlay} onClick={props.closeModal}>
        </div>
    );
};

export default  ModalOverlay;
