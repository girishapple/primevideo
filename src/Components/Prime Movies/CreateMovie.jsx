import React, { useState } from 'react';
import "./Movie.css"
import {withRouter} from 'react-router-dom';
import firebase from "../../firebase";
import {toast} from 'react-toastify';

const CreateMovie = props => {
    let [state, setState] = useState({
        movie_name: "",
        movie_year: "",
        movie_description: "",
        movie_language: "",
        movie_certificate: "",
        movie_rating: "",
        barStatus: false,
        loading: "",
        progress: 0,
      });
    
      let [Poster, setPoster] = useState();
      let [Video, setVideo] = useState();
    
      let {
        movie_name,
        movie_year,
        movie_description,
        movie_rating,
        movie_certificate,
        movie_language,
        barStatus,
        loading,
        progress,
      } = state;
    
      let handlePoster = e => {
        setPoster({ Poster: e.target.files[0] });
      };
    
      let handleVideo = e => {
        setVideo({ Video: e.target.files[0] });
      };
      let handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
      };
    
      let handleSubmit = async e => {
        e.preventDefault();
        setState({ loading: true });
        try {
          firebase
            .storage()
            .ref(`/upload-poster/${Poster.Poster.name}`)
            .put(Poster.Poster);
          let uploadVideo = firebase
            .storage()
            .ref(`/upload-video/${Video.Video.name}`)
            .put(Video.Video);
    
          //!!!!!  update Video//
          uploadVideo.on(
            "state_changed",
            snapShot => {
              let progress = Math.round(
                (snapShot.bytesTransferred / snapShot.totalBytes) * 100
              );
              setState({ progress, barStatus: true });
            },
            err => {},
            async () => {
              let downloadPoster = await firebase
                .storage()
                .ref("upload-poster")
                .child(Poster.Poster.name)
                .getDownloadURL();
              console.log(downloadPoster);
              setPoster({ downloadPoster });
    
              let downloadVideo = await firebase
                .storage()
                .ref("upload-video")
                .child(Video.Video.name)
                .getDownloadURL();
              setPoster({ downloadVideo });
    
              await firebase
                .database()
                .ref("voot-video")
                .push({
                  ...state,
                  downloadPoster,
                  downloadVideo,
                });
              toast.success("successfully movie uploaded");
              props.history.push("/");
            }
          );
        } catch (err) {
          console.log(err);
        }
      };
    
      let ProgressBar = () => {
        return <progress value={progress} max={100} min={0}></progress>;
      };
    return (
        <section id="movieblock">
        <article >
        <header className="progressBlock">
          <div className="leftProgress">
            {barStatus === true ? <ProgressBar /> : ""}
          </div>
          <div className="rightProgress">
            {barStatus === true ? progress + "%" : ""}
          </div>
        </header>
            <div>
                    <h1>Upload Movies</h1>
            <form onSubmit={handleSubmit} >
           <div className="group">
               <label htmlFor="movie_name">movie_name</label>
               <input type="text" className="control"
                id="movie_name"
                 name="movie_name"
                  value={movie_name} 
                  onChange={handleChange} />
            </div>
            <div className="group">
               <label htmlFor="movie_poster">movie_poster</label>
               <input type="file" className="control"
                id="movie_poster"
                name="poster"
                onChange={handlePoster} />
            </div>
            <div className="group">
               <label htmlFor="movie_video">movie_video</label>
               <input type="file" className="control"
               id="movie_video" 
               name="video" 
               onChange={handleVideo} />
            </div>
            <div className="group">
               <label htmlFor=" movie_year"> movie_year</label>
               <input type="date" className="control" 
                id="movie_year" 
                name="movie_year" 
                 value={movie_year} 
                 onChange={handleChange}/>
            </div>
            <div className="group">
               <label htmlFor=" movie_certificate"> movie_certificate</label>
               <input type="text" className="control" 
               id="movie_certificate" 
               name="movie_certificate" 
                value={movie_certificate} 
                onChange={handleChange} />
            </div>
            <div className="group">
               <label htmlFor="movie_language">movie_language</label>
               <input type="text" className="control" 
               id="movie_language" name="movie_language" 
               value={movie_language} onChange={handleChange} />
            </div>
            <div className="group">
               <label htmlFor=" movie_rating"> movie_rating</label>
               <input type="number" className="control"
                id="movie_rating" 
                name="movie_rating" 
                 value={movie_rating} 
                 onChange={handleChange} />
            </div>
            <div className="group">
               <label htmlFor="movie_description">movie_description</label>
               <textarea className="control" 
               id="movie_description"
                name="movie_description" 
                 value={movie_description} 
                 onChange={handleChange} > </textarea>
            </div>
            <div className="btn-group">
            <button>{loading===true ? "loading" : "upload movie"}</button>
            </div>
             </form>
            
            </div>
           </article>    
    </section>
    )
}

export default withRouter( CreateMovie);