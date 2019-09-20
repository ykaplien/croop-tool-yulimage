import Dropzone from "dropzone";
import CustomCropper from "./CustomCropper";
import fileVerificator from "./fileVerificator";

// ratio buttons
const squareButton = document.querySelector("#square-button");
const landscapeButton = document.querySelector("#landscape-button");
const portraitButton = document.querySelector("#portrait-button");
// zoom buttons
const scaleIncreaseButton = document.querySelector("#scale-increase");
const scaleDecreaseButton = document.querySelector("#scale-decrease");
// flip buttons
const horizontalFlipButton = document.querySelector("#hor-flip");
const verticalFlipButton = document.querySelector("#ver-flip");
// rotate button + element which display rotation value
const rotationSlider = document.querySelector("#rotate");
const currentRorateValue = document.querySelector("#currentRotateValue");
// crop button
const cropButton = document.querySelector("#crop");
// reset button
const resetButton = document.querySelector("#reset");
// filter buttons
const sepiaButton = document.querySelector("#sepia-button");
const contrastButton = document.querySelector("#contrast-button");
const blackWhiteButton = document.querySelector("#black-white-button");
const withoutFiltersButton = document.querySelector("#without-filters-button");
// canvases + context of result canvas
const canvas = document.querySelector('#main-canvas');
const resultCanvas = document.querySelector("#result-canvas");
const context = resultCanvas.getContext('2d');
// cropped Image
let croppedImage;

const customCropper = new CustomCropper(canvas);

// UPLOAD FILE
const myDropzone = new Dropzone(
  "#dropzone",
  {
    autoProcessQueue: false,
    url: "/",
    maxFiles: 1,
    acceptedFiles: "image/jpg, image/jpeg, image/png"
  }
);

// document.getElementsByClassName("image-container").style.display = "none";

const imgCotainer = document.getElementsByClassName("image-container")[0]; 

myDropzone.on("addedfile", function(file) {
  // debugger;
  if (fileVerificator(file)) {
    const image = new Image();
    image.src = window.URL.createObjectURL(file);

    image.onload = function() {
      customCropper.replace(image.src);
      document.getElementById("dropzone").style.display = "none";
      imgCotainer.style.visibility= "visible";
    };
  }

})

//CROP
cropButton.addEventListener("click", async () => {
  croppedImage = await customCropper.selectDefinedZone();
  resultCanvas.width = croppedImage.naturalWidth;
  resultCanvas.height = croppedImage.naturalHeight;
  context.drawImage(croppedImage, 0, 0);
  resultCanvas.style.visibility= "visible";
  imgCotainer.style.visibility= "hidden";
  myDropzone.style.visibility= "hidden";

});

//FLIP
horizontalFlipButton.addEventListener("click", () => {
  customCropper.horizontalFlip();
});

verticalFlipButton.addEventListener("click", () => {
  customCropper.verticalFlip();
});

// ROTATION
rotationSlider.addEventListener("input", () => {
  const value = parseInt(rotationSlider.value);
  customCropper.rotateTo(value);
  currentRorateValue.innerText = value;
});

// ZOOM
scaleIncreaseButton.addEventListener("click", () => {
  customCropper.zoomIn();
});

scaleDecreaseButton.addEventListener("click", () => {
  customCropper.zoomOut();
});

// ASPECT RATIO
squareButton.addEventListener("click", () => {
  customCropper.setSquareRatio();
});

landscapeButton.addEventListener("click", () => {
  customCropper.setPortraitRatio();
});

portraitButton.addEventListener("click", () => {
  customCropper.setLandscapeRatio();
});

//RESET
resetButton.addEventListener("click", () => {
  customCropper.resetToDefaultState();
  resultCanvas.style.visibility= "hidden";
  imgCotainer.style.visibility= "visible";
  myDropzone.style.visibility= "visible";
});

// FILTERS
sepiaButton.addEventListener("click", () => {
  context.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  context.filter = 'sepia(50%)';
  context.drawImage(croppedImage, 0, 0);
});

blackWhiteButton.addEventListener("click", () => {
  context.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  context.filter = 'grayscale(100%)';
  context.drawImage(croppedImage, 0, 0);
});

contrastButton.addEventListener("click", () => {
  context.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  context.filter = 'contrast(80%)';
  context.drawImage(croppedImage, 0, 0);
});

withoutFiltersButton.addEventListener("click", () => {
  context.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  context.filter = "none";
  context.drawImage(croppedImage, 0, 0);
});