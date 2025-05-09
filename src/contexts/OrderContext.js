import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([0, 0]);  // 두 메뉴 아이템의 초기 수량 설정

  const updateOrder = (index, count) => {
    const newOrders = [...orders];
    newOrders[index] = count;
    setOrders(newOrders);
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
