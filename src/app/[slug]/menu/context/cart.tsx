"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number
}

export interface ICartContext {
    isOpen: boolean,
    products: CartProduct[],
    toggleCart: () => void 
    addProduct: (product: CartProduct) => void
    decreaseProductQuantity: (productId: string) => void
    increaseProductQuantity: (productId: string) => void
    removeProduct: (productId: string) => void
    total: number,
}

//Contexto do carrinho
export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProduct: () => {},
    total: 0
})

export const CartProvider = ({children} : {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    const addProduct = (product: CartProduct) => {
        
        const productIsAlreadyOnTheCart = products.some((prevProduct) => prevProduct.id == product.id)

        if(!productIsAlreadyOnTheCart) {
            return setProducts(prev => [...prev, product])
        }

        setProducts((prevProducts) => {
            return prevProducts.map((prevProducts) => {
                if(prevProducts.id == product.id) {
                    return {
                        ...prevProducts,
                        quantity: prevProducts.quantity + product.quantity
                    }
                }
                return prevProducts;
            })
        })

    }
    
    // > DIMINUIR A QUANTIDADE DO PRODUTO QUE JÁ ESTÁ NO CARRINHO
    const decreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {

                if(prevProduct.id != productId) {
                    return prevProduct
                }
                
                if(prevProduct.quantity == 1) {
                    return prevProduct
                }

                return {...prevProduct, quantity: prevProduct.quantity - 1}
                
            })
        })
    }

    // > AUMENTAR A QUANTIDADE DO PRODUTO QUE JÁ ESTÁ NO CARRINHO
    const increaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {

                if(prevProduct.id != productId) {
                    return prevProduct
                }
                
                if(prevProduct.quantity == 1) {
                    return prevProduct
                }

                return {...prevProduct, quantity: prevProduct.quantity + 1}
                
            })
        })
    }

    // > REMOVER O PRODUTO DO CARRINHO
    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id != productId))
    }

    // > CALCULAR PREÇO TOTAL DO CARRINHO
    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity 
    }, 0)

    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProduct,
            total
        }}>

            {children}
        </CartContext.Provider>
    )
}