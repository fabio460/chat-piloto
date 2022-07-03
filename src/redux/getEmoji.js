const inicial = {
    emoji:""
}

const getEmoji = (state=inicial,action)=>{
   switch (action.type) {
    case "emoji":
        return {...action,emoji:action.payload.emoji}
   
    default:
        break;
   }
   return state
}

export default getEmoji