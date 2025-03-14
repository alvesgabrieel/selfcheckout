import { notFound } from "next/navigation";

import { getRestaurantWithCategoriesAndProducts } from "@/data/get-restaurant-with-categories-and-products";

import RestaurantCategories from "./components/categories";
import RestaurantsHeader from "./components/header";

interface RestaurantsMenuPageProps {
  params: { slug: string };
  searchParams: { consumptionMethod: string };
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

  const restaurant = await getRestaurantWithCategoriesAndProducts(slug);
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantsHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantsMenuPage;
