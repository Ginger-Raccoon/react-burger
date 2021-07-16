import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import './style.module.css';
import {ResetPasswordPage, LoginPage, MainPage, RegisterPage, ProfilePage, FeedPage, OrderPage} from '../../pages'
import cn from 'classnames';
import s from './style.module.css';
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ProtectedRoute} from "../protected-route";
import OrderDetails from "../order-details/order-details";

function App() {
    let location = useLocation();
    const history = useHistory();
    let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

  return (
    <div className={cn(s.page)}>
            <AppHeader />
            <Switch>
                <Route path='/' exact >
                    <MainPage />
                </Route>
                <Route path='/login' exact >
                    <LoginPage />
                </Route>
                <Route path='/register' >
                    <RegisterPage />
                </Route>
                <Route path='/forgot-password' exact >
                    <ForgotPasswordPage />
                </Route>
                <Route path='/reset-password' exact >
                    <ResetPasswordPage />
                </Route>
                <Route path='/profile'>
                    <ProfilePage />
                </Route>
                <Route path='/feed' exact >
                    <FeedPage />
                </Route>
                <Route path='/feed/:id' exact >
                    <OrderPage />
                </Route>
                <Route path='/ingredients/:id' exact >
                    <IngredientDetails />
                </Route>
            </Switch>
        {background &&
            (<>
                <Route path='/ingredients/:id' children={<Modal><IngredientDetails /></Modal>} />
                <ProtectedRoute path='/profile/orders/:id' children={<Modal><OrderPage /></Modal>} />
                <Route path='/feed/:id' children={<Modal><OrderPage /></Modal>} />
                <ProtectedRoute path='/order' children={<Modal><OrderDetails /></Modal>} />
            </>
                )}
    </div>
  );
}

export default App;
