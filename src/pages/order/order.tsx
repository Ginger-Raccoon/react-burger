import React, { useEffect } from 'react';
import s from './style.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useParams, Redirect, useRouteMatch } from 'react-router-dom';
import { ordersData } from "../../utils/data";
import { useDispatch, useSelector } from '../../hooks/hooks';
import { getOrder, getUserOrder } from '../../services/actions/ingredients';
import Preloader from '../../components/preloader/preloader';
import { createCardDate, getStatus, getPrice, getBurgerIngredients, getBurgerIngredientsObjWithCount } from '../../utils/functions';

export function OrderPage() {
    const dispatch = useDispatch();
    const isProfile = !!useRouteMatch("/profile");
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        dispatch(isProfile ? getUserOrder(id) : getOrder(id))
    },[dispatch, isProfile, id]);

    const { allIngredients } = useSelector((store) => store.ingredients)
    const order = useSelector((store) => store.ingredients.currentOrder)
    const { orderLoaded } = useSelector((store) => store.ingredients)
    const stringWithDay = order && order.createdAt && createCardDate(order?.createdAt);
    const burgerIngredients = order && order.ingredients && getBurgerIngredients(order?.ingredients, allIngredients)
    const arrUniqItem: Array<string> = Array.from(new Set(order?.ingredients))
    const bI = burgerIngredients && getBurgerIngredientsObjWithCount(burgerIngredients)
    const burgerPrice = burgerIngredients && getPrice(burgerIngredients)
    const name = order?.name
    const status = order?.status;
    const st = status ? getStatus(status) : null;
    if (orderLoaded && !order) {
        return <Redirect to='/' />;
    } else if (!order) {
        return <Preloader />;
    } else {
        return (
            <div className={s.container}>
                <div>
                    <span className={cn("text text_type_digits-default")}>#{id}</span>
                    <h1 className={cn("text text_type_main-medium mb-3 mt-10", s.title)}>{name}</h1>
                    <p className={cn("text text_type_main-default", 'mb-15', s.status, s[`status_color_${st?.textColor}`])}>{st?.text}</p>
                    <p className={cn("text text_type_main-medium", 'mb-6', s.title)}>Состав:</p>
                    <ul className={cn(s.list, 'mb-10')}>
                        {arrUniqItem.map((el: string, i: number) => {
                            return (
                                <li className={cn(s.list__item, 'mr-6')} key={i}>
                                    <div className={cn(s.icon, 'mr-4')}>
                                        <img src={bI?.item[el]?.image_mobile} alt='Вкусная булка' />
                                    </div>
                                    <p className={cn(s.ingredient, 'mr-4', 'text text_type_main-default')}>
                                        {bI?.item[el]?.name}
                                    </p>
                                    <span className={cn('mr-1', 'text text_type_digits-default')}>
                                        {bI?.count[el]} x{' '}
                                    </span>
                                    <span className={cn(s.element__price, 'text')}>
                                        {bI?.item[el]?.price || 0}
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={s.info}>
                        <span className={cn("text text_type_main-default text_color_inactive")}>{stringWithDay}</span>
                        <span className={cn(s.element__price, 'text')}>
                            {burgerPrice || 0}
                            <CurrencyIcon type="primary" />
                        </span>
                    </div>
                </div>
            </div >
        );
    }
}
