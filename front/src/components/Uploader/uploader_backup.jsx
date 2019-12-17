import React, { Component } from "react";
// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

export default class MyUploader extends Component {
  send = async e => {
    console.log("clicked");

    e.preventDefault();
    const link = "http://localhost:5000/api/uploads/";
    const img = new FormData();
    img.append("file", e.target.imgInput.files[0]);

    const response = await fetch(link, {
      method: "POST",
      body: img
    });

    const respJson = await response.json();
    const path = respJson.path;
    console.log("path:", path);
  };
  render() {
    return (
      <>
        <p>Загрузите фото для вашего рецепта</p>
        <div>
          <form onSubmit={this.send} method="post">
            <input type="file" name="imgInput" />

            <button>Загрузите фото</button>
          </form>
        </div>
      </>
    );
  }
}
