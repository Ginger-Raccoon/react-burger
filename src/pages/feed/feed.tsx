import React, { useEffect } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import s from './style.module.css';
import OrderItem from "../../components/order-item/order-item";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/constants/ws-actions';
import { TOrder } from '../../types';
import Preloader from '../../components/preloader/preloader';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { filterOrdersByStatus } from '../../utils/functions';


export function FeedPage() {
    let location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE })
        }
    }, [dispatch]);

    const { orders, total, totalToday } = useSelector((store) => store.ws)
    const statusArrays = filterOrdersByStatus(orders)
    const doneArray = statusArrays?.done.slice(0, 20);

    if (!orders) {
        return <Preloader />
    } else {
        return (
            <div className={cn(s.container, 'p-10')}>
                <div>
                    <h2 className={cn('text text_type_main-large mb-5')}>Лента заказов</h2>
                    <ul className={cn(s.orders)}>
                        {orders?.map((el: TOrder) => (
                            <li className={cn(s.order, 'mb-4')} key={el._id}>
                                <Link to={{
                                    pathname: `/feed/${el.number}`,
                                    state: { background: location }
                                }} className={s.link}>
                                    <OrderItem 
                                        number={el.number}
                                        name={el.name}
                                        ingredients={el.ingredients}
                                        createdAt={el.createdAt}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cn(s.queue, 'pl-4')}>
                    <div className={s.queue__list}>
                        <div>
                            <h3 className={cn('text text_type_main-medium mb-6')}>Готовы:</h3>
                            <ul className={cn(s.list, s.list_blue, 'text text_type_digits-default')}>
                                {doneArray?.map((el: TOrder) => (
                                    <li key={el._id} >
                                        {el.number}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className={cn('text text_type_main-medium')}>В работе:</h3>
                            <ul className={cn(s.list, 'text text_type_digits-default')}>
                                {statusArrays?.pending.map((el: TOrder) => (
                                    <li key={el._id} >
                                        {el.number}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className={cn('text text_type_main-medium')}>Выполнено за все время:</h3>
                        <span className={cn('text text_type_digits-large', s.total)}>{total || 0}</span>
                    </div>
                    <div>
                        <h3 className={cn('text text_type_main-medium')}>Выполнено за сегодня:</h3>
                        <span className={cn('text text_type_digits-large', s.total)}>{totalToday || 0}</span>
                    </div>
                </div>
            </div>
        )
    }
}
