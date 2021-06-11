import s from './main.module.css'
import AppHeader from "../../components/app-header/app-header";
import cn from "classnames";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import React, {useEffect} from "react";
import {CHOOSE_INGREDIENTS, getIngredients, INCREASE_COUNTER} from "../../services/actions/card";
import {useDispatch, useSelector} from "react-redux";

export function MainPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    },[dispatch])

    const { data, ingredientRequest, ingredientFailed } = useSelector((store) => store.card);

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
            <AppHeader />
            <div className={cn(s.main__container)}>
                {ingredientRequest && "Загружаю булочки..."}
                {ingredientFailed && "Ошибка загрузки булочек..."}
                {!ingredientRequest && !ingredientFailed && data.length && (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor onDropHandler={handleDrop} />
                    </DndProvider>
                )}
            </div>
        </>
    );
};

