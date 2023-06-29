export interface CategoryInterface {
  id: number;
  name: string;
  description: string;
  products: [{}];
  createdDate: Date;
}

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  createdDate: Date;
}

export interface OrderInterface {
  id: number;
  email: string;
  totalPrice: number;
  status: string;
  quantity: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  user: number;
  createdDate: Date;
}

export interface UserInterface {
  id: number;
  email: string;
  fullName: string;
  userRole: string;
  createdDate: Date;
}

export interface ShipmentInterface {
  shipmentId: number;
  email: string;
  shipmentStatus: string;
  orderId: number;
  orderTotalPrice: number;
  orderProductName: string;
  orderProductDescription: string;
}

export interface UserInterfaceWithPassword {
  id: number;
  email: string;
  fullName: string;
  userRole: string;
  createdDate: Date;
  password: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface ReturnRequestInterface {
  id: number;
  productId: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
  reason: string;
  email: string;
}
