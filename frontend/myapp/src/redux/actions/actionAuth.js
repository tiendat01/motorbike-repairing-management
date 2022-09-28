export const login = (values) => {
  return {
    type: "LOGIN",
    payload: values,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
