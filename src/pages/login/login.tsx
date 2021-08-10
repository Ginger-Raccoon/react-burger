import React, { useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { Redirect } from 'react-router-dom';
import s from './style.module.css'
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { login } from '../../services/actions/auth';

export function LoginPage() {
    const [state, setState] = useState({
        login: '',
        password: '',
    });

    const userName = useSelector(store => store.auth.name)

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

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(state));
    };

    const hasToken = localStorage.getItem('refreshToken')

    if (userName || hasToken) {
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
                <form onSubmit={submitForm} className={cn(s.form, 'mt-20')}>
                    <h3 className={cn("text text_type_main-medium")}>Вход</h3>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={handleInputChange}
                        value={state.login}
                        name={'login'}
                        error={false}
                        errorText={'Ooops...'}
                        size={'default'}
                    />
                    <PasswordInput
                        value={state.password}
                        name={'password'}
                        onChange={handleInputChange}
                    />
                    <div className={cn('mt-10')}>
                        <Button type="primary" size="small" >
                            <p className={cn("text text_type_main-default")}>Войти</p>
                        </Button>
                    </div>
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
