import { v4 as uuidv4 } from 'uuid';
import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, CHOOSE_INGREDIENTS,
    INCREASE_COUNTER, DECREASE_COUNTER, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../actions/card'


const ingredientState = {
    data: [],
    ingredientRequest: false,
    ingredientFailed: false,
    burgerIngredients: {
        bun: null,
        fillings: [],
        counts: {}
    },
}

export const cardReducer = (state = ingredientState, action) => {
    switch (action.type){
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientRequest: true,
                ingredientFailed: false
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientRequest: false,
                ingredientFailed: false,
                data: action.data
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientFailed: true,
                ingredientRequest: false
            };
        }
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
        case DELETE_INGREDIENT: {
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    fillings: [...state.burgerIngredients.fillings].filter(el => el.productId !== action.id)
                }
            };
        }
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
        default: {
            return state
        }
    }
}
