import cn from "classnames";
import s from "./style.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../services/actions/auth';

export function FormProfile() {
    const currentUserName = useSelector((store) => store.auth.name);
    const currentUserEmail = useSelector((store) => store.auth.email);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        nameDisabled: true,
        emailDisabled: true,
        passwordDisabled: true,
    });

    useEffect(() => {
        setState((state) => {
            return {
                ...state,
                name: currentUserName,
                email: currentUserEmail,
            };
        });
    }, [currentUserName, currentUserEmail]);

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value
        });
    }

    const nameInputRef = React.useRef(null)
    const emailInputRef = React.useRef(null)
    const passwordInputRef = React.useRef(null)

    const activeNameInput = () => {
        setState({
            ...state,
            nameDisabled: state.nameDisabled ? false : true,
        });
        nameInputRef.current.disabled = false;
        setTimeout(() => nameInputRef.current.focus(), 0);
    }

    const activeEmailInput = () => {
        setState({
            ...state,
            emailDisabled: state.emailDisabled ? false : true,
        });
        emailInputRef.current.disabled = false;
        setTimeout(() => emailInputRef.current.focus(), 0);
    };

    const activePasswordInput = () => {
        setState({
            ...state,
            passwordDisabled: state.passwordDisabled ? false : true,
        });
        passwordInputRef.current.disabled = false;
        setTimeout(() => passwordInputRef.current.focus(), 0);
    };

    const iconNameInput = state.nameDisabled ? 'EditIcon' : 'CloseIcon';
    const emailNameInput  = state.emailDisabled ? 'EditIcon' : 'CloseIcon';
    const passwordNameInput  = state.passwordDisabled ? 'EditIcon' : 'CloseIcon';

    const submitForm = (e) => {
        e.preventDefault();
        let data = {};
        data = state.name !== currentUserName ? { ...data, name: state.name } : data;
        data = state.email !== currentUserEmail ? { ...data, email: state.email } : data;
        data = state.password.length !== 0 ? { ...data, password: state.password } : data;
        dispatch(updateUser({ ...data }));
        setState({
            ...state,
            password: '',
            nameDisabled: true,
            emailDisabled: true,
            passwordDisabled: true,
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        setState({
            ...state,
            name: currentUserName,
            email: currentUserEmail,
            password: '',
            nameDisabled: true,
            emailDisabled: true,
            passwordDisabled: true,
        });
    };

    return (
        <form className={cn(s.form)} onSubmit={submitForm}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleInputChange}
                icon={iconNameInput}
                value={state.name}
                name={'name'}
                error={false}
                onIconClick={activeNameInput}
                ref={nameInputRef}
                errorText={'Ошибка'}
                size={'default'}
                disabled={state.nameDisabled}
            />
            <Input
                type={'email'}
                placeholder={'Логин'}
                onChange={handleInputChange}
                icon={emailNameInput}
                onIconClick={activeEmailInput}
                name={'email'}
                error={false}
                value={state.email}
                ref={emailInputRef}
                errorText={'Ошибка'}
                size={'default'}
                disabled={state.emailDisabled}
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleInputChange}
                icon={passwordNameInput}
                onIconClick={activePasswordInput}
                name={'password'}
                error={false}
                value={state.password}
                ref={passwordInputRef}
                errorText={'Ошибка'}
                size={'default'}
                disabled={state.passwordDisabled}
            />
            { state.name !== currentUserName || state.email !== currentUserEmail || state.password.length !== 0 ?
                (
                <div className={s.button}>
                    <Button type='secondary' size='medium' onClick={handleClick}>
                        Отмена
                    </Button>
                    <Button type='primary' size='medium'>
                        Сохранить
                    </Button>
                </div>
            ) : null }
        </form>
    )
}
