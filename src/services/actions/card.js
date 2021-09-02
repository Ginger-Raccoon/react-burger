import { url } from '../../utils/constant';

export const GET_INGREDIENTS = 'GET_INGREDIENTS' // загрузка карточек
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' // ошибка карточек
export const  GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' // получение карточек
export const CHOOSE_INGREDIENTS = 'CHOOSE_INGREDIENTS' // выбор ингредиентов
export const INCREASE_COUNTER = 'INCREASE_COUNTER' // Увеличение счетчика
export const DECREASE_COUNTER = 'DECREASE_COUNTER' // Уменьшение счетчика
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT' // Удаление карточки
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT' // Сортировка карточек

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        fetch(url)
            .then( (res) => {
                if(!res.ok) {
                    throw new Error(`error: ` + res.status)
                } else {
                    return res.json()
                }
            })
            .then( (res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    data: res.data,
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
