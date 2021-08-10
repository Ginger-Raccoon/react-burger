import React, { useState, useCallback, SyntheticEvent } from 'react';
import s from './style.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import {Link} from "react-router-dom";
import { useDispatch } from '../../hooks';
import { Redirect } from 'react-router-dom';
import { register } from '../../services/actions/auth';

export function RegisterPage() {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

    const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value,
        });
    };

    const onIconClick = useCallback(() => {
        alert('Произошел ТЫК');
    }, []);

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(register(state));
    };

    const hasToken = localStorage.getItem('refreshToken')

    if (hasToken) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    } else {
        return (
            <>
                <div className={cn(s.container, 'mt-20')}>
                    <form className={cn(s.form, 'mt-20')} onSubmit={submitForm}>
                        <h3 className={cn("text text_type_main-medium")}>Регистрация</h3>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={handleInputChange}
                            value={state.name}
                            name={'name'}
                            error={false}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <Input
                            type={'text'}
                            placeholder={'E-mail'}
                            onChange={handleInputChange}
                            value={state.email}
                            name={'email'}
                            error={false}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <PasswordInput
                            value={state.password}
                            name={'password'}
                            onChange={handleInputChange}
                        />
                        <div className={cn('mt-10')}>
                            <Button type="primary" size="small" >
                                <p className={cn("text text_type_main-default")}>Зарегистрироваться</p>
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={cn('mt-20')}>
                <span className={cn('text text_type_main-default text_color_inactive')}>Уже зарегистрированы?
                    <Link to='/login' className={cn('text text_type_main-default pl-2', s.link)}>Войти</Link>
                </span>
                </div>
            </>
        );
    }
}

export default  RegisterPage;
