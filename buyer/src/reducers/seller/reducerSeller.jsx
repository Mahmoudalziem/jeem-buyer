const SELLER = {
    message : [],
    name: localStorage.getItem('name'),
    notification : {
        token : null,
        status : false
    }
};

export const reducerSeller = (state = SELLER, action) => {
  switch (action.type) {
    case "GETSELLER":
      return {
        ...state,
        ...(action.payload.data),
      };
    case "UPDATEINFO":
      return {
        ...state,
        ...(action.payload),
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
