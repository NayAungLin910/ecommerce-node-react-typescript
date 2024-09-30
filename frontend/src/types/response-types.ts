export interface ProductRequestInterface {
    title: string;
    desc: string;
    img: string;
    categories: ArrayConstructor;
    size: ArrayConstructor;
    color: ArrayConstructor;
    price: number;
    inStock?: boolean;
  }
  