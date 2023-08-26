const initialState = {
  loading: false,
  account: null,
  smartContract: null,
  web3: null,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...state,
        loading: true,
        errorMsg: "", // clear any previous error
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
        errorMsg: "", // clear any previous error
      };
    case "CONNECTION_FAILED":
      return {
        ...state,
        loading: false,
        account: null, // clear any previous account
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    case "DISCONNECT_SUCCESS":
      return initialState; // Simply return the initialState on disconnect
    default:
      return state;
  }
};

export default blockchainReducer;
