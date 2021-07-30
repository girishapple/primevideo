import React, { Fragment } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Slider.css";
import {Link} from "react-router-dom"

const SliderComponent = () => {
  
  return (
    <Fragment>
      <Carousel infiniteLoop centerMode autoPlay >
        <div>
        
              <img src="bahubali.jpg" alt="slider1" />
            
         
        </div>
        <div>
          <img src="bharat poster.jpg" alt="slider2" />
        </div>
        <div>
          <img src="BIRBAL POSTER.jpg" alt="slider3" />
        </div>
      </Carousel>
    </Fragment>
  );
};

export default SliderComponent;