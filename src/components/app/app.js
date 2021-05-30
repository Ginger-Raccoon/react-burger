import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerIngredients  from "../burger-ingredients/burger-ingredients";
import './style.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import cn from 'classnames';
import s from './style.module.css';
import { getIngredients, CHOOSE_INGREDIENTS, INCREASE_COUNTER } from "../../services/actions/card";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    },[dispatch])

    const { data, ingredientRequest, ingredientFailed } = useSelector((store) => store.card);
    const { isOpen, title, content } = useSelector((store) => store.modal);


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
    <div className={cn(s.page)}>
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
        {isOpen && <Modal title={title}>{content}</Modal>}
    </div>
  );
}

export default App;
