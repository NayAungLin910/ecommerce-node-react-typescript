import styled from "styled-components";
import { mobile } from "./css-helper/css-helper";
import { FC, useState } from "react";
import { sliderItems } from "../data/data";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

export interface ArrowPropsInterface {
  direction: string;
}

const Arrow = styled.div<ArrowPropsInterface>`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  curosr: pointer;
  opacity: 0.5;
  z-index: 2;
`;

export interface WrapperPropsInterface {
  $slideIndex: number;
}

const Wrapper = styled.div<WrapperPropsInterface>`
  height: 100%;
  display: flex;
  transistion: all 1.5s ease;
  transform: translateX(${(props) => props.$slideIndex * -100}vw);
`;

export interface StliderPropsInterface {
  $bg: string;
}

const Slide = styled.div<StliderPropsInterface>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.$bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider: FC<{}> = ({}) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const handleClick = (direction: string) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <FaArrowAltCircleLeft />
      </Arrow>
      <Wrapper $slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide $bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW ON</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <FaArrowAltCircleRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
