import React, {useContext} from 'react';
import cn from 'classnames';
import s from './style.module.css';
import PropTypes from 'prop-types';

import Cards from "../card/card";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from "../ingredient-details/ingredient-details";
import {BurgerContext} from "../../services/burgerContext";

const BurgerIngredients = ({setModal}) => {
    const [current, setCurrent] = React.useState('one')
    const { state } = useContext(BurgerContext);

    const getData = (item) => {
        setModal ({
                isOpen: true,
                content: <IngredientDetails item={item}/>,
                title: 'Детали ингредиента'
                }
        )
    }

    const bun = state.data.filter((i) => i.type === "bun");
    const sauce = state.data.filter((i) => i.type === "sauce");
    const main = state.data.filter((i) => i.type === "main");
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
                <Cards title='Булки' ingredients={ bun } getData={getData}/>
                <Cards title='Соусы' ingredients={ sauce } getData={getData}/>
                <Cards title='Начинки' ingredients={ main } getData={getData}/>
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
