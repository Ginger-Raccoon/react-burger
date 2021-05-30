import s from './style.module.css';
import cn from 'classnames';
import done from '../../images/done.png'
import {useSelector} from "react-redux";

const OrderDetails = () => {
    const { currentOrder, orderRequest, orderFailed } = useSelector((store) => store.modal);
    return (
        <div className={cn(s.popup__container, "mt-10")}>
            {orderRequest && 'Загружаем заказик'}
            {orderFailed && 'Ошибочка'}
            {!orderRequest && !orderFailed &&
            <>
                <h2 className={cn(s.popup__title, "text", "text_type_digits-large", "mb-2")}>{currentOrder}</h2>
                <p className={cn(s.popup__subtitle, "text", "text_type_main-medium", "mb-15")}>идентификатор заказа</p>
                <img className={cn(s.popup__img, "mb-15")} alt='popup_image' src={done}/>
                <p className={cn(s.popup__dscr, "text", "text_type_main-default", "mb-2")}>Ваш заказ начали готовить</p>
                <p className={cn(s.popup__dscr, "text", "text_type_main-default", "text_color_inactive", "mb-30")}>Дождитесь
                    готовности на орбитальной станции</p>
            </>
            }
        </div>
    );
};

export default  OrderDetails;
