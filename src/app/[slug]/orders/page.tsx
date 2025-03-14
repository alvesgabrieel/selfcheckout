import { getOrdersByCustomerCpf } from "@/data/get-orders-by-customer-cpf";

import { isValidCpf } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return <CpfForm />;
  }

  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await getOrdersByCustomerCpf(cpf);

  return <OrderList orders={orders} />;
};

export default OrdersPage;
