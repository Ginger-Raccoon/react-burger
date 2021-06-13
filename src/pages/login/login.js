import s from './login.module.css'
import cn from 'classnames';
import { Link } from 'react-router-dom';
import {Logo, Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
    return (
        <>
            <div className={cn(s.container, 'mt-20')}>
                <Logo />
                <form className={cn(s.form, 'mt-20')}>
                    <h3 className={cn("text text_type_main-medium")}>Вход</h3>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                    />
                    <PasswordInput />
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
};
