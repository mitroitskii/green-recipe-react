import React from 'react';
import RecipeList from '../RecipeList';
import MyUploader from '../Uploader/uploader';

export default function Home() {
  return (
    <div className="Home">
      <RecipeList />
      <MyUploader/>
    </div>
  )
}

