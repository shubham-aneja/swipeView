import Types from '../actions/types'

export default function cardReducer(state = {}, action) {

    switch (action.type) {
        case Types.CARD_INIT: {
            const { id, defaultCards } = action.payload
            return { ...state, [id]: { cards: defaultCards, defaultCards } }
        }

        case Types.CARD_REMOVED: {
            const { id } = action.payload;
            const oldState = state[id];
            return { ...state, [id]: { ...oldState, cards: oldState.cards - 1 } }
        }
        case Types.CARD_REFRESH: {
            const { id } = action.payload;
            const oldState = state[id];
            return { ...state, [id]: { ...oldState, cards: oldState.defaultCards } }
        }

        case Types.CARD_DESTROY: {

            const { id } = action.payload
            delete state[id];
            return { ...state }
        }
        default: {
            return state
        }
    }
} 
