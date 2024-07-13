import { combineReducers } from 'redux';

const initialState = {
  giris: false,
  hesapla: 0
};

const girisReducer = (state = initialState.giris, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return true;
    default:
      return state;
  }
};

const hesaplaReducer = (state = initialState.hesapla, action) => {
  switch (action.type) {
    case 'TOPLA':
      return state + action.payload;
    case 'CIKAR':
      return state - 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  giris: girisReducer,
  hesapla: hesaplaReducer
});

export default rootReducer;
