import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-ingredients/burger-ingredients";
import './style.module.css';
import BurgerIngredients from "../burger-constructor/burger-constructor";
import {url} from "../../utils/data";
import Modal from "../modal/modal";

import cn from 'classnames';
import s from './style.module.css';

function App() {

    const [state, setState] = useState({
        data: [],
        success: false
    });

    const [modal, setModal] = useState({
        isOpen: false,
        content: null,
        title: null
    })

    const getData = () => {
        setState({...state, success: false});
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Ошибка сети')
                }
            })
            .then(data => {
                setState({
                    data: data.data,
                    success: data.success
                })
            })
            .catch(() => {
                setState({
                    ...state,
                    success: false
                })
            })
    }

    useEffect(() => {
        getData()
    },[])


  return (
    <div className={cn(s.page)}>
      <AppHeader />
      <div className={cn(s.main__container)}>
          <BurgerConstructor data={state.data} setModal={setModal}/>
          <BurgerIngredients setModal={setModal}/>
      </div>
        {modal.isOpen && <Modal setModal={setModal} title={modal.title}>{modal.content}</Modal>}
    </div>
  );
}

export default App;