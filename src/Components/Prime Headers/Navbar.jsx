import React from "react";
import "./headers.css";
import PrimeMenu from "./PrimeMenu";
const Navbar = (props) => {
  return (
    <div>
      <section id="primeHeaders">
        <article>
          <div className="primeLogo">
            <a href="/">
              <img src="prime.png" alt="logo" />
            </a>

          </div>
          <div className="PrimeMenu">
            <PrimeMenu users={ props.users}/>
          </div>
          {/* <nav>
        <a href="">
                 <img src="pr.png" alt="logo" />
                </a>  
            <ul>
             <li><a href="/">Home</a></li>
             <li><a href="/">TV Shows</a></li>
             <li><a href="/">Movies</a></li>
             <li><a href="/">Kids</a></li>
            </ul>
        </nav>
        <nav>
            <li><a href="">Search</a></li>
            <li><a href="">Auth</a></li>
        </nav> */}
        </article>
        
      </section>
    </div>
  );
};

export default Navbar;