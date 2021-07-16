import React, { useState } from 'react';
import s from './style.module.css'
import {Button, Input, Logo, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Redirect, Link } from 'react-router-dom';
import { resetPassword } from '../../services/actions/auth';
import { resetPasswordRequest } from '../../utils/api';
import { useSelector, useDispatch } from 'react-redux';

export function ResetPasswordPage() {
    const inputRef = React.useRef(null)
    const [state, setState] = useState({
        password: '',
        token: ''
    });

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value
        });
    }

    const onIconClick = (e) => {
        setTimeout(() => inputRef.focus(), 0)
        const inputName = e.target.closest('.input').querySelector('.input__placeholder').textContent;
        alert(`Произошел тык в ${inputName}`)
    }

    const formSubmit = event => {
        event.preventDefault()
        dispatch(resetPassword(state))
        resetPasswordRequest(state)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const isforgotPasswordSuccess = useSelector(store => store.auth.isforgotPasswordSuccess);

    if (localStorage.getItem('refreshToken')) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    } else if (!localStorage.getItem('refreshToken') && !isforgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        );
    } else {
        return (
            <>
                <div className={cn(s.container, 'mt-20')}>
                    <Logo/>
                    <form className={cn(s.form, 'mt-20')} onSubmit={formSubmit}>
                        <h3 className={cn("text text_type_main-medium")}>Восстановление пароля</h3>
                        <PasswordInput
                            value={state.password}
                            name={'password'}
                            onChange={handleInputChange}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={handleInputChange}
                            value={state.token}
                            name={'token'}
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ooops'}
                            size={'default'}
                        />
                        <Button type="primary" size="small" className={cn('mt-10')}>
                            <p className={cn("text text_type_main-default")}>Сохранить</p>
                        </Button>
                    </form>
                    <div className={cn(s.support__container, 'mt-20')}>
                        <span className={cn('text text_type_main-default text_color_inactive')}>Вспомнили пароль?
                            <Link to='/login' className={cn('text text_type_main-default pl-2', s.link)}>Войти</Link>
                        </span>
                    </div>
                </div>
            </>
        );
    }
}
