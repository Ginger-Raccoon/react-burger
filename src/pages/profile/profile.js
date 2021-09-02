import React, { useEffect } from 'react';
import s from './style.module.css'
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import { ordersData } from "../../utils/data";
import  OrderItem  from '../../components/order-item/order-item'
import cn from "classnames";
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/auth';
import { NavProfile } from "../../components/nav-profile/nav-profile";
import { FormProfile } from "../../components/forms-profile/forms-profile";

export function ProfilePage() {
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
            <div className={cn(s.main)}>
                <NavProfile />
                <Switch>
                    <Route path='/profile' exact={true}>
                        <FormProfile />
                    </Route>
                    <Route path='/profile/orders' exact={true}>
                        <ul className={cn(s.orders)}>
                            {
                                ordersData.map((el, i) => (
                                    <li className={cn(s.order)} key={i}>
                                        <Link to={{
                                            pathname: `/profile/orders/${el.order.number}`,
                                            state: { background: location }
                                        }}
                                              className={cn(s.order__link)} >
                                            <OrderItem number={el.order.number} name={el.name} status={el.order.status} />
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
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
    );
}
