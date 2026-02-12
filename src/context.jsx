import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getcurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const Urlprovider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getcurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
   return useContext(UrlContext);
};

export default Urlprovider;
