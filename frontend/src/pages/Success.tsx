import { FC } from "react";
import { useLocation } from "react-router-dom";

export interface SuccessPropsInterface {}

const Success: FC<SuccessPropsInterface> = ({}) => {
  const location = useLocation();
  console.log(location);
  return <>Successful</>;
};

export default Success;
