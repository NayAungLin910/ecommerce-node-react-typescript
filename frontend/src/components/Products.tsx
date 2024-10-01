import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axiosDefault from "./utilities/axios-common";
import { AxiosResponse } from "axios";
import { ProductRequestInterface } from "../types/response-types";

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
  const [products, setProducts] = useState<ProductRequestInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res: AxiosResponse<ProductRequestInterface[]> =
          await axiosDefault.get(
            cat ? `/products?category=${cat}` : `/products`
          );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  return (
    <>
      <Container>
        {products?.map((item: any) => (
          <Product item={item} key={item._id} />
        ))}
      </Container>
    </>
  );
};

export default Products;
