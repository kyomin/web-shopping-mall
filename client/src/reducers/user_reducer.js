import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS
} from '../actions/types';
 
export default function(state={}, action){
    switch(action.type){
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case ADD_TO_CART:
            return { 
                ...state,                   // 기존의 state 뿌려주기
                userData: {                 
                    ...state.userData,      // state 안에 원래 있던 userData를 뿌려준다.
                    cart: action.payload    // 그 후 여기에 cart 속성을 추가해준다!
                }
            }
        case GET_CART_ITEMS:
            return { 
                ...state,
                cartDetail: action.payload
            }
        default:
            return state;
    }
}