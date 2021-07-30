import React, { Fragment, useState } from "react";
import firebase from "../../firebase";
import DropDownMenu from "./DropDownMenu";
import "./headers.css"
const PrimeMenu = props => {
  let [toggle, setToggle] = useState(false);
  let { displayName, photoURL } = props.users;
  return (
    <Fragment>
      <nav id="primeMenuBlock">
        <ul className="leftMenu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/"> Tv Shows</a>
          </li>
          <li>
            <a href="/">Movies</a>
          </li>
          <li>
            <a href="/">Kids</a>
          </li>
        </ul>

        <ul className="authMenu">
          <li>
            <a href="/">
              <i className="fal fa-search"></i>
            </a>
          </li>
          <li>
                        <a href="#" onClick={() =>{setToggle(!toggle)}}>
                            {firebase.auth().currentUser ? (displayName)
                             :(  <i class="far fa-user"></i>)}</a>
            </li>
        </ul>
        < DropDownMenu toggle={toggle} users={props.users} />
      </nav>
    </Fragment>
  );
};

export default PrimeMenu;