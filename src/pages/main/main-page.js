import s from './style.module.css'
import cn from "classnames";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { CHOOSE_INGREDIENTS, INCREASE_COUNTER } from "../../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";
import Preloader from '../../components/preloader/preloader';

export function MainPage() {
    const dispatch = useDispatch();

    const { ingredientRequest, ingredientFailed, ingredientSuccess } = useSelector(store => store.ingredients);

    const handleDrop = (item) => {
        dispatch({
            type: CHOOSE_INGREDIENTS,
            item
        })
        dispatch({
            type: INCREASE_COUNTER,
            key: item._id,
            typeItem: item.type
        })
    };

    return (
        <>
            <div className={cn(s.main__container)}>
                {ingredientRequest && <Preloader />}
                {ingredientFailed && "Ошибка загрузки булочек..."}
                {!ingredientRequest && !ingredientFailed && ingredientSuccess && (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor onDropHandler={handleDrop} />
                    </DndProvider>
                )}
            </div>
        </>
    );
}

