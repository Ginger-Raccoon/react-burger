import {getIngredientsRequest, addOrdersRequest} from "../../utils/api";
import { filterArray } from '../../utils/functions';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' // загрузка ингредиентов
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' // ошибка ингредиентов
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' // получение ингредиентов
export const CHOOSE_INGREDIENTS = 'CHOOSE_INGREDIENTS' // выбор ингредиентов
export const INCREASE_COUNTER = 'INCREASE_COUNTER' // Увеличение счетчика
export const DECREASE_COUNTER = 'DECREASE_COUNTER' // Уменьшение счетчика
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT' // Удаление карточки
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT' // Сортировка ингредиентов
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR' // Очистка конструктора
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST' // Запрос создания заказов
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS' // Успешно созданный заказ
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED' // Ошибка запроса создания заказа
export const CURRENT_BURGER = 'CURRENT_BURGER' // Текущий бургер

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getIngredientsRequest()
            .then((res) => {
            const ingredientsObj = filterArray(res.data);
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: ingredientsObj,
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
            }
        }).catch( err => {
            console.log(err)
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    }
}

export const createOrder = (ingredientsId) => {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        });
        addOrdersRequest(ingredientsId)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: CREATE_ORDER_SUCCESS,
                        order: res,
                    });
                } else {
                    dispatch({
                        type: CREATE_ORDER_FAILED,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: CREATE_ORDER_FAILED
                });
            });
    };
};
