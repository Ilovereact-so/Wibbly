import React, { createContext, useState, useContext, useEffect } from 'react';
import { Pallete0, Pallete1, Pallete2, Pallete3, Pallete4, Pallete5 } from '../constants';

const PaleteContext = createContext()
export const PalleteProvider = ({children}) => {
    let ls = localStorage.getItem("palleteNumber") 
    let palletelist = [Pallete0, Pallete1,Pallete2,Pallete3,Pallete4, Pallete5]

    const [isPalleteNum, setPalleteNum] = useState(ls === null ? 0 : parseInt(ls))
    const [Pallete, choosePallete] = useState(palletelist[isPalleteNum])

    useEffect(()=>{
        if(ls== null){
            localStorage.setItem("palleteNumber",0)
        }
    },[ls])
    useEffect(()=>{
        choosePallete(palletelist[isPalleteNum])
        localStorage.setItem("palleteNumber",isPalleteNum)

    },[isPalleteNum])

    return(
        <PaleteContext.Provider value={{Pallete, setPalleteNum, isPalleteNum}}>
            {children}
        </PaleteContext.Provider>
    )
}

export const usePallete = () => useContext(PaleteContext);