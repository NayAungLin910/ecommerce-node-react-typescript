import { FC } from "react";
import Announcment from "../components/Announcement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

export interface HomePropsInterface {}

const Home: FC<HomePropsInterface> = ({}) => {
  return (
    <>
      <div>
        <Announcment />
        <Navbar />
        <Slider />
      </div>
    </>
  );
};

export default Home;
