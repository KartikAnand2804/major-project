import { createContext, useState } from "react";

export const WalletContext = createContext({});

export default function WalletContextProvider({ children }) {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <WalletContext.Provider value={{ walletConnected, setWalletConnected }}>
      {children}
    </WalletContext.Provider>
  );
}
