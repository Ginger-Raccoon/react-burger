import s from './style.module.css';
import cn from "classnames";
import bun01 from '../../images/bun-01.png';
import cheese from '../../images/cheese.png';
import core from '../../images/core.png';
import meat03 from '../../images/meat-03.png';
import sauce03 from '../../images/sauce-03.png';
import mineralRings from '../../images/mineral-rings.png';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderItem({ number, name, status }) {
    const st = status === 'completed' ? { text: 'Выполнен', textColor: 'green' } :
        status === 'canceled' ? { text: 'Отменен', textColor: 'red' } : { text: 'Готовится', textColor: 'white' };
    return (
        <div className={cn(s.orders__item, 'p-6')}>
            <div className={cn(s.orders__info)}>
                <span className="text text_type_digits-default">#{number}</span>
                <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
            </div>
            <div>
                <h2 className={cn("text text_type_main-medium mb-2")}>{name}</h2>
                {status ? <span className={cn("text text_type_main-default", `status_color_${st.textColor}`)}>{st.text}</span> : null}
            </div>
            <div className={cn(s.orders__info)}>
                <ul className={cn(s.list)}>
                    <li className={s.list__item}
                        style={{ zIndex: 5 }}>
                        <div className={cn(s.icon)}>
                            <img src={bun01} alt='Вкусная булка' />
                        </div>
                    </li>
                    <li className={cn(s.list__item)}
                        style={{ zIndex: 4 }}>
                        <div className={cn(s.icon)}>
                            <img src={meat03} alt='Вкусная булка' />
                        </div>
                    </li>
                    <li className={cn(s.list__item)} style={{ zIndex: 3 }}>
                        <div className={cn(s.icon)}>
                            <img src={core} alt='Вкусная булка' />
                        </div>
                    </li>
                    <li className={cn(s.list__item)} style={{ zIndex: 2 }}>
                        <div className={cn(s.icon)}>
                            <img src={mineralRings} alt='Вкусная булка' />
                        </div>
                    </li>
                    <li className={cn(s.list__item)} style={{ zIndex: 1 }}>
                        <div className={cn(s.icon)}>
                            <img src={sauce03} alt='Вкусная булка' />
                        </div>
                    </li>
                    <li className={cn(s.list__item)} style={{}}>
                        <div className={cn(s.icon)}>
                            <img src={cheese} alt='Вкусная булка' />
                        </div>
                        <div className={cn(s.overlay)}>
                            <span>+3</span>
                        </div>
                    </li>
                </ul>
                <span className={cn(s.element__price, 'text')}>
                    480
                    <CurrencyIcon type={"primary"} />
                </span>
            </div>
        </div>
    );
}

export default OrderItem;
