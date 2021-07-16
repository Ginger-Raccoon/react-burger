import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import s from './style.module.css';
import { getIngredientsRequest } from '../../utils/api';
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";


export function IngredientDetails() {
    const [currentBurger, setCurrentBurger] = useState({
        image: '',
        name: '',
        calories: '',
        proteins: '',
        fat: '',
        carbohydrates: '',
    })

    let { id } = useParams();
    useEffect(() => {
        getIngredientsRequest()
            .then((res) => {
                const burger = res.data.find((el) => el._id === id)
                setCurrentBurger({
                    image: burger.image,
                    name: burger.name,
                    calories: burger.calories,
                    proteins: burger.proteins,
                    fat: burger.fat,
                    carbohydrates: burger.carbohydrates,
                })
            })
    }, [id]);

    const { image, name, calories, proteins, fat, carbohydrates } = currentBurger;

    return (
        <div className={cn(s.popup__container)}>
            <img src={image} alt='item_image' className={cn(s.popup__img, "mb-4")}/>
            <p className={cn(s.popup__subtitle, "text", "text_type_main-medium", "mb-8")}>{name}</p>
            <p className={cn(s.popup__descry, "text", "text_type_main-default", "mb-8")}> Description in progress... </p>
            <ul className={cn(s.popup__info, "mb-15")}>
                <li className={cn(s.info__cal, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Калории,ккал</p> {calories}</li>
                <li className={cn(s.info__prot, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Белки, г</p> {proteins}</li>
                <li className={cn(s.info__fat, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Жиры, г</p> {fat}</li>
                <li className={cn(s.info__carb, "text", "text_type_digits-default")}><p className={cn("text", "text_type_main-default", "mt-2")}>Углеводы, г</p> {carbohydrates}</li>
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
