const hesaplaReducer=(state=0,action)=>{
  switch (action.type) {
    case 'TOPLA':
      return state+1;
    case 'CIKAR':
      return state-1
  
    default:
      return state
  }
}

export default hesaplaReducer