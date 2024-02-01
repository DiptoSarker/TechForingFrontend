import { useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState(false);

  return {
    auth,
    setAuth,
  };
};

export default useAuth;
