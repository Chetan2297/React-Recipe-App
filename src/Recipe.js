import React, { useState } from "react";
import Axios from "axios";

import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "1ddca4ec";
const APP_KEY = "a6f68afbae268db7ca5bc8292b21f729";

const RecipeContainer = styled.div`
  padding: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage = styled.img`
  height: 200px;
  object-fit: cover;
`;
const RecipeName = styled.span`
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  font-size: 18px;
  font-weight: 600;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  color: #eb3300;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  border: solid 1px green;
  margin-bottom: 12px;
  color: green;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;

const RecipeComponent = (props) => {
const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("close")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Recipe Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredients</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Show Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        Show Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};
const Container = styled.div`
  flex-direction: column;
  display: flex; 
`;
const AppName = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
`;
const Header = styled.div`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: purple;
  color: white;
  display: flex;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  display: flex;
  flex-direction: row;
  background-color: white;
`;
const SearchIcon = styled.img`
  height: 32px;
  width: 32px;
`;
const RecipeImage = styled.img`
  height: 36px;
  margin: 15px;
  width: 36px;
`;
const Placeholder = styled.img`
  margin: 200px;
  opacity: 50%;
  width: 120px;
  height: 120px;
`;
const SearchInput = styled.input`
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  color: red;
  margin-left: 15px;
`;
const RecipeListContainer = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const Recipe = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {

    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 200);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <RecipeImage src="https://i.ibb.co/6tgvQjv/Recipe.jpg" />
          Recipe Searcher
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Your Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src="https://i.ibb.co/6tgvQjv/Recipe.jpg" />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default Recipe;