import React, { useState } from 'react';
import s from './reset-password.module.css'
import AppHeader from "../../components/app-header/app-header";
import {Button, Input, Logo, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import {Link} from "react-router-dom";
import { urlResetPassowrd } from '../../utils/constant'

export function ResetPasswordPage() {
    const inputRef = React.useRef(null)
    const [state, setState] = useState({
        password: '',
        token: ''
    })

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
        return fetch(urlResetPassowrd, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: state.password,
                token: state.token
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status)
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <>
            <AppHeader />
            <div className={cn(s.container, 'mt-20')}>
                <Logo />
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
                <span className={cn('text text_type_main-default text_color_inactive')}>Уже зарегистрированы?
                    <Link to='/login' className={cn('text text_type_main-default pl-2', s.link )}>Войти</Link>
                </span>
                </div>
            </div>
        </>
    );
}
