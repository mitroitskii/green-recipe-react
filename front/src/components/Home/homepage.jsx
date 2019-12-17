import React from 'react';
import RecipeList from '../RecipeList';
import MyUploader from '../Uploader/uploader';


function Home() {
  return (
    <div className="Home">
      <RecipeList />
      <MyUploader/>
    </div>
  )
}

export default Home;
