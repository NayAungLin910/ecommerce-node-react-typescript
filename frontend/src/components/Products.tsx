import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "./utilities/axios-common";
import { AxiosResponse } from "axios";
import { ProductRequestInterface } from "../types/response-types";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export interface ProductsComponentInterface {
  cat?: string;
  filters?: {
    [key: string]: string;
  };
  sort?: string;
}

const Products: FC<ProductsComponentInterface> = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState<ProductRequestInterface[]>();
  const [filteredProducts, setFilteredProducts] = useState<
    ProductRequestInterface[]
  >([]);

  const filtersExist =
    filters &&
    Object.values(filters).length > 0 &&
    Object.values(filters).some((val) => Boolean(val));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res: AxiosResponse<ProductRequestInterface[]> =
          await publicRequest.get(
            cat ? `/products?category=${cat}` : `/products`
          );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    filtersExist &&
      setFilteredProducts(() =>
        products!.filter((pd) =>
          Object.entries(filters).every(([key, value]) => {
            const pdValue = pd[key as keyof ProductRequestInterface];
            if (Array.isArray(pdValue) && value) {
              return pdValue.includes(value);
            }
          })
        )
      );
  }, [products, filters]);

  useEffect(() => {
    if (sort == "newest") {
      if (filtersExist) {
        setFilteredProducts((prevPros) =>
          prevPros.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
      } else {
        setProducts((prevPros) => {
          if (prevPros && prevPros.length > 0) {
            return prevPros.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
          }
          return prevPros;
        });
      }
    } else if (sort === "asc") {
      if (filtersExist) {
        setFilteredProducts((prevPros) =>
          prevPros.sort((a, b) => a.price - b.price)
        );
      } else {
        setProducts((prevPros) => {
          if (prevPros && prevPros.length > 0) {
            return prevPros.sort((a, b) => a.price - b.price);
          }
          return prevPros;
        });
      }
    } else {
      if (filtersExist) {
        setFilteredProducts((prevPros) =>
          prevPros.sort((a, b) => b.price - a.price)
        );
      } else {
        setProducts((prevPros) => {
          if (prevPros && prevPros.length > 0) {
            return prevPros.sort((a, b) => b.price - a.price);
          }
          return prevPros;
        });
      }
    }
  }, [sort]);

  return (
    <>
      <Container>
        {filtersExist
          ? filteredProducts?.map((item: any) => (
              <Product item={item} key={item._id} />
            ))
          : products?.map((item: any) => (
              <Product item={item} key={item._id} />
            ))}
      </Container>
    </>
  );
};

export default Products;
