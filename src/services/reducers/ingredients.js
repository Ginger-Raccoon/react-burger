import { v4 as uuidv4 } from 'uuid';
import {
    GET_INGREDIENTS_REQUEST, //Запрос на получение ингредиентов +
    GET_INGREDIENTS_FAILED, // Неуспешный запрос получения ингредиентов +
    GET_INGREDIENTS_SUCCESS, // Успешный запрос получения ингредиентов +
    CHOOSE_INGREDIENTS, // выбор ингредиентов +
    INCREASE_COUNTER, // Увеличение счетчика +
    DECREASE_COUNTER, // Уменьшение счетчика +
    DELETE_INGREDIENT, // Удаление ингредиента +
    MOVE_INGREDIENT, // Перемещение ингредиентов ?
    CLEAR_CONSTRUCTOR, // Очистка конструктора ?
    CREATE_ORDER_REQUEST, // Запрос на создание заказа +
    CREATE_ORDER_SUCCESS, // Успешное создание заказа +
    CREATE_ORDER_FAILED, // Ошибка создания заказа +
    CURRENT_BURGER, // Текущий бургер +
} from '../actions/ingredients'


const ingredientState = {
    ingredientRequest: false,
    ingredientFailed: false,
    ingredientSuccess: false,
    allIngredients: {},
    burgerIngredients: {
        bun: null,
        fillings: [],
        counts: {}
    },
    currentOrder: null,
    currentBurger: null,
    orderRequest: false,
    orderFailed: false
}

export const ingredientsReducer  = (state = ingredientState, action) => {
    switch (action.type){
        //Запрос на получение ингредиентов
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientRequest: true,
                ingredientFailed: false
            };
        }
        // Успешный запрос получения ингредиентов
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientRequest: false,
                ingredientFailed: false,
                allIngredients: action.ingredients,
                ingredientSuccess: true
            };
        }
        // Неуспешный запрос получения ингредиентов
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientFailed: true,
                ingredientRequest: false
            };
        }
        // Выбор ингредиента
        case CHOOSE_INGREDIENTS: {
            const { type } = action.item
            if (type === 'bun') {
                return {
                    ...state,
                    burgerIngredients: {
                        ...state.burgerIngredients,
                        bun: action.item
                    }
                };
            } else {
                const newItem = { ...action.item, productId: uuidv4() }
                return {
                    ...state,
                    burgerIngredients: {
                        ...state.burgerIngredients,
                        fillings: [...state.burgerIngredients.fillings, newItem]
                    }
                };
            }
        }
        // Удаление ингредиента
        case DELETE_INGREDIENT: {
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    fillings: [...state.burgerIngredients.fillings].filter(el => el.productId !== action.id)
                }
            };
        }
        // Увеличение счетчика
        case INCREASE_COUNTER: {
            const { type } = action.typeItem
            if (type !== 'bun') {
                return {
                    ...state,
                    burgerIngredients: {
                        ...state.burgerIngredients,
                        counts: {
                            ...state.burgerIngredients.counts,
                            [action.key]: (state.burgerIngredients.counts[action.key] || 0) + 1
                        }
                    }
                }
            } else return state;
        }
        // Уменьшение счетчика
        case DECREASE_COUNTER: {
            const { type } = action.type
            if (type !== 'bun') {
                return {
                    ...state,
                    burgerIngredients: {
                        ...state.burgerIngredients,
                        counts: {
                            ...state.burgerIngredients.counts,
                            [action.key]: state.burgerIngredients.counts[action.key] - 1
                        }
                    }
                }
            } else return state;
        }
        // Очистить конструктора
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    bun: null,
                    fillings: [],
                    counts: {}
                }
            }
        }
        // Перемещение ингредиентов
        case MOVE_INGREDIENT: {
            const fillings = [...state.burgerIngredients.fillings];
            fillings.splice(action.toIndex, 0,fillings.splice(action.fromIndex,1)[0]);
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    fillings: fillings
                }
            };
        }
        // Текущий бургер
        case CURRENT_BURGER: {
            return {
                currentBurger: action.item,
            }
        }
        // Запрос на создание заказа
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        }
        // Удачное создание заказа
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                currentOrder: action.order,
            }
        }
        // Ошибка создания заказа
        case CREATE_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }
        default: {
            return state
        }
    }
}
