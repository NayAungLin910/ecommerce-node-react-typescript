import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-conent: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcment: FC<{}> = ({}) => {
  return (
    <Container>
      Get a fantastic deal! Free shipping for orders over $95!
    </Container>
  );
};

export default Announcment;
