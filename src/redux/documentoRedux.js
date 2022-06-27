const initial = {
    doc:"documento inicial"
}

const DocumentoReducer = (state=initial,action)=>{
    switch (action.type) {
        case "documento":
            return {...state,doc:action.payload.doc}
    
        default:
            break;
    }
    return state
}

export default DocumentoReducer