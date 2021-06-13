import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import s from './style.module.css';
import {  useSelector, useDispatch } from 'react-redux';

import IngredientsList from "../ingredients-list/ingredients-list";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OPEN_MODAL } from '../../services/actions/modal'
const BurgerIngredients = () => {
    const dispatch = useDispatch()
    const [current, setCurrent] = useState('bun')
    const { data } = useSelector((store) => store.card);

    const getIngredients = (item) => {
        dispatch({
            type: OPEN_MODAL,
            isOpen: true,
            content: <IngredientDetails item={item} />,
            title: 'Детали ингредиента'
        })
    }

    const bun = data.filter((i) => i.type === "bun");
    const sauce = data.filter((i) => i.type === "sauce");
    const main = data.filter((i) => i.type === "main");

    const rootRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const handleScroll = () => {
        const bunDistance = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
        const sauceDistance = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
        const mainDistance = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
        const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
        const currentHeader = minDistance === bunDistance ? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
        setCurrent(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader))
    }

    useEffect(() => {
        if (current === 'bun') bunRef.current.scrollIntoView()
        else if (current === 'sauce') sauceRef.current.scrollIntoView()
        else if (current === 'main') mainRef.current.scrollIntoView()
    },[current])

    return (
        <div className={cn(s.container)}>
            <h2 className={cn('mt-10', 'mb-5', 'text', 'text_type_main-large')}>Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent} className={cn("text", "text_type_main-default")}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={cn(s.card__container)} ref={rootRef} onScroll={handleScroll} >
                <IngredientsList title='Булки' ingredients={ bun } id='bun' getIngredients={getIngredients} childRef={bunRef}/>
                <IngredientsList title='Соусы' ingredients={ sauce } id='sauce' getIngredients={getIngredients} childRef={sauceRef} />
                <IngredientsList title='Начинки' ingredients={ main } id='main' getIngredients={getIngredients} childRef={mainRef} />
            </div>
        </div>
    )
}



export default BurgerIngredients
