import React, { useState, useRef, useCallback } from 'react';
import s from './style.module.css'
import cn from "classnames";
import {Button, Input, Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';

export function ForgotPasswordPage() {
    const inputRef = useRef(null)
    const [value, setValue] = useState('')

    const hasToken = localStorage.getItem('refreshToken');
    const dispatch = useDispatch();

    const onIconClick = useCallback(() => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert('Icon Click Callback');
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(value))
    };

    if (hasToken) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    return (
        <>
            <div className={cn(s.container, 'mt-20')}>
                <Logo />
                <form className={cn(s.form, 'mt-20')} onSubmit={submitForm}>
                    <h3 className={cn("text text_type_main-medium")}>Восстановление пароля</h3>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setValue(e.target.value)}
                        ref={inputRef}
                        value={value}
                        size={'default'}
                        errorText={'Ooops!'}
                        error={false}
                        onIconClick={onIconClick}
                    />
                    <Button type="primary" size="small" className={cn('mt-10')}>
                        <p className={cn("text text_type_main-default")}>Восстановить</p>
                    </Button>
                </form>
                <div className={cn(s.support__container, 'mt-20')}>
                    <span className={cn("text text_type_main-default text_color_inactive")}>Вспомнили пароль?
                        <Link to='/login' className={cn('text text_type_main-default pl-2', s.link)}>Войти</Link>
                    </span>
                </div>
            </div>
        </>
    );
}
