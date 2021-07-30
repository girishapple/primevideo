import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from "../../firebase";
import {toast} from 'react-toastify';
import md5 from 'md5';
import "./Auth.css";
const Register = () => {
    let [setUser, setStateUser]= useState(
        {
            username:"",
            email:"",
            password:"",
            confirmpassword:"",
            loading: false,
        }
    );
    let {username, email, password, confirmpassword,loading}= setUser;
    let handleChange = e =>
    {
        let { name, value } = e.target;
        setStateUser({...setUser, [name]:value})
    };
    let handleSubmit = async e =>
    {
        e.preventDefault()
       try{
           if(password === confirmpassword)
           {
               setStateUser({loading: true})
            let userData = await firebase
               .auth()
               .createUserWithEmailAndPassword(email,password);
               let verificationMessage= 'A verification has been sent to your ${email} please verify to continue'
               userData.user.sendEmailVerification();
               toast.success( verificationMessage)
            //    setStateUser({loading: true})
               console.log( userData);

            // //!!!!    UPDATE USER PROFILE
            await userData.user.updateProfile
               ({
                    displayName : username,
                    photoURL : `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,
                });

                // !!! SAVE USER INFORMATION INTO REALTIME DATABASE
                await firebase.database().ref("users").child( userData.user.uid).set(
                    {
                      email:userData.user.email,
                      displayName: userData.user.displayName,
                      photoURL: userData.user.photoURL,
                      uid : userData.user.uid,
                      RegistrationDate : new Date(). toString(),
                    });
            }
           else
           {
            toast.error('password is not matching');
           }
         
       } catch (err){
          toast.error(err.message)
          
       }
       setStateUser(
        {
            username:"",
            email:"",
            password:"",
            confirmpassword:"",
            loading: false,
        }
           );
    };
    return (
        <Fragment>
            <div className="ppp">
                <img src="pr.png" alt="" />
            </div>
                <section id="signinform">
         <article  >
        <h1>Create Account</h1>
       <form action="" onSubmit={handleSubmit}>
       <div className="form-group3">
            <input type="text" name="username" id="username" value={username} onChange={handleChange} />
            <label htmlFor="username">Enter your username</label>
        </div>
       <div className="form-group">
            <input type="text" name="email"  id="email" value={email} onChange={handleChange} />
            <label htmlFor="email">Email</label>
        </div>
           <div className="form-group1">
           <input type="password" name="password"  id="password" value={password} onChange={handleChange} placeholder="Atleast 6 characters"/>
            <label htmlFor="password">Password</label>
            <p></p>
           </div>
           <div className="form-group4">
           <input type="password" name="confirmpassword" id="confirmpassword" value={confirmpassword} onChange={handleChange} />
            <label htmlFor="confirmpassword">Confirmpassword</label>
           </div>
           <div className="form-group2">
           <button className="account">
               {loading === true ? "loading" : "Create Your Amazon Account"}
           </button>
             <p>By continuing, you agree to Amazon's <a href=""> Conditions</a> of <a href="">Use</a> and <a href="">Privacy Notice</a>.</p> <br />
              <p  >Already have an account?  <Link className="imp" to="/login" >Login</Link></p>
          </div>
           
       </form>
        </article>
        <div id="footer">
     <p><a href=""> Conditions of Use</a></p>
     <p><a href=""> Privacy Notice </a></p>
     <p><a href=""> Help </a></p>
 </div>
 <div>
     <p>© 1996-2021, Amazon.com, Inc. or its affiliates</p>
 </div>
    </section>
        </Fragment>
        
    )
}

export default Register;