// HEY DUMMY! Remember that reducers actually update the state.

export default (state = {}, action) => {
    switch (action.type) {
        case 'MEALTYPES':
            return [
                ...state,
                {
                    mealtypes: action.mealtypes
                }
            ]
            default:
            return state
    }
}