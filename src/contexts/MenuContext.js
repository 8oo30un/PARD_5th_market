// src/contexts/MenuContext.js
import React, { createContext, useContext } from "react";
const MenuContext = createContext();

export const menuData = [
  {
    id: 0,
    name: "뿌링콜팝",
    price: 4500,
    image: require("../Asset/Menu1.png"),
  },
  {
    id: 1,
    name: "양념콜팝",
    price: 4500,
    image: require("../Asset/Menu2.png"),
  },
];

export function MenuProvider({ children }) {
  return (
    <MenuContext.Provider value={{ menuData }}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
