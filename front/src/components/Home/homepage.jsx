import React from 'react';
import RecipeList from '../RecipeList';
import SortPanel from '../SortPanel';


function Home() {
  return (
    <div className="Home">
      <SortPanel />
      <RecipeList />
    </div>
  )
}

export default Home;
