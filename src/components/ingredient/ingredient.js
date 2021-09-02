import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from 'classnames';
import s from './style.module.css'

const Ingredient = ({ item }) => {
    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        }),
    });

    const { counts, bun } = useSelector(store => store.ingredients.burgerIngredients);
    const isBun = item.type === 'bun'
    const count = isBun && bun && bun._id === item._id ? 2 : counts[item._id] && counts[item._id]

    const opacity = isDrag ? 0.3 : 1;

    return (
        <div className={cn(s.ingredientsList__container)} ref={dragRef} style={{ opacity }} >
            <img className={cn('ml-4', 'mr-4', 'mb-1')} src={item.image} alt={item.name} />
            <p className={s.price}>
                <span className="text text_type_digits-default">{item.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={cn(s.name, 'mt-1', "text", "text_type_main-default")}>{item.name}</p>
            { count ? <Counter count={count} size="default" /> : null }
        </div>
    );
};

Ingredient.propTypes = {
    item: PropTypes.shape({
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
    }).isRequired,
}

export default  Ingredient;
