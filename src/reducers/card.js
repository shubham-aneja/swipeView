import Types from '../actions/types'

export default function cardReducer(state = {}, action) {

    switch (action.type) {

        // case Types.INCREMENT_COUNTER: {
        //     const { id } = action.payload;
        //     const thisstate = state && state[id] || {}
        //     const updatedCounterValue = thisstate.counter ? thisstate.counter + 1 : 1
        //     const updatedThisstate = { ...thisstate, counter: updatedCounterValue }
        //     return { ...state, [id]: updatedThisstate }
        // }
        // case Types.DECREMENT_COUNTER: {
        //     const { id } = action.payload;
        //     const thisstate = state && state[id] || {}
        //     const updatedCounterValue = thisstate.counter ? thisstate.counter - 1 : 0
        //     const updatedThisstate = { ...thisstate, counter: updatedCounterValue }
        //     return { ...state, [id]: updatedThisstate }
        // }
        // case Types.CARD_INIT: {
        //     const { id, counter } = action.payload
        //     const initData = { counter: counter || 0 }
        //     return initialiseState(state, id, initData, 'form')
        // }
        // case Types.CARD_DESTROY: {

        //     const { id } = action.payload

        //     return removeComponentFromState(state, id, 'form')
        // }
        default: {
            return state
        }
    }
} 
