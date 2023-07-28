import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: "1212f",
  amount: 2000,
  products: [{ description: "cookies" }],
});

const orderBusiness = new OrderBusiness();
console.log("orderBusiness: ", orderBusiness.create(order));
