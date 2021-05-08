import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import cn from 'classnames';
import OrderDetails from "../order-details";
import PropTypes from 'prop-types';
import s from './style.module.css';

const BurgerConstructor = (props) => {
    const img = "https://code.s3.yandex.net/react/code/bun-02.png"

    const openModal = () => {
        props.setModal({
            isOpen: true,
            content: <OrderDetails />
        })
    }
    return (
        <div className={cn(s.container, "mt-25")}>
            <header className={cn(s.container__head, "mb-5")}>
                <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={img} />
            </header>
            <ul className={s.list}>
                <li className={cn(s.list__item, "mb-5")}>
                    <DragIcon type="primary" />
                    <ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={img} />
                </li>
                <li className={cn(s.list__item, "mb-5")}>
                    <DragIcon type="primary" />
                    <ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={img} />
                </li>
                <li className={cn(s.list__item, "mb-5")}>
                    <DragIcon type="primary" />
                    <ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={img} />
                </li>
                <li className={cn(s.list__item, "mb-5")}>
                    <DragIcon type="primary" />
                    <ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={img} />
                </li>
                <li className={cn(s.list__item, "mb-5")}>
                    <DragIcon type="primary" />
                    <ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={img} />
                </li>
            </ul>
            <div className={cn(s.container__end, "mb-10")}>
                <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={img} />
            </div>

            <div className={s.total}>
                <div className={cn(s.price, 'mr-10')}>
                    <span className="text text_type_digits-default">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={openModal}>
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
