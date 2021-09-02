import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import s from './feed.module.css';
import { ordersData } from '../../utils/data'
import OrderItem from "../../components/order-item/order-item";


export function FeedPage() {
    return (
        <div className={cn(s.container, 'p-10')}>
            <div>
                <h2 className={cn('text text_type_main-large mb-5')}>Лента заказов</h2>
                <ul className={cn(s.orders)}>
                    {ordersData.map((el, i) => (
                        <li className={cn(s.order, 'mb-4')} key={i}>
                            <Link to={`/feed/${el.order.number}`} className={s.link}>
                                <OrderItem number={el.order.number} name={el.name} />
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
                            <li>034533</li>
                            <li>034543</li>
                            <li>034530</li>
                            <li>034527</li>
                            <li>034525</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={cn('text text_type_main-medium')}>В работе:</h3>
                        <ul className={cn(s.list, 'text text_type_digits-default')}>
                            <li>034538</li>
                            <li>034531</li>
                            <li>034542</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className={cn('text text_type_main-medium')}>Выполнено за все время:</h3>
                    <span className={cn('text text_type_digits-large', s.total)}>28 752</span>
                </div>
                <div>
                    <h3 className={cn('text text_type_main-medium')}>Выполнено за сегодня:</h3>
                    <span className={cn('text text_type_digits-large', s.total)}>138</span>
                </div>
            </div>
        </div>
    )
}
