import { FC } from "react";
import Announcment from "../components/Announcement";
import Navbar from "../components/Navbar";

export interface HomePropsInterface {}

const Home: FC<HomePropsInterface> = ({}) => {
  return (
    <>
      <div>
        <Announcment />
        <Navbar />
      </div>
    </>
  );
};

export default Home;
