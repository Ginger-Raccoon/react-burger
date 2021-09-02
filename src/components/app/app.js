import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.module.css';
import Modal from "../modal/modal";
import {ResetPasswordPage, LoginPage, MainPage, RegisterPage, ProfilePage, FeedPage, OrderPage} from '../../pages'
import cn from 'classnames';
import s from './style.module.css';
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";

function App() {
    const { isOpen, title, content } = useSelector((store) => store.modal);


  return (
    <div className={cn(s.page)}>
        <Router>
            <Switch>
                <Route path='/' exact={true}>
                    <MainPage />
                </Route>
                <Route path='/login' exact={true}>
                    <LoginPage />
                </Route>
                <Route path='/register' exact={true}>
                    <RegisterPage />
                </Route>
                <Route path='/forgot-password' exact={true}>
                    <ForgotPasswordPage />
                </Route>
                <Route path='/reset-password' exact={true}>
                    <ResetPasswordPage />
                </Route>
                <Route path='/profile'>
                    <ProfilePage />
                </Route>
                <Route path='/feed' exact={true}>
                    <FeedPage />
                </Route>
                <Route path='/feed/:id' exact={true}>
                    <OrderPage />
                </Route>
                <Route path='/ingredients/:id' exact={true}>
                    <h1>Здесь что-то будет... Но это не точно</h1>
                </Route>
            </Switch>
        </Router>
        {isOpen && <Modal title={title}>{content}</Modal>}
    </div>
  );
}

export default App;
