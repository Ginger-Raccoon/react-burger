import { urlOrder } from '../../utils/constant'

export const OPEN_MODAL = 'OPEN_MODAL' // открытие модального окна
export const CLOSE_MODAL = 'CLOSE_MODAL' // закрытие модального окна
export const GET_ORDER = 'GET_ORDER' // загрузка номера заказа
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED' // ошибка загрузки номера заказа
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS' // получение номера заказа

export function getOrder(ingredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER
        })
        fetch(urlOrder, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients})
        })
            .then((res) => {
                if(!res.ok) {
                    throw new Error('error:' + res.status)
                } else {
                    return res.json()
                }
            })
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        currentOrder: res.order.number
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_FAILED,
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_ORDER_FAILED
                })
        })
    }
}
