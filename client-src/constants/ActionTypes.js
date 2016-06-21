import keymirror from 'keymirror'

var ActionTypes = keymirror({
    SELECT_CHANNEL : null,
    ADD_NEW_MESSAGE : null,
    SELECT_CATEGORY : null,
    BOOTSTRAP_HISTORY : null,
    CHANGE_TASK_STATUS : null
})

export default ActionTypes;