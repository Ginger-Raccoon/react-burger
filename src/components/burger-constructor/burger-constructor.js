import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import cn from 'classnames';
import OrderDetails from "../order-details/order-details";
import PropTypes from 'prop-types';
import s from './style.module.css';
import {useContext} from "react";
import {BurgerContext} from "../../services/burgerContext";
import {urlOrder} from "../../utils/data";

const BurgerConstructor = (props) => {
    const img = "https://code.s3.yandex.net/react/code/bun-02.png"
    const { state, setState } = useContext(BurgerContext);
    const { bun, filling } = state.burgerIngredients;
    const handleClick = () => {
        fetch(urlOrder, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filling.map(e => e._id))
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Ошибка сети')
                }
            })
            .then((data) => {
                props.setModal({
                    isOpen: true,
                    content: <OrderDetails orderNum={data.order.number} />
                })
            })

    }
    const total = (bun, filling) => {
        return bun.price * 2 + filling.reduce((acc, curr) => acc += curr.price, 0)
    }
    return (
        <div className={cn(s.container, "mt-25")}>
            <header className={cn(s.container__head, "mb-5")}>
                <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image} />
            </header>
            <ul className={s.list}>
                {filling.map(e => (
                    <li className={cn(s.list__item, "mb-5")}>
                        <DragIcon type="primary" />
                        <ConstructorElement text={e.name} price={e.price} thumbnail={e.image} />
                    </li>
                    ))
                }
            </ul>
            <div className={cn(s.container__end, "mb-10")}>
                <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image} />
            </div>

            <div className={s.total}>
                <div className={cn(s.price, 'mr-10')}>
                    <span className="text text_type_digits-default">{total(bun, filling)}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={handleClick}>
                    Оформить заказ
                </Button>
            </div>
        </div>
)
}

BurgerConstructor.propTypes = {
    setModal: PropTypes.func.isRequired
}

export default BurgerConstructor
