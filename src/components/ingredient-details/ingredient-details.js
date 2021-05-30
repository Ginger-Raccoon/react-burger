import cn from 'classnames';
import PropTypes from "prop-types";
import s from './style.module.css'

const IngredientDetails = ({item}) => {
    return (
        <div className={cn(s.popup__container)}>
            <img src={item.image_large} alt='item_image' className={cn(s.popup__img, "mb-4")}/>
            <p className={cn(s.popup__subtitle, "text", "text_type_main-medium", "mb-8")}>{item.name}</p>
            <p className={cn(s.popup__descr, "text", "text_type_main-default", "mb-8")}>Превосходные котлеты из марсианской Магнолии
                для фирменных космических бургеров, набирающих популярность по всей вселенной.</p>
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
