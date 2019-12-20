import React, { Component } from "react";
import Dropzone from 'react-dropzone'
import './uploader.css';


export default class Uploader extends Component { 


  state = {
    imagelink:''    
  }

  send = async acceptedFile => {
    console.log("clicked");
    
    // e.preventDefault();
    const link = "http://localhost:5000/api/uploads/";
    const img = new FormData();
    img.append("file", acceptedFile[0]);

    const response = await fetch(link, {
      method: "POST",
      body: img
    });

    const respJson = await response.json();
    const path = respJson.path;
    // console.log("path:", path);
    // this.props.setImage(path)
  };
  render() {
    return (
      <Dropzone onDrop={acceptedFile => this.send(acceptedFile)}>
  {() => (
    <section >
            <div className="drop-container">
        {/* <input  /> */}
        <p>Добавьте фото вашего рецепта</p>
      </div>
    </section>
  )}
</Dropzone>
    );
  }
}
