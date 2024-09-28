import { FC } from "react";
import Announcment from "../components/Announcement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";

export interface HomePropsInterface {}

const Home: FC<HomePropsInterface> = ({}) => {
  return (
    <>
      <div>
        <Announcment />
        <Navbar />
        <Slider />
        <Categories />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Home;
