import React from "react";
import "./Myaccount.css";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";
const MyAccount = props => {
  let { path, url } = useRouteMatch();
  let { displayName, photoURL, email } = props.users;

  let onRemoveUser = async () => {
    let user = firebase.auth().currentUser;
    await user.delete();
    toast.success("successfully account deleted");
  };
  console.log(props);
  return (
    <section id="MyAccountBlock">
      <article>
        <aside>
          <header>
            <h3>{displayName}</h3>
          </header>
          <main>
            <h4>{email}</h4>
            <ul>
              <li>
                <Link to="/movies/upload-movies">Upload Movie</Link>
              </li>
            </ul>
          </main>
          <footer>
            <li>
              <button className="btn" onClick={onRemoveUser}>
                Remove User
              </button>
            </li>
          </footer>
        </aside>
      </article>
    </section>
  );
};

export default MyAccount;