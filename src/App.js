import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";
import Recipe from "./Recipe";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin: "10px auto",
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function App() {
  const classes = useStyles();
  const APP_ID = "fd651cc6";
  const APP_KEY = "6cbc76dedcec472911da5bc2074339d8";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(()=> {
    getRecipe();
  }, [query]);
  const getRecipe =async() => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setRecipes(response.data.hits);
      console.log(response);
  };
  const updateSearch=(event)=> {
    setSearch(event.target.value);
  };
  const updateQuery=(event)=> {
    event.preventDefault();
    setQuery(search);
  };
  return (
    <div>
      <Paper onSubmit={updateQuery} component="form" className={classes.root}>
      
      <InputBase
         type="text" 
         value={search} 
         onChange={updateSearch}
        className={classes.input}
        placeholder="Search for Recipe"
        inputProps={{ 'aria-label': 'search for recipe' }}
      />
       <IconButton
       type="submit"
       className={classes.input}
       aria-label="search"
       />
      <SearchIcon />
    </Paper>
    <div style={{margin:"10px"}}>
      <Grid container>
      {recipes.map((recipe)=> (
        <Grid  item xs={3}>
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients}
        />
        </Grid>
      ))}
      </Grid>
      </div>
    </div>
  );
}

export default App;
