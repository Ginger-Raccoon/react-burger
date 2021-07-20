import React from 'react';
import cn from 'classnames';
import s from './style.module.css';
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export function IngredientDetails() {
    let { id } = useParams();
    const  allIngredients= useSelector((store) => store.ingredients.allIngredients);
    const item = allIngredients.find(el => el._id === id)

    return (
        <div className={cn(s.popup__container)}>
            <img src={item.image} alt='item_image' className={cn(s.popup__img, "mb-4")}/>
            <p className={cn(s.popup__subtitle, "text", "text_type_main-medium", "mb-8")}>{item.name}</p>
            <p className={cn(s.popup__descry, "text", "text_type_main-default", "mb-8")}> Description in progress... </p>
            <ul className={cn(s.popup__info, "mb-15")}>
                <li className={cn(s.info__cal, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Калории,ккал</p> {item.calories}</li>
                <li className={cn(s.info__prot, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Белки, г</p> {item.proteins}</li>
                <li className={cn(s.info__fat, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Жиры, г</p> {item.fat}</li>
                <li className={cn(s.info__carb, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Углеводы, г</p> {item.carbohydrates}</li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    colories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
};


export default  IngredientDetails;
