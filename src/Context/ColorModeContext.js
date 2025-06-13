import { auto, disable, enable, isEnabled, setFetchMethod } from 'darkreader';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Tworzenie kontekstu
const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  let ls = localStorage.getItem("colorMode") 

  const [colorMode, setColorMode] = useState(ls !== null ? ls : 'auto'); // Domyślny tryb: 'light'
   
  setFetchMethod(window.fetch)
  useEffect(()=>{
    if(colorMode === "auto"){
        auto({
              brightness: 100,
              contrast: 90,
              sepia: 30
          });
        localStorage.setItem("colorMode","auto")
    }else if(colorMode === "dark"){
        enable({
            brightness: 100,
            contrast: 90,
            sepia: 30
        })
        localStorage.setItem("colorMode","dark")
    }else if(colorMode === "light" && isEnabled()){
        disable()
        localStorage.setItem("colorMode","light")
        
    }
  },[colorMode])

  const toggleColorMode = (e) => {
    setColorMode(e);
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

// Hak do użycia kontekstu
export const useColorMode = () => useContext(ColorModeContext);
