import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import {storage} from './firebase';


class App extends Component {

  
  state = {
    image: null,
    url: '',
    progress: 0,
  }

  handleChange = (event) => {
    if(event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({image});
    }
  }

  handleUpload = () => {
    const {image} = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
     (snapshot) => {
      //progress function
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
     }, 
     (error) => {
       //error function
       console.log(error);
     }, 
     () => {
       //complete function
       storage.ref('images').child(image.name).getDownloadURL().then(url => {
         console.log(url);
         this.setState({url});
       })
     });
  }

  render() {
    return (
      <div className="style">
        <progress value={this.state.progress} max="100"/>

        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
      </div>
    );
  }
}

export default App;
