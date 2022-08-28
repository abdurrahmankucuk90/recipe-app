import { HomeImg, HeaderText, ImgDiv } from "./Home.style.jsx";
import homeSvg from "../../assets/home.svg";

import Header from "../../components/header/Header";
import axios from "axios";
import { useState } from "react";
import Cards from "../../components/cards/Cards.jsx";

const Home = () => {
  const mealType = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];

  const [query, setQuery] = useState("egg");
  const [selectedMeal, setSelectedMeal] = useState(mealType[0]);

  const [recipes, setRecipes] = useState(null);

  //!bunlari yapinca projeyi durdurup acmamiz gerekiyor....
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${selectedMeal}`;

  const getData = async () => {
    if (query) {
      try {
        //!Axios data.data seklinde getiriyor {data} ile destruction yaptigimiz icin sorun cozuluyor.
        const { data } = await axios.get(url);
        setRecipes(data.hits);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please enter yout meal");
    }
  };

  //  console.log(recipes);

  return (
    <div>
      <Header
        setQuery={setQuery}
        setSelectedMeal={setSelectedMeal}
        mealType={mealType}
        getData={getData}
      />

      {!recipes && (
        <ImgDiv>
          <HomeImg src={homeSvg} />
        </ImgDiv>
      )}

      {recipes?.length === 0 && (
        <HeaderText>The Food can not be found</HeaderText>
      )}

      {recipes?.length > 0 && <Cards recipes={recipes} />}
    </div>
  );
};

export default Home;
