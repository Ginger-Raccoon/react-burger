import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';
import OrderDetails from "../order-details/order-details";
import s from './style.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../services/actions/ingredients';
import { useDrop } from 'react-dnd';
import {DECREASE_COUNTER, DELETE_INGREDIENT, MOVE_INGREDIENT, CLEAR_CONSTRUCTOR} from "../../services/actions/ingredients";
import BurgerItem from '../burger-item/burger-item';
import { push } from 'connected-react-router';
import { useLocation, useHistory } from 'react-router-dom';

const BurgerConstructor = ({ onDropHandler }) => {
    const dispatch = useDispatch();

    const { bun, fillings } = useSelector(store => store.ingredients.burgerIngredients);

    const location = useLocation();
    const history = useHistory();
    const hasToken = localStorage.getItem('refreshToken')

    const [{ canDrop, isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    const handleClick = () => {
        if (hasToken) {
            const ingredientsId = fillings.map(e => e._id)
            dispatch(createOrder([bun._id, ...ingredientsId]));
            history.push({
                pathname: '/order',
                state: {
                    background: location
                }
            });
        } else {
          dispatch(push('/login'))
        }
    }

    const isActive = canDrop && isHover;
    const classModificator = isActive ? 'container_active' : canDrop ? 'container_candrop' : ''

    const moveItem = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT,
            toIndex: hoverIndex,
            fromIndex: dragIndex
        })
    }, [dispatch])

    const total = (bun, fillings) => {
        const bunPrice = bun ? bun.price : 0
        return bunPrice * 2 + fillings.reduce((acc, curr) => acc += curr.price, 0)
    }
    return (
        <div className={cn(s.container, s[classModificator], "mt-25")} ref={dropTarget}>
            { bun &&
                <header className={cn(s.container__head, "mb-5")}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name}(верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </header>
            }
            <ul className={s.list}>
                {fillings.map((el, i) => {
                    const deleteIngredient = () => {
                        dispatch({
                            type: DELETE_INGREDIENT,
                            id: el.productId
                        })
                        dispatch({
                            type: DECREASE_COUNTER,
                            key: el._id,
                            typeItem: el.type
                        })
                    }
                return(
                        <BurgerItem
                            item={el}
                            index={i}
                            key={el._id}
                            deleteIngredient={deleteIngredient}
                            moveItem={moveItem}
                        />
                    )})
                }
            </ul>
            { bun &&
                <div className={cn(s.container__end, "mb-10")}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        price={bun.price}
                        text={`${bun.name}(низ)`}
                        thumbnail={bun.image}/>
                </div>
            }
            <div className={s.total}>
                {fillings.length || bun  ? <div className={cn(s.price, 'mr-10')}>
                    <span className="text text_type_digits-default">{total(bun, fillings)}</span>
                    <CurrencyIcon type="primary" />
                </div> : null }
                {bun && <Button type="primary" size="large" onClick={handleClick} >
                    Оформить заказ
                </Button> }
            </div>
        </div>
)
}

BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func.isRequired
}

export default BurgerConstructor
