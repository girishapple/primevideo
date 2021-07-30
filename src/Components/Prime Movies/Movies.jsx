import React from "react";
import { withRouter, Link } from "react-router-dom";
const Movies = props => {
  let { state } = props.location;
  let {
    poster,
    video,
    movie_name,
    year,
    description,
    certificate,
    rating,
    language,
    id,
  } = state;
  return (
    <section id="PosterBlock">1
      <article>

        <main className="container">
          <div className="desc">
            <h2>{movie_name}</h2>
            <div className="certificate">{certificate}</div>
            <div className="movie_desc">
              <h1>Description</h1>
             {description}
            </div>
            <div className="watch">
              <Link
                to={{
                  pathname: `/movie/${movie_name}/${id}`,
                  state: { ...state },
                }}
              >
               <button>Watch Now</button>
              </Link>
            </div>
          </div>
          <div class="showcase_poster">
            <img src={poster} alt={movie_name} />
          </div>
        </main>
      </article>
    </section>
  );
};

export default withRouter(Movies);