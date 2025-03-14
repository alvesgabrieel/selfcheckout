import { db } from "@/lib/prisma";

export const getRestaurantWithCategoriesAndProducts = async (slug: string) => {
  try {
    const restaurant = await db.restaurant.findUnique({
      where: { slug },
      include: {
        menuCategories: {
          include: {
            products: true,
          },
        },
      },
    });
    return restaurant;
  } catch (err) {
    console.error(
      "Erro ao buscar o restaurante com suas categorias e produtos",
      err,
    );
    throw new Error(
      "Erro ao buscar o restaurante com suas categorias e produtos",
    );
  }
};
