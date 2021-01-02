import React from "react";
import axios from "axios";
import Movie from "./Movie";

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
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json")
    this.setState({movi:movies, isLoading: false})
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
   const {isLoading, movi} = this.state;
   return <div>
     {
       isLoading ? "Loading..." : movi.map(mlist =>{
         return <Movie 
         key={mlist.id}
         id={mlist.id}
         year={mlist.year}
         title={mlist.title}
         summary={mlist.summary}
         poster={mlist.medium_cover_image}
         />
       })
     }
   </div>
  }
}

export default App;
