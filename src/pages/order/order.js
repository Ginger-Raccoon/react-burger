import s from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import bun01 from '../../images/bun-01.png';
import cheese from '../../images/cheese.png';
import core from '../../images/core.png';
import meat03 from '../../images/meat-03.png';
import sauce03 from '../../images/sauce-03.png';
import mineralRings from '../../images/mineral-rings.png';
import { useParams, Redirect } from 'react-router-dom';
import {ordersData} from "../../utils/data";

export function OrderPage() {
    const { id } = useParams();
    const order = ordersData.filter(el => el.order.number === Number(id))
    if (order.length === 0){
        return (
            <Redirect to="/" />
        )
    } else {
        const name = order[0].name;
        const status = order[0].order.status === 'completed' ? { text: 'Выполнен', textColor: 'green'} :
            order[0].order.status === 'canceled' ? { text: 'Отменен', textColor: 'red'} : {text: 'Готовится', textColor: 'white'}
        return (
            <div className={s.container}>
                <div>
                    <span className={cn("text text_type_digits-default")}>#{id}</span>
                    <h1 className={cn("text text_type_main-medium mb-3 mt-10", s.title)}>{name}</h1>
                    <p className={cn("text text_type_main-default", 'mb-15', s.status, s[`status_color_${status.textColor}`])}>{status.text}</p>
                    <p className={cn("text text_type_main-medium", 'mb-6', s.title)}>Состав:</p>
                    <ul className={cn(s.list, 'mb-10')}>
                        <li className={cn(s.list__item, 'mr-6')}>
                            <div className={cn(s.icon, 'mr-4')}>
                                <img src={bun01} alt='Вкусная булка' />
                            </div>
                            <p className={cn(s.ingredient, 'mr-4 text text_type_main-default')}>Флюоресцентная булка R2-D3</p>
                            <span className={cn('mr-1 text text_type_digits-default')}>2 x </span>
                            <span className={cn(s.element__price, 'text')}>
                                20
                                <CurrencyIcon type="primary" />
                            </span>
                        </li>
                        <li className={cn(s.list__item, 'mr-6')}>
                            <div className={cn(s.icon, 'mr-4')}>
                                <img src={core} alt='Вкусная булка' />
                            </div>
                            <p className={cn(s.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
                            <span className={cn('mr-1', 'text text_type_digits-default')}>1 x </span>
                            <span className={cn(s.element__price, 'text')}>
                                300
                                <CurrencyIcon type="primary" />
                            </span>
                        </li>
                        <li className={cn(s.list__item, 'mr-6')}>
                            <div className={cn(s.icon, 'mr-4')}>
                                <img src={meat03} alt='Вкусная булка' />
                            </div>
                            <p className={cn(s.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
                            <span className={cn('mr-1 text text_type_digits-default')}>1 x </span>
                            <span className={cn(s.element__price, 'text')}>
                                80
                                <CurrencyIcon type="primary" />
                            </span>
                        </li>
                        <li className={cn(s.list__item, 'mr-6')}>
                            <div className={cn(s.icon, 'mr-4')}>
                                <img src={sauce03} alt='Вкусная булка' />
                            </div>
                            <p className={cn(s.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
                            <span className={cn('mr-1', 'text text_type_digits-default')}>3 x </span>
                            <span className={cn(s.element__price, 'text')}>
                                70
                                <CurrencyIcon type="primary" />
                            </span>
                        </li>
                        <li className={cn(s.list__item, 'mr-6')}>
                            <div className={cn(s.icon, 'mr-4')}>
                                <img src={cheese} alt='Вкусная булка' />
                            </div>
                            <p className={cn(s.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
                            <span className={cn('mr-1', 'text text_type_digits-default')}>1 x </span>
                            <span className={cn(s.element__price, 'text')}>
                                200
                                <CurrencyIcon type="primary" />
                            </span>
                        </li>
                        <li className={cn(s.list__item, 'mr-6')}>
                            <div className={cn(s.icon, 'mr-4')}>
                                <img src={mineralRings} alt='Вкусная булка' />
                            </div>
                            <p className={cn(s.ingredient, 'mr-4', "text text_type_main-default")}>Флюоресцентная булка R2-D3</p>
                            <span className={cn('mr-1', 'text text_type_digits-default')}>1 x </span>
                            <span className={cn(s.element__price, 'text')}>
                                200
                                <CurrencyIcon type="primary" />
                            </span>
                        </li>
                    </ul>
                    <div className={s.info}>
                        <span className={cn("text text_type_main-default text_color_inactive")}>Вчера, 13:50 i-GMT+3</span>
                        <span className={cn(s.element__price, 'text')}>
                                540
                                <CurrencyIcon type="primary" />
                            </span>
                    </div>

                </div>
            </div >
        );
    }
}
