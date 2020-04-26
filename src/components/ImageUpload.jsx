import React, { Component } from 'react'

export class ImageUpload extends Component {
    render() {
        return (
            <div>
                <input type="file"/>
                <button>Upload</button>
            </div>
        )
    }
}

export default ImageUpload
