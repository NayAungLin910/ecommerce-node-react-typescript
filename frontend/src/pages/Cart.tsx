import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../components/css-helper/css-helper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Announcment from "../components/Announcement";
import { IoAdd, IoRemove } from "react-icons/io5";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { userRequest } from "../components/utilities/axios-common";
import { ProductCartInterface } from "../redux/cartRedux";

export interface CartPropsInterface {}

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export interface TopButtonInterface {
  $type?: string;
}

const TopButton = styled.button<TopButtonInterface>`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.$type === "filled" && "none"};
  background-color: ${(props) =>
    props.$type === "filled" ? "black" : "transparent"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

export interface ProductColorPropsInterface {
  $color: string;
}

const ProductColor = styled.div<ProductColorPropsInterface>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props?.$color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display; flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: center;
`;

export interface SummaryItemInterface {
  $type?: string;
}

const SummaryItem = styled.div<SummaryItemInterface>`
  margin: 30px 10px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props?.$type === "total" && "500"};
`;

const SummaryItemText = styled.div``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart: FC<CartPropsInterface> = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [stripeToken, setStripeToken] = useState<Token>();
  const navigate = useNavigate();

  const onToken = (token: Token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log("outside");
        if (stripeToken) {
          console.log("inside");
          const res = await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          });
          if(res) {
            alert("being navigated");
            navigate("/success");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcment />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product: ProductCartInterface, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>
                      {product.id}
                    </ProductId>
                    <ProductColor $color={product.color} />
                    <ProductSize>
                      <b>Size: </b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <IoAdd />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <IoRemove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Hello</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Lama Shop"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={`${process.env.REACT_APP_STRIPE_KEY}`}
            />
            <Button>CHECK OUT NOW</Button>
          </Summary>
          <Hr />
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
