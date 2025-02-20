import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantsHeader from "./components/header";

interface RestaurantsMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const consumptionMethodValid = (value: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(value.toUpperCase());
};

const RestaurantsMenuPage = async ({
  params,
  searchParams,
}: RestaurantsMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!consumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantsHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantsMenuPage;
