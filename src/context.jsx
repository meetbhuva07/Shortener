import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";

import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const Urlprovider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, loading, isAuthenticated, fetchUser }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
   return useContext(UrlContext);
};

export default Urlprovider;
