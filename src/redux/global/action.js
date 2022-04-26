const globalActions = {
    GET_ALL_PLANS: "GET_ALL_PLANS",
    GET_ALL_PLANS_SUCCESS: "GET_ALL_PLANS_SUCCESS",
    GET_ALL_PLANS_ERROR: "GET_ALL_PLANS_ERROR",
    REDEEMED_COUPON: "REDEEMED_COUPON",
    REDEEMED_COUPON_SUCCESS: "REDEEMED_COUPON_SUCCESS",
    REDEEMED_COUPON_ERROR: "REDEEMED_COUPON_ERROR",
    CLEAR_GLOBAL_REDUCER: "CLEAR_GLOBAL_REDUCER",
    getAllPlans: (payload) => ({
        type: globalActions.GET_ALL_PLANS,
        payload
    }),
    getAllPlansSuccess: (payload) => ({
        type: globalActions.GET_ALL_PLANS_SUCCESS,
        payload
    }),
    getAllPlansError: (payload) => ({
        type: globalActions.GET_ALL_PLANS_Error,
        payload
    }),
    redeemCoupon: (payload) => ({
        type: globalActions.REDEEMED_COUPON,
        payload
    }),
    redeemCouponSuccess: (payload) => ({
        type: globalActions.REDEEMED_COUPON_SUCCESS,
        payload
    }),
    redeemCouponError: (payload) => ({
        type: globalActions.REDEEMED_COUPON_ERROR,
        payload
    }),
    clearGlobalReducer: (payload) => ({
        type: globalActions.CLEAR_GLOBAL_REDUCER,
        payload
    })
}

export default globalActions