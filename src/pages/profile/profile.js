import React, { useState } from 'react';
import s from './profile.module.css'
import {NavLink, Route, Switch, Link} from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ordersData } from "../../utils/data";
import  OrderItem  from '../../components/order-item/order-item'
import cn from "classnames";
import {OrderPage} from "../order/order";

export function ProfilePage() {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
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

    const nameInputRef = React.useRef(null)
    const emailInputRef = React.useRef(null)
    const passwordInputRef = React.useRef(null)

    const onIconClick = (e) => {
        setTimeout(() => state.currentRef?.current.focus(), 0)
        const inputName = e.target.closest('.input').querySelector('.input__placeholder').textContent;
        alert(`Произошел тык в ${inputName}`)
    }

    return (
        <>
            <div className={cn(s.main)} >
                <nav className={cn(s.nav, 'mb-20')}>
                    <ul className={cn(s.nav__list)}>
                        <li>
                            <NavLink
                                exact to="/profile"
                                className={cn(s.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', "text text_type_main-medium text_color_inactive")}
                                activeClassName={s.link_active}
                            >
                                <span className={cn('ml-2')}>Профиль</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                exact to="/profile/orders"
                                className={cn(s.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', "text text_type_main-medium text_color_inactive")}
                                activeClassName={s.link_active}
                            >
                                <span className={cn('ml-2')}>История заказов</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/" className={cn(s.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', "text text_type_main-medium text_color_inactive")} activeClassName={s.link_active} >
                                <span className={cn('ml-2')}>Выход</span>
                            </NavLink>
                        </li>
                    </ul>
                    <span className={cn("text text_type_main-default text_color_inactive")}>В этом разделе вы можете изменить свои персональные данные</span>
                </nav>
                <Switch>
                    <Route path='/profile' exact={true}>
                        <div className={cn(s.inputs)}>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={handleInputChange}
                                icon={'EditIcon'}
                                value={state.name}
                                name={'name'}
                                error={false}
                                onIconClick={onIconClick}
                                ref={nameInputRef}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                            <Input
                                type={'text'}
                                placeholder={'Логин'}
                                onChange={handleInputChange}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                                name={'email'}
                                error={false}
                                value={state.email}
                                ref={emailInputRef}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                            <Input
                                type={'text'}
                                placeholder={'Пароль'}
                                onChange={handleInputChange}
                                icon={'EditIcon'}
                                onIconClick={onIconClick}
                                name={'password'}
                                error={false}
                                value={state.password}
                                ref={passwordInputRef}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>
                    </Route>
                    <Route path='/profile/orders' exact={true}>
                        <ul className={cn(s.orders)}>
                            {
                                ordersData.map((el, i) => (
                                    <li className={cn(s.order)} key={i}>
                                        <Link to={`/profile/orders/${el.order.number}`} className={cn(s.order__link)}>
                                            <OrderItem number={el.order.number} name={el.name} status={el.order.status} />
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </Route>
                    <Route path='/profile/orders/:id' exact={true}>
                        <OrderPage />
                    </Route>
                    <Route>
                        <div className={cn(s.notFound)}>
                            <h1>Error: 404 Not Found</h1>
                            <p>Псс, кажется ты заблудился</p>
                            <Link to={`/`}>
                                <span>Жмакни сюда</span>
                            </Link>
                        </div>
                    </Route>
                </Switch>

            </div>

        </>
    );
}
