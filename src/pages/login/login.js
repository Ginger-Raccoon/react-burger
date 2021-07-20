import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import s from './style.module.css'
import cn from 'classnames';
import { Link } from 'react-router-dom';
import {Logo, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from '../../services/actions/auth';

export function LoginPage() {
    const [state, setState] = useState({
        login: '',
        password: '',
    });


    const userName = useSelector(store => store.auth.name)

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value,
        });
    };

    const onIconClick = useCallback(() => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert('Icon Click Callback');
    }, []);


    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login(state));
    };

    const hasToken = localStorage.getItem('refreshToken')

    if (userName || hasToken) {
        return (
            <Redirect
                to={
                    state?.from || '/'
                }
            />
        );
    } else {
    return (
        <>
            <div className={cn(s.container, 'mt-20')}>
                <form onSubmit={submitForm} className={cn(s.form, 'mt-20')}>
                    <h3 className={cn("text text_type_main-medium")}>Вход</h3>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={handleInputChange}
                        value={state.login}
                        name={'login'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ooops...'}
                        size={'default'}
                        onIconClick={onIconClick}
                    />
                    <PasswordInput
                        value={state.password}
                        name={'password'}
                        onChange={handleInputChange}
                    />
                    <Button type="primary" size="small" className={cn('mt-10')}>
                        <p className={cn("text text_type_main-default")}>Войти</p>
                    </Button>
                </form>
                <div className={cn(s.support__container, 'mt-20')}>
                    <span className={cn('text text_type_main-default text_color_inactive')}>Вы - новый пользователь?
                        <Link to='/register' className={cn('text text_type_main-default pl-2', s.link )}>Зарегистрироваться</Link>
                    </span>
                    <span className={cn("text text_type_main-default text_color_inactive")}>Забыли пароль?
                        <Link to='/forgot-password' className={cn('text text_type_main-default pl-2', s.link)}>Восстановить пароль</Link>
                    </span>
                </div>
            </div>
        </>
    );
    }
}
