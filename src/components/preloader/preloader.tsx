import React from 'react';
import styles from './style.module.css';

const Preloader = () => {
    return (
        <div className={styles["mk-spinner-wrap"]}>
            <div className={styles["mk-spinner-bubbles"]} />
        </div>
    )
}

export default Preloader;
