import { db } from "@/lib/prisma";

export const getProductWithRestaurant = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        restaurant: {
          select: {
            slug: true,
            name: true,
            avatarImageUrl: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error("Erro ao buscar o produto", error);
    throw new Error("Erro ao buscar o produto");
  }
};
