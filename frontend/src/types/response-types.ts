export interface ProductRequestInterface {
  title: string;
  desc: string;
  img: string;
  categories: Array<any>;
  size: Array<any>;
  color: Array<any>;
  price: number;
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
}
