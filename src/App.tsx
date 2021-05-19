import React from 'react';
import AppHeader from './components/app-header/index';
import BurgerConstructor from "./components/burger-ingredients";
import './App.css';
import BurgerIngredients from "./components/burger-constructor";
import { data } from './utils/data';

function App() {
  return (
    <div className="page">
      <AppHeader />
      <div className="main__container">
        <BurgerConstructor data={ data } />
        <BurgerIngredients />
      </div>
    </div>
  );
}

export default App;
