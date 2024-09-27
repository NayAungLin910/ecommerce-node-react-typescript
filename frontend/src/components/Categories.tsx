import { FC } from "react";
import styled from "styled-components";
import { mobile } from "./css-helper/css-helper";
import { categories } from "../data/data";
import CategoryItem from "./CategoryItem";

export interface CategoriesProps {}

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories: FC<CategoriesProps> = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
