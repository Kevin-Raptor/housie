const initialState = {
    currentPage: 1,
    hostname: '',
    playerCount: 0,
    playersData: [],

}

export function app(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case 'next_page':
            return {
                ...state,
                currentPage: state.currentPage + 1
            }

        case 'send_game_details':
            return {
                ...state,
                hostname: action.data.hostname,
                playerCount: parseInt(action.data.playerCount)
            }

        case 'send_player_names':
            console.log(action.data)
            return {
                ...state,
                playersData: action.data,
            }

        default:
            console.log("No Case found")
            return state
    }
}