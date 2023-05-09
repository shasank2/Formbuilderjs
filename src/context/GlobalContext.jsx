import { createContext, useState } from "react";

const GlobalContext = createContext({
  formState: [],
  setformState: (formState) => { },
  specialCustomizationStep: null,
  setSpecialCustomizationStep: (specialCustomizationStep) => { }
});

const GlobalProvider = ({ children }) => {

  const [formState, setformState] = useState([])
  const [specialCustomizationStep, setSpecialCustomizationStep] = useState(null)

  return (
    <GlobalContext.Provider
      value={{
        formState,
        setformState,
        specialCustomizationStep,
        setSpecialCustomizationStep,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;
export { GlobalContext, GlobalProvider };