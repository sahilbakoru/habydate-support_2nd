import actions from "./action";

const initState = {
    plans: {},
    promoCodes: [],
    redeemCodes: [],
    loading: false
}

export function globalReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_ALL_PLANS:
            return { ...state, loading: true }
        case actions.GET_ALL_PLANS_SUCCESS:
            return {
                ...state,
                plans: action.payload.plans,
                promoCodes: action.payload.promoCodes,
                redeemCodes: action.payload.redeemCodes,
                loading: false
            }
        case actions.GET_ALL_PLANS_ERROR:
            return { ...state, loading: false }
        case actions.REDEEMED_COUPON:
            return { ...state, loading: true }
        case actions.REDEEMED_COUPON_SUCCESS:
            const redeemedCoupons = [...state.redeemCodes, { ...action.payload }]
            return { ...state, redeemCodes: redeemedCoupons, loading: false }
        case actions.REDEEMED_COUPON_ERROR:
            return { ...state, loading: false }
        case actions.CLEAR_GLOBAL_REDUCER:
            return {
                plans: {},
                promoCodes: [],
                redeemCodes: [],
                loading: false
            }
        default:
            return { ...state, loading: false }
    }
}