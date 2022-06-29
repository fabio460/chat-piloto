const initial = {
    receptor:{}
}

const ReceptorRducer = (state=initial,action)=>{
    switch (action.type) {
        case "receptor":
            return {...state,receptor:action.payload.receptor}
    
        default:
            break;
    }
    return state
}
export default ReceptorRducer