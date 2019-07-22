import React, { Component } from 'react'
import PhotoGallery from './components/photo-gallery'
import PhotoUpload from './components/photo-upload'
import PhotoSearch from './components/photo-search'
import PhotoInfo from './components/photo-info'
import Header from './components/header'
import './app.css'

class App extends Component {
    state = {
        images: [],
        visibleImages: [],
        selectedImage: null,
        scrollPos: 0,
    }

    componentDidMount() {
        fetch('/images')
        .then(res => res.json())
        .then(images => this.setState({images, visibleImages: images}))
    }

    componentDidUpdate() {
        window.scrollTo(0, this.state.scrollPos);
    }
    
    render() {
        let photoInfo
        if (this.state.selectedImage) {
            photoInfo = <PhotoInfo image={this.state.selectedImage} reset={() => this.selectImage()} />
        } else {
            photoInfo = null
        }
        return (
            <div className="App">
                <div className="sticky">
                    <Header />
                    <div className="inputs">
                        <PhotoUpload updateImages={(i) => this.updateImages(i)} />
                        <PhotoSearch setVisibleImages={(s) => this.setVisibleImages(s)} />
                    </div>
                </div>
                <PhotoGallery
                    images={this.state.visibleImages}
                    selectImage={(i) => this.selectImage(i)} />
                {photoInfo}
            </div>
        );
    }

    updateImages = (image) => {
        const images = this.state.images.concat(image)
        this.setState({ images, visibleImages: images })
    }

    setVisibleImages = (searchString) => {
        if (searchString) {
            const searchArray = searchString.toLowerCase().split(' ').filter(tag => tag !== '')
            const visibleImages = this.state.images.filter(image => {
                if (image.tags) {
                    for (const searchTag of searchArray) {
                        if (!image.tags.toLowerCase().includes(searchTag)) {
                            return false
                        }
                    }
                    return true
                }
                return false
            })
            this.setState({ visibleImages, selectedImage: null })
        } else {
            this.setState({ visibleImages: this.state.images })
        }
    }

    selectImage = (imageName) => {
        if (imageName) {
            const selectedImage = this.state.images.find(image => image.name === imageName)
            this.setState({ selectedImage, visibleImages: [], scrollPos: window.scrollY })
        } else {
            this.setState({ selectedImage: null, visibleImages: this.state.images })
        }
    }
}

export default App;
