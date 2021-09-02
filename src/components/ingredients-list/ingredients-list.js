import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style.module.css';
import Ingredient from "../ingredient/ingredient";
import { useLocation, Link } from "react-router-dom";

const IngredientsList = React.forwardRef(({ id, title, ingredients }, ref) => {
    let location = useLocation()
 return(
     <section>
       <h3 className={cn('mt-10', 'mb-6', 'text', 'text_type_main-medium')} id={id} ref={ref}>{title}</h3>
         <ul className={cn(s.ingredientsList__section, 'ml-4')}>
             {ingredients.map((item) => (
                 <li key={item._id} className={s.ingredientsList__item}>
                     <Link to={{
                         pathname: `ingredients/${item._id}`,
                         state: { background: location }
                     }}
                     className={s.link}>
                         <Ingredient
                             item={item}
                         />
                     </Link>
                 </li>
             ))}
         </ul>
     </section>
 );
}
);

IngredientsList.propTypes = {
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.shape({
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
            }).isRequired),
            id: PropTypes.string,
        })
    )
}

export default IngredientsList
