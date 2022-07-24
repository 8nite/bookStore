const SetInitialState = () => {
  const Auth = localStorage.getItem("AuthToken");
  if (Auth === "" || Auth === null) {
    return false;
  } else {
    return true;
  }
};

export const initialState = SetInitialState();
export const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    return action.payload;
  }
  return state;
};
