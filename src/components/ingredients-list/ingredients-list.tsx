import React from 'react';
import cn from 'classnames';
import s from './style.module.css';
import Ingredient from "../ingredient/ingredient";
import { useLocation, Link } from "react-router-dom";
import { TIngredient } from '../../types';
import { TIngredientRef } from './types';

const IngredientsList = React.forwardRef<HTMLHeadingElement, TIngredientRef>(({ id, title, ingredients }, ref) => {
    let location = useLocation()
    return(
        <section>
            <h3 className={cn('mt-10', 'mb-6', 'text', 'text_type_main-medium')} id={id} ref={ref}>{title}</h3>
            <ul className={cn(s.ingredientsList__section, 'ml-4')}>
                {ingredients.map((item: TIngredient) => (
                    <li key={item._id} className={s.ingredientsList__item}>
                        <Link to={{
                            pathname: `ingredients/${item._id}`,
                            state: { background: location }
                        }}
                        className={s.link}>
                        <Ingredient {...item} />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
});


export default IngredientsList
