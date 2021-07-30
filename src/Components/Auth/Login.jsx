import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import firebase from '../../firebase';
import {withRouter} from 'react-router-dom';
import "./Auth.css";

const Login = ({history}) => {
    let [setUser, setStateUser]= useState(
        {
            email:"",
            password:"",
            loading: false,
        }
    );
    let {email, password,loading}= setUser;
    let handleChange = e =>
    {
        let { name, value } = e.target;
        setStateUser({...setUser, [name]:value})
    };
    let handleSubmit = async e =>
    {
        e.preventDefault()
        try{
            setStateUser({loading : true});

            let userData=await firebase.auth().signInWithEmailAndPassword(email,password);
        //    ! email verfication
         if(userData.user.emailVerified === true)
         {
            let  message= `${userData.user.email} has been successsfully logged in`;
            toast.success(message);
            history.push("/");
         }
          else
          {
            let errorMessage = `${userData.user.email} not yet verified please verify and login`;
            toast.error(errorMessage); 
          }
        }
        catch(err){
          toast.error(err.message)
        }
    }
    return (
        <section id="signinform">
            <div className="pic1">
            <img src="pr.png" alt=""/>
            </div>
           <article  >
            <h2>Sign-In</h2>
           <form action="" onSubmit={handleSubmit}>
            <div className="form-group5">
            <input type="text" name="email" id="email" value={email} onChange={handleChange} required  />
            <label htmlFor="email">Email</label>
        </div>
       <div className="form-group6">
            <input type="text" name="password" id="password" value={password} onChange={handleChange} required />
            <label htmlFor="password">Password <span className="forgot"> 
            <Link to="/password-reset"><a >Forgot your password?</a></Link></span>
</label>
        </div>
               <div className="form-group7">
               <button className="signinbtn"> {loading === true ?  'loading...' : 'Sign-In'}</button>
                 <p>By continuing, you agree to Amazon's <a href=""> Conditions</a> of <a href="">Use</a> and <a href="">Privacy Notice</a>.</p> <br />
                 <input type="checkbox" /> Keep me signed in. <a href="">Details</a> 
                 <p>  --------------------------------- New to Amazon? ------------------------------</p>
                 <button className="amazon"> <Link to="/register" >Create Your Amazon Account</Link> </button>
               </div>
               
           </form>
            </article>
        </section>
        
        
    )
}

export default withRouter( Login);