import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductPage = () => {
  return (
    <div className="p-5 border border-red-500 rounded-xl">
      <h1 className="text-red-800">ProductPage</h1>
      <Button>Clique aqui</Button>
      <Input className="mt-1" placeholder="Bora ser 1%" />
    </div>
  );
};

export default ProductPage;
