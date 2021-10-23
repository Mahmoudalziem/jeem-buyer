const BUYER = {
    message : [],
    name: localStorage.getItem('name'),
    notification : {
        token : null,
        status : false
    }
};

export const reducerBuyer = (state = BUYER, action) => {
  switch (action.type) {
    case "GETBUYER":
      return {
        ...state,
        ...(action.payload.data),
      };
      case "UPDATEINFO":
      return {
        ...state,
        ...(action.payload),
      };
      case "UPDATECOUNT":
      return {
        ...state,
        count : action.payload.count,
      };
    case "NOTIFICATION":
      return {
        ...state,
        message : action.payload.notification ? action.payload.notification : action.payload.data,
      };
      case "TOKEN":
      return {
        ...state,
        notification : {
            token : action.payload.token,
            status : action.payload.status
        },
      };
    default:
      return state;
  }
};
