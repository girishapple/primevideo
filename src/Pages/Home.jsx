import React, { Fragment } from 'react';
import ListMovies from '../Components/Prime Movies/ListMovies';
import SliderComponent from '../Components/SliderComponent/SliderComponent';

const Home = () => {
    return (
       <Fragment>
            <SliderComponent/>
          <ListMovies/>
         
       </Fragment>
    )
}

export default Home;
