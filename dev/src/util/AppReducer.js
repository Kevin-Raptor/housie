const initialState = {
}

export function app(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case '1':
            return{

            }

        default: 
            console.log("No Case found")
            return state
    }
}