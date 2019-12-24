import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./uploader.css";

export default class Uploader extends Component {
  state = {
    imagelink: ""
  };

  send = async acceptedFile => {
    const link = "/api/uploads/";
    const img = new FormData();
    img.append("file", acceptedFile[0]);

    const response = await fetch(link, {
      method: "POST",
      body: img
    });

    const respJson = await response.json();
    const path = respJson.path;
    alert("Ваше фото добавлено к рецепту !");
    this.props.setImage("/api/uploads/" + path);
  };

  render() {
    return (
      <Dropzone onDrop={acceptedFile => this.send(acceptedFile)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className="drop-container" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Добавьте фото вашего рецепта</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}
