import 'cropperjs/dist/cropper.css';
import Cropper from "cropperjs";

export default class CustomCropper extends Cropper{
  constructor(element, options) {
    let defaultOptions = {
      autoCropArea : 1,
      viewMode : 2,
      background: false // TRUE - background with squares; FALSE - black background
    };

    const mergedOptions = Object.assign({}, defaultOptions, options);
    super(element, mergedOptions);
    this.setSquareRatio();
  }

  selectDefinedZone() {
    return new Promise((resolve, reject) => {
      this.getCroppedCanvas().toBlob((blob) => {
        const img = new Image();
        img.src = window.URL.createObjectURL(blob);
        img.onload = () => resolve(img);
      });
    });
  }

  horizontalFlip() {
    const newValue = this.imageData.scaleX === 1 ? -1 : 1;
    this.scaleX(newValue);
  }

  verticalFlip() {
    const newValue = this.imageData.scaleY === 1 ? -1 : 1;
    this.scaleY(newValue);
  }

  zoomIn() {
    this.zoom(0.1);
  }

  zoomOut() {
    this.zoom(-0.1);
  }

  setSquareRatio() {
    this.setAspectRatio(1);
  }

  setLandscapeRatio() {
    this.setAspectRatio(2);
  }

  setPortraitRatio() {
    this.setAspectRatio(1.3333333333333);
  }

  rotateSelectedArea() {
    let { width, height } = this.getCropBoxData();
    this.setAspectRatio(height / width);
    this.setCropBoxData({
      width: height,
      height: width
    });
  }

  resetToDefaultState() {
    this.reset();
    this.setSquareRatio();
  }
}