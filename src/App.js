import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Auth/Login';
import Otp from './Components/Auth/Otp';
import PasswordReset from './Components/Auth/PasswordReset';
import Register from './Components/Auth/Register';
import MyAccount from './Components/MyAccounts/MyAccount';
import Navbar from './Components/Prime Headers/Navbar';
import CreateMovie from './Components/Prime Movies/CreateMovie';
import Movies from './Components/Prime Movies/Movies';
import VideoPlayer from './Components/Prime Movies/VideoPlayer';
import PrivateRoute from './Components/Util/PrivateRoute';
import PublicRoute from './Components/Util/PublicRoute';
import firebase from "./firebase";
import Home from './Pages/Home';
import PagenotFound from './Pages/PagenotFound';
const App = () => {
  let [users, setUsers] = useState("");

  //signed in or not
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUsers(user); //authenticated users
      } else {
        setUsers(""); //anonymous users
      }
    });
  }, [users]);
    return (
        <Fragment>
          <Router>
         <Navbar users={users} />
            <ToastContainer/>
             <Switch>
               <Route path="/" exact>
                 <Home/>
               </Route>
               <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute path="/register" exact>
            <Register />
          </PublicRoute>
          <PublicRoute path="/password-reset" exact>
            <PasswordReset />
          </PublicRoute>
          <PublicRoute path="/otp" exact>
            <Otp />
            </PublicRoute>
            {!firebase.auth().currentUser ? (
            <PublicRoute path="/shows/:movie_name/:id" exact>
              <Movies/>
            </PublicRoute>
          ) : (
            <PrivateRoute path="/shows/:movie_name/:id">
              <Movies />
            </PrivateRoute>
          )}

          {!firebase.auth().currentUser ? (
            <PublicRoute path="/movie/:movie_name/:id" exact>
              <VideoPlayer />
            </PublicRoute>
          ) : (
            <PrivateRoute path="/movie/:movie_name/:id">
              <VideoPlayer />
            </PrivateRoute>
          )}
         
          <PrivateRoute path="/account">
            <MyAccount users={users} />
          </PrivateRoute>
               <PrivateRoute path="/movies/upload-movies">
            <CreateMovie users={users} />
          </PrivateRoute>
                 <Route path="*">
                 <PagenotFound/>
               </Route>
           </Switch>
          </Router>
        </Fragment>
      
    )
}
export default App;
