import State from'./state'
export default (preState=State,action)=>{
    let newState=JSON.parse(JSON.stringify(preState))
    let {type,params}=action
    switch (type) {
        case 'CHANGE_TOKEN_MODAL':
            newState.tokenModal=params
            break;
    
        default:
            break;
    }
    return newState
}