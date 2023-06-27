export const categoriesData = [
  {
    category_id: 1,
    category_name: "Tumbler",
    description: "Different types of tumblers",
  },
  {
    category_id: 2,
    category_name: "Paper",
    description: "Various types of paper for printing",
  },
  {
    category_id: 3,
    category_name: "Ink",
    description: "Ink cartridges and supplies",
  },
];

export const productsData = [
  {
    product_id: 1,
    category_id: 1,
    product_name: "Stainless Steel Tumbler",
    price: 12.99,
    quantity: 50,
    description: "Durable stainless steel tumbler for hot and cold beverages",
    date_added: "2023-06-01",
  },
  {
    product_id: 2,
    category_id: 1,
    product_name: "Plastic Tumbler",
    price: 6.99,
    quantity: 30,
    description: "Lightweight and reusable plastic tumbler",
    date_added: "2023-06-02",
  },
  {
    product_id: 3,
    category_id: 2,
    product_name: "A4 Bond Paper",
    price: 8.99,
    quantity: 100,
    description: "High-quality A4 bond paper for printing documents",
    date_added: "2023-06-01",
  },
  {
    product_id: 4,
    category_id: 2,
    product_name: "Glossy Photo Paper",
    price: 14.99,
    quantity: 80,
    description: "Premium glossy paper for printing photos",
    date_added: "2023-06-03",
  },
  {
    product_id: 5,
    category_id: 3,
    product_name: "Black Ink Cartridge",
    price: 29.99,
    quantity: 20,
    description: "Black ink cartridge for printers",
    date_added: "2023-06-02",
  },
];

export const orderData = [
  {
    orderId: 1,
    customerId: 101,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
    totalPrice: 150,
    orderDate: "2023-06-10",
    status: "In Progress",
  },
  {
    orderId: 2,
    customerId: 102,
    products: [
      { productId: 2, quantity: 3 },
      { productId: 4, quantity: 2 },
    ],
    totalPrice: 250,
    orderDate: "2023-06-09",
    status: "Completed",
  },
];
