import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import {toast} from 'react-toastify';
import "./Auth.css"

const PasswordReset = ({history}) => {
    let [user, setUser]= useState ({
        email : '',
        loading: false,
     });
     let {email,loading}= user;
     let handleChange = e =>
     {
            setUser({...user, [e.target.name] : e.target.value });
     };
     let handleSubmit = async e =>
     {
         e.preventDefault();
         try {
             setUser({loading : true});
             await firebase.auth().sendPasswordResetEmail(email);
             let message = `Please check your registered email address to reset password`;
             toast.success(message);
             history.push("/login");
         } catch (err) {
             toast.error(err.message);
         }
         setUser({loading : false});
     }
    return (
        <section id="resetblock">
        <article >
            <div>
            <p>Please reset your password for a more personalised experience.</p>
            <form onSubmit={ handleSubmit}>
            <div className="form-group8">
                 <input type="text"  name="email" id="email" value={email} onChange={handleChange}  required />
                <label htmlFor="email">enter registered Email</label>
            </div>
            <div className="form-group9 ">
              <Link to="/login">Login</Link>
              <Link to="/passwordreset">Password Reset</Link>
            </div>
            <div className="form-group10">
                <button>
                    {loading === true ? 'loading...' : "Reset Password"}
                </button>
            </div>
            </form>
            </div>
            
        </article>
         
    </section>
    )
}

export default withRouter (PasswordReset);
