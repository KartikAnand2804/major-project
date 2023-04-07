import { createContext, useState } from "react";

export const RideContext = createContext({});

export default function RideContextProvider({ children }) {
  const [loc, setLoc] = useState("");
  const [dest, setDest] = useState("");

  return (
    <RideContext.Provider value={{ loc, dest, setLoc, setDest }}>
      {children}
    </RideContext.Provider>
  );
}
