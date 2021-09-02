import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style.module.css';
import Ingredient from "../ingredient/ingredient";

const IngredientsList = ({ingredients, id, getIngredients, title, childRef}) => {
 return(
     <>
       <h3 className={cn('mt-10', 'mb-6', 'text', 'text_type_main-medium')} id={id} ref={childRef}>{title}</h3>
         <div className={cn(s.ingredientsList__section, 'ml-4')}>
             {ingredients.map((item) => <Ingredient item={item} getIngredients={getIngredients} key={item._id}/> )}
         </div>
     </>
 )
}

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
            getIngredients: PropTypes.func
        })
    )
}

export default IngredientsList
