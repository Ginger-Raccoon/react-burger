import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import s from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import IngredientsList from "../ingredients-list/ingredients-list";
import { useSelector } from '../../hooks';
import { filterArray } from "../../utils/functions";

const BurgerIngredients = () => {
    const [current, setCurrent] = useState<string>('bun')
    const { allIngredients } = useSelector((store) => store.ingredients);
    const { bun, sauce, main } = filterArray(allIngredients);
    const rootRef = useRef<HTMLElement>(null);
    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const handleScroll = () => {
        if (rootRef && bunRef && sauceRef && mainRef && rootRef.current && bunRef.current && sauceRef.current && mainRef.current) {
            const bunDistance = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
            const sauceDistance = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
            const mainDistance = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
            const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
            const currentHeader = minDistance === bunDistance ? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
            setCurrent(prevState => currentHeader === prevState ? prevState : currentHeader)
        }
    }

    useEffect(() => {
        document.querySelector(`#${current}`)?.scrollIntoView();
    },[current])

    return (
        <div className={cn(s.container)}>
            <h2 className={cn('mt-10', 'mb-5', 'text', 'text_type_main-large')}>Соберите бургер</h2>
            <div style={{ display: 'flex' }} className={cn("text", "text_type_main-default")}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent} >
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section className={cn(s.card__container)} ref={rootRef} onScroll={handleScroll} >
                <IngredientsList
                    title='Булки'
                    ingredients={ bun }
                    id='bun'
                    ref={ bunRef }
                />
                <IngredientsList
                    title='Соусы'
                    ingredients={ sauce }
                    id='sauce'
                    ref={ sauceRef }
                />
                <IngredientsList
                    title='Начинки'
                    ingredients={ main }
                    id='main'
                    ref={ mainRef }
                />
            </section>
        </div>
    )
}

export default BurgerIngredients
