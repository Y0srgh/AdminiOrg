// reducers/authReducer.js
const initialState = {
    accessToken: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, accessToken: action.payload.accessToken };
      case 'LOGOUT':
        return { ...state, accessToken: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  