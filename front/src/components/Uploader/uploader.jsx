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
      const path = respJson.path
      console.log("path:", path);

      ////////////////getting image////////
    //   const response2 = await fetch(link+'img', {
    //       method: "POST",
    //       headers: { "content-type": "application/json" },
    //       body: JSON.stringify({ path })
    // });
    //   const response2 = await fetch(link+path)
    //   const respJson2 = await response2.json();
    //   console.log("respJson2:", respJson2);

      
  };
  render() {
    return (
      <>
        <p>Загрузите фото для вашего рецепта</p>
        <div>
          <form onSubmit={this.send} method="post">
            {/* <form action='http://localhost:5000/api/uploads/' method="post" enctype="multipart/form-data"  > */}
            {/* <form action="http://localhost:5000/api/upload" method="post"  /> */}
            {/* <input type="file" name="avatar" accept="image/*" /> */}
                    <input type="file" name="imgInput" />
                      
            <button>Загрузите фото</button>
          </form>
        </div>
      </>
    );
  }
}

// export default class MyUploader extends Component {
//   render() {
//     return (
//       <>
//         <p>Upload your file here</p>
//         <div>
//           <form action="http://localhost:5000/api/upload" method="post" encType="multipart/form-data">
//             <input type="file" name="avatar" />
//           </form>
//         </div>
//       </>
//     );
//   }
// }
