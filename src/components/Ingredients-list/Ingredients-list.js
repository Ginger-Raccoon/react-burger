import React, {useContext} from 'react';
import cn from 'classnames';
import {  CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import s from './style.module.css';
import PropTypes from "prop-types";
import {BurgerContext} from "../../services/burgerContext";

const IngredientsList = (props) => {
    const { state, setState } = useContext(BurgerContext);
 return(
     <>
       <h3 className={cn('mt-10', 'mb-6', 'text', 'text_type_main-medium')}>{props.title}</h3>
         <div className={cn(s.ingredientsList__section, 'ml-4')}>
             {props.ingredients.map((e) => {
                 const handleClick = () => {
                     props.getData(e)
                 }
                 return (
                     <div className={cn(s.ingredientsList__container)} key={e._id} onClick={handleClick}>
                         <img className={cn('ml-4', 'mr-4', 'mb-1')} src={e.image} alt={e.name} />
                         <p className={s.price}>
                             <span className="text text_type_digits-default">{e.price}</span>
                             <CurrencyIcon type="primary" />
                         </p>
                         <p className={cn(s.name, 'mt-1', "text", "text_type_main-default")}>{e.name}</p>
                         <Counter count={1} size="default" />
                     </div>
                 )
             })}
         </div>
     </>
 )
}

IngredientsList.propTypes = {
    title: PropTypes.string,
    openModal: PropTypes.func,
    ingredients: PropTypes.array,
    e: PropTypes.object
}

export default IngredientsList
