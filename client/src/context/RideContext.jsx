import { createContext, useState } from "react";

export const RideContext = createContext({});

export default function RideContextProvider({ children }) {
  const [loc, setLoc] = useState("");
  const [dest, setDest] = useState("");
  const [acceptedRideId, setAcceptedRideId] = useState("");
  const [rideInfo, setRideInfo] = useState(null);
  const [driverCardVisibility, setDriverCardVisibility] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  return (
    <RideContext.Provider
      value={{
        loc,
        dest,
        setLoc,
        setDest,
        acceptedRideId,
        setAcceptedRideId,
        rideInfo,
        setRideInfo,
        driverCardVisibility,
        setDriverCardVisibility,
        isPaymentComplete,
        setIsPaymentComplete,
      }}
    >
      {children}
    </RideContext.Provider>
  );
}
