// HEY DUMMY! Remember that reducers actually update the state.

export default (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_INPUT':
            return [
                ...state,
                {
                    searchQuery: action.text
                }
            ]
            default:
            return state
    }
}