export default {
    changeTokenModal(state){
        let action={
            type:'CHANGE_TOKEN_MODAL',
            params:state
        }
        return action
    }
}