import { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../components/css-helper/css-helper";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcement";
import { IoAdd, IoRemove } from "react-icons/io5";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../components/utilities/axios-common";
import { AxiosResponse } from "axios";
import { ProductRequestInterface } from "../types/response-types";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const Container = styled.div``;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  gap: 3px;
  justify-content: space-between;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

export interface FilterColorProps {
  $color: string;
  $selected?: boolean;
}

const FilterColor = styled.div<FilterColorProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  ${(props) =>
    props.$selected ? "outline: 2px solid purple; outline-offset: 1px" : ""}
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding; 5px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const FilterSizeOption = styled.option``;

export interface ProductPropsInterface {}

const Product: FC<ProductPropsInterface> = ({}) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState<ProductRequestInterface>();
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const handleQuantity = (type: string) => {
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {};

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res: AxiosResponse<ProductRequestInterface> =
          await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Announcment />
      {color}
      {size}
      <Wrapper>
        <ImgContainer>
          <Image src={product?.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>{product?.desc}</Desc>
          <Price>${product?.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color </FilterTitle>
              {product?.color?.map((c) => (
                <FilterColor
                  $color={c}
                  $selected={c === color}
                  key={c}
                  onClick={() => {
                    setColor(c);
                  }}
                ></FilterColor>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                value={size}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setSize(e.target.value);
                }}
              >
                {product?.size?.map((s) => (
                  <FilterSizeOption value={s} key={s}>
                    {s}
                  </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <IoRemove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <IoAdd onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={() => handleClick()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
