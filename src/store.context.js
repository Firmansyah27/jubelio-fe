import React from "react";
import { ProductStore } from './stores/product.store'

const productStore = new ProductStore();
export const StoreContext = React.createContext({
    productStore,
})