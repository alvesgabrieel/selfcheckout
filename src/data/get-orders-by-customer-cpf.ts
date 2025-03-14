import { removeCpfPunctuation } from "@/app/[slug]/menu/helpers/cpf";
import { db } from "@/lib/prisma";

export const getOrdersByCustomerCpf = async (cpf: string) => {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        customerCpf: removeCpfPunctuation(cpf),
      },
      include: {
        restaurant: {
          select: {
            name: true,
            avatarImageUrl: true,
          },
        },
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Erro ao buscar o produto", error);
    throw new Error("Erro ao buscar o produto");
  }
};
