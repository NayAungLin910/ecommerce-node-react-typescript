import styled from "styled-components";
import { mobile } from "./css-helper/css-helper";
import { Link } from "react-router-dom";
import { FC } from "react";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  bottom: 1px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  position: absolute;
  bottom: 10%;
  margin-bottom: 7%;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  position: absolute;
  bottom: 3%;
  cursor: pointer;
  font-weight: 600;
`;

export interface CategoryItemInterface {
  item: {
    cat: string;
    img: string;
    title: string;
  };
}

const CategoryItem: FC<CategoryItemInterface> = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
        <Image src={item.img} />
      </Link>
    </Container>
  );
};

export default CategoryItem;
