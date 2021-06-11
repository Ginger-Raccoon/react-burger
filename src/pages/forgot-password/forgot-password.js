import React, { useState, useRef } from 'react';
import s from './forgot-password.module.css'
import AppHeader from "../../components/app-header/app-header";
import cn from "classnames";
import {Button, Input, Logo, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import { urlForgotPassword }  from '../../utils/constant'

export function ForgotPasswordPage() {
    const inputRef = useRef(null)
    const [value, setValue] = useState('')

    const onIconClick = (e) => {
        setTimeout(() => inputRef.current.focus(), 0)
        const inputName = e.target.closest('.input').querySelector('.input__placeholder').textContent;
        alert(`Произошел тык в ${inputName}`)
    }

    const submitForm = event => {
        event.preventDefault()
        return fetch(urlForgotPassword, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: value })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status)
                }
            })
            .then( res => console.log(res))
            .catch( err => console.log(err))
    };

    return (
        <>
            <AppHeader />
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
