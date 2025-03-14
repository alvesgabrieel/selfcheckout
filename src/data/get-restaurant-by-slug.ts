import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  try {
    const restaurant = await db.restaurant.findUnique({ where: { slug } });
    return restaurant;
  } catch (err) {
    console.error("Erro ao buscar o restaurante", err);
    throw new Error("Erro ao buscar o restaurante");
  }
};
