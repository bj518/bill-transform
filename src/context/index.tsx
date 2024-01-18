import { ReactNode, createContext, useState } from "react";

export const MyContext = createContext({
  value: "珏珏子",
});

const MyProvider = ({ children }: { children: ReactNode }) => {
  const [contextValue, setContextValue] = useState<string>("珏珏子");

  const contextData = {
    value: contextValue,
    updateValue: setContextValue,
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};
export default MyProvider;
