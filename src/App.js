import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{
  state = {
    isLoading: true,
    movi: []
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=download_count")
    this.setState({movi:movies, isLoading: false})
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
   const {isLoading, movi} = this.state;
   return <section className="container">
     {
       isLoading ? (
       <div className="loader">
         <span className="loader_text">Loading...</span>
       </div> 
      ) : (
        <div className="movies">
          {movi.map(mlist =>(
          <Movie 
            key={mlist.id}
            id={mlist.id}
            year={mlist.year}
            title={mlist.title}
            summary={mlist.summary}
            poster={mlist.medium_cover_image}
            genres={mlist.genres}
          />
          ))}
        </div>
      )}
   </section>
  }
}

export default App;
