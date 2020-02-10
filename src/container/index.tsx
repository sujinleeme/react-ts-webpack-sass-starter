import React from "react";
import Banner from "../components/Banner";
import "./Container.scss";

const Container = (): JSX.Element => {
  return (
    <div>
      <Banner name="sujin " />
      This main container.<button>ddd</button>
    </div>
  );
};

export default Container;
