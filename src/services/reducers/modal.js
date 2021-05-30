import { OPEN_MODAL, CLOSE_MODAL, GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/modal'

const modalState = {
    isOpen: false,
    content: null,
    title: null,
    orderRequest: false,
    orderFailed: false,
    currentOrder: null,
}

export const modalReducer = (state = modalState, action) => {
 switch (action.type) {
     case OPEN_MODAL: {
         return {
            ...state,
            isOpen: action.isOpen,
            content: action.content,
            title: action.title
         };
     }
     case CLOSE_MODAL: {
         return {
             ...state,
             isOpen: action.isOpen,
             content: null,
             title: null
         };
     }
     case GET_ORDER: {
         return {
             ...state,
             orderRequest: true,
             orderFailed: false
         };
     }
     case GET_ORDER_SUCCESS: {
         return {
             ...state,
             orderRequest: false,
             orderFailed: false,
             currentOrder: action.currentOrder,
         };
     }
     case GET_ORDER_FAILED: {
         return {
             ...state,
             orderFailed: true,
             orderRequest: false
         };
     }
     default: {
         return state
     }
 }
}
