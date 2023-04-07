import { createContext, useState } from "react";

export const WalletContext = createContext({});

export default function WalletContextProvider({ children }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletId, setWalletId] = useState("");

  return (
    <WalletContext.Provider
      value={{ walletConnected, setWalletConnected, walletId, setWalletId }}
    >
      {children}
    </WalletContext.Provider>
  );
}
