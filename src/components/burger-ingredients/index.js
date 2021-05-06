import React from 'react';
import cn from 'classnames';
import s from './style.module.css';
import PropTypes from 'prop-types';

import Cards from "../card";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredients = ({data}) => {
    const [current, setCurrent] = React.useState('one')

    const bun = data.filter((i) => i.type === "bun");
    const sauce = data.filter((i) => i.type === "sauce");
    const main = data.filter((i) => i.type === "main");
    return (
        <div className={cn(s.container)}>
            <h2 className={cn('mt-10', 'mb-5', 'text', 'text_type_main-large')}>Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent} className={cn("text", "text_type_main-default")}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={cn(s.card__container)}>
                <Cards title='Булки' ingredients={ bun } />
                <Cards title='Соусы' ingredients={ sauce } />
                <Cards title='Начинки' ingredients={ main } />
            </div>
        </div>
)
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number,
    })).isRequired,
}

export default BurgerIngredients
