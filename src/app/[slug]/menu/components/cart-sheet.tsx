import { useContext, useState } from "react";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishedOrderDialogIsOpen, setFinishedOrderDialogIsOpen] =
    useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button
            className="mt-2 w-full rounded-full"
            onClick={() => setFinishedOrderDialogIsOpen(true)}
          >
            Finalizar pedido
          </Button>
          <FinishOrderDialog
            open={finishedOrderDialogIsOpen}
            onOpenChange={setFinishedOrderDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
