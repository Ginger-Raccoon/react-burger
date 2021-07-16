import cn from "classnames";
import s from "./style.module.css"
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/auth';
import React from "react";

export function NavProfile() {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(logout());
    };

    return (
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
                <NavLink exact to="/login"
                         className={cn(s.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', "text text_type_main-medium text_color_inactive")}
                         activeClassName={s.link_active}>
                    <span className={cn('ml-2')} onClick={clickHandler}>Выход</span>
                </NavLink>
            </li>
        </ul>
        {pathname === '/profile' ? (
            <span className={cn("text text_type_main-default text_color_inactive")}>В этом разделе вы можете изменить свои персональные данные</span>
        ) : null }
    </nav>
    )
}
