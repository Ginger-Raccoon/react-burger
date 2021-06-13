import s from './register.module.css'
import {Button, Input, Logo, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import {Link} from "react-router-dom";

export function RegisterPage() {
    return (
        <>
            <div className={cn(s.container, 'mt-20')}>
                <Logo />
                <form className={cn(s.form, 'mt-20')}>
                    <h3 className={cn("text text_type_main-medium")} >Регистрация</h3>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                    />
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                    />
                    <PasswordInput />
                    <Button type="primary" size="small" className={cn('mt-10')}>
                        <p className={cn("text text_type_main-default")}>Зарегистрироваться</p>
                    </Button>
                </form>
            </div>
            <div className={cn(s.support__container, 'mt-20')}>
                <span className={cn('text text_type_main-default text_color_inactive')}>Уже зарегистрированы?
                    <Link to='/login' className={cn('text text_type_main-default pl-2', s.link )}>Войти</Link>
                </span>
            </div>


        </>
    );
};

export default  RegisterPage;
