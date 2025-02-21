"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
        }
    }>
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(7)

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if(prev == 1) {
                return 1
            }
            return prev - 1
        })
    }
    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex-auto flex flex-col overflow-hidden">
            
                <div className="flex-auto overflow-hidden">
                    {/* RESTAURANT */}
                    <div className="flex items-center gap-1.5">
                        <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full"/>
                        <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                    </div>

                    {/* PRODUCT NAME */}
                    <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

                    {/* PRICE AND QUANTITY */}
                    <div className="flex items-center justify-between mt-3">
                        <h3 className="text-xl font-semibold">
                            {formatCurrency(product.price)}
                        </h3>
                        <div className="flex items-center gap-3 text-center">
                            <Button className="rounded-xl h-8 w-8" variant="outline" onClick={handleDecreaseQuantity}>
                                <ChevronLeftIcon />
                            </Button>
                            <p className="w-4">{quantity}</p>
                            <Button className="rounded-xl h-8 w-8" variant="destructive" onClick={handleIncreaseQuantity}>
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>

                    <ScrollArea className="h-full">
                        
                        {/* ABOUT */}
                        <div className="mt-6 space-y-3">
                            <h4 className="font-semibold">Sobre</h4>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>

                        {/* INGREDIENTS*/}
                        <div className="mt-6 space-y-3">
                            <div className="5 flex items-center gap-1">
                                <ChefHatIcon />
                                <h4 className="font-semibold">Ingredientes</h4>
                            </div>
                            <ul className="text-muted-fo list-disc px-5 text-sm text-muted-foreground">
                                {product.ingredients.map(ingredients => <li key={ingredients}>{ingredients}</li>)}
                            </ul>
                        </div>
                    </ScrollArea>
                    
                </div>

                <Button className="w-full rounded-full">Adicionar à sacola</Button>
            
        </div>
     );
}
 
export default ProductDetails;