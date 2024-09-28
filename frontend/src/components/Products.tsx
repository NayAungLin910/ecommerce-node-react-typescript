import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap:
    justify-content: space-between;
`;

export interface ProductsComponentInterface {
  cat?: string;
  filters?: {
    [key: string]: any;
  };
  sort?: string;
}

const Products: FC<ProductsComponentInterface> = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState<[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<[]>([]);

  return <>Products</>;
};
