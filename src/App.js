import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const APP_ID = "3a157367"; //API_id
  const APP_KEY = "7efecb7369721d370d617d2d48cd00a9"; // APP_KEY
  const [recipes,setRecipe]=useState([]); 
  const[search,setSearch]=useState("");
  const[query,setQuery]=useState('chicken');
  useEffect(() => {
    getRecipe();
  }, [query]);//we specify when  should the useEffect function run in square brackets.here it runs only when the query changes.

  //getRecipe function is responsible to fetch our required data.
  const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data=await response.json();
    setRecipe(data.hits); //we use .hits to remove hits from the request because they can sometimes limit the requests
    console.log(data.hits);
  };
 const updateSearch = e=>{
    setSearch(e.target.value);
  
 }
 const getSearch =e=>{
   e.preventDefault();
   setQuery(search);
   setSearch('');  //to set the search column blank after serching once and getting results for the search
 }
  return (
    <div className="App">
      <form  onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="Recipes">
      {recipes.map(recipe=>(
       
        <Recipe  key={recipe.recipe.label} title={recipe.recipe.label}  calories={recipe.recipe.calories}
        image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
};

export default App;
