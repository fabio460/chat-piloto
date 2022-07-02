const inicial = {
    sala:"vazia"
}

const salaReducer = (state=inicial,action)=>{
   switch (action.type) {
    case "sala":
        return {...action,sala:action.payload.sala}
   
    default:
        break;
   }
   return state
}

export default salaReducer