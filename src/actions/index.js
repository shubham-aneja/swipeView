import Types from './types'

export const cardInit = (payload) => ({
    payload,
    type: Types.CARD_INIT
})

export const cardDestroy = (payload) => ({
    payload,
    type: Types.CARD_DESTROY
})

export const cardRemoved = (payload) => ({
    payload,
    type: Types.CARD_REMOVED
})

export const cardRefreshed = (payload) => ({
    payload,
    type: Types.CARD_REFRESH
})

