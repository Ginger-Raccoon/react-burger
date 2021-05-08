import React, {useEffect, useState} from 'react';
import AppHeader from './components/app-header/index';
import BurgerConstructor from "./components/burger-ingredients";
import './App.css';
import BurgerIngredients from "./components/burger-constructor";
import {url} from "./utils/data";
import Modal from "./components/modal";

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
    <div className="page">
      <AppHeader />
      <div className="main__container">
          <BurgerConstructor data={state.data} setModal={setModal}/>
          <BurgerIngredients setModal={setModal}/>
      </div>
        {modal.isOpen && <Modal setModal={setModal} title={modal.title}>{modal.content}</Modal>}
    </div>
  );
}

export default App;
