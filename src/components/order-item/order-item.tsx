import React, { FC } from 'react';
import s from './style.module.css';
import cn from "classnames";
import { useSelector } from '../../hooks';
import { createCardDate, getPrice, getBurgerIngredients } from '../../utils/functions';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { getStatus } from '../../utils/functions';
import { NUNBER_OF_ELEMENTS_TO_BE_DRAWN } from '../../constants/constants';
import { TProps } from './types';
import { TIngredient } from '../../types';

const OrderItem: FC<TProps> = ({ number, name, status, ingredients, createdAt }) => {
    const st = status ? getStatus(status) : null;
    const { allIngredients } = useSelector((store) => store.ingredients);
    const orderDate = createCardDate(createdAt);
    const burgerIngredients = getBurgerIngredients(ingredients, allIngredients);
    const burgerItem = burgerIngredients.slice(0, NUNBER_OF_ELEMENTS_TO_BE_DRAWN);
    const count = burgerIngredients.length;
    let zIndex = NUNBER_OF_ELEMENTS_TO_BE_DRAWN;
    const numberIngredients = count - NUNBER_OF_ELEMENTS_TO_BE_DRAWN;
    const totalPrice = getPrice(burgerIngredients);
    return (
        <div className={cn(s.orders__item, 'p-6')}>
            <div className={cn(s.orders__info)}>
                <span className="text text_type_digits-default">#{number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    {orderDate}
                </span>
            </div>
            <div>
                <h2 className={cn("text text_type_main-medium mb-2")}>{name}</h2>
                {status ? <span className={cn("text text_type_main-default", `status_color_${st?.textColor}`)}>{st?.text}</span> : null}
            </div>
            <div className={cn(s.orders__info)}>
                <ul className={cn(s.list)}>
                    {burgerItem.map((el: TIngredient, i: number) => {
                        zIndex -= 1
                        return (
                            <li className={s.list__item} key={i} style={{ zIndex: zIndex }}>
                                <div className={cn(s.icon)}>
                                    <img src={el.image_mobile} alt='ингредиент бургера' />
                                </div>
                            </li>
                        )
                    })}
                    {count > 6 ? (<div className={s.overlay}>
                        <span>{`+${numberIngredients}`}</span>
                    </div>) : null}
                </ul>
                <span className={cn(s.element__price, 'text')}>
                    { totalPrice }
                    <CurrencyIcon type={"primary"} />
                </span>
            </div>
        </div>
    );
}

export default OrderItem;
