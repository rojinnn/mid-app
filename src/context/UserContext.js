import React, { createContext, useContext, useReducer } from "react";
// import PropTypes from "prop-types";
const Context = createContext();

const initialState = {
  userName: "Nikesh",
  user: null,
  type: "",
  role: "admin",
  initialLoading: true,
  loggingIn: false,
  loginInSuccess: false,
  loginError: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_NAME":
      return { ...state, userName: action.payload };
    case "LOAD_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: null };
    case "LOGIN":
      return { ...state, loggingIn: true, loginInSuccess: false };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggingIn: false,
        loginInSuccess: true,
        user: action.payload,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        loggingIn: false,
        loginInSuccess: false,
        loginError: action.payload,
      };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const updateUserName = (data) => {
    dispatch({ type: "UPDATE_USER_NAME", payload: data });
  };

  const loadUser = (data) => {
    dispatch({ type: "LOAD_USER", payload: data });
    localStorage.setItem("access-token", data.token);
    localStorage.setItem("userLoggedIn", JSON.stringify(data));
  };

  const logoutUser = (data) => {
    localStorage.setItem("userLoggedIn", null);
    dispatch({ type: "LOGOUT_USER", payload: data });
  };

  const login = (data) => {
    dispatch({ type: "LOGIN", payload: data });
  };
  const loginSuccess = (data) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  };
  const loginError = (data) => {
    dispatch({ type: "LOGIN_ERROR", payload: data });
  };

  return (
    <Context.Provider
      value={{
        data: authState,
        updateUserName,
        loadUser,
        logoutUser,
        login,
        loginError,
        loginSuccess,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useAuth = () => {
  return useContext(Context);
};

export { Context, Provider, useAuth };

// const authReducer = (state, action) => {
//     switch (action.type) {
//       case 'LOAD_USER':
//         return { ...state, user: action.payload };
//       case 'UPDATE_USER_DETAILS':
//         return { ...state, user: { ...state.user, ...action.payload}};
//       case 'LOAD_USER_TYPE':
//         return { ...state, type: action.payload };
//       case 'INIT':
//         return { ...state, initialLoading: false };
//         default:
//         return state;
//     }
//   };

// const Provider = ({ children }) => {
//     const [authState, dispatch] = useReducer(
//       authReducer,
//       initialAuthState,
//     );

//     const loadUser = data => {
//       dispatch({ type: 'LOAD_USER', payload: data });
//     };

//     const updateUserDetails = data => {
//       dispatch({ type: 'UPDATE_USER_DETAILS', payload: data });
//     };

//     const loadUserType = data => {
//         dispatch({ type: 'LOAD_USER_TYPe', payload: data });
//       };

//     const initLoadingDone = () => {
//       dispatch({ type: 'INIT'});
//     }
//     // const deletePost = (id) => {
//     //   dispatch({ type: "DELETE_POST", payload: { id } });
//     // };

//     // const updatePost = (updatedPost) => {
//     //   dispatch({ type: "UPDATE_POST", payload: { updatedPost } });
//     // };

//     return (
//       <Context.Provider value={{ data: authState, loadUser, loadUserType, initLoadingDone, updateUserDetails }}>
//         {children}
//       </Context.Provider>
//     );
//   };

//   const useAuth = () => {
//    return useContext(Context);
//   };
//   export { Context, Provider, useAuth };
