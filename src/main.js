import Dropzone from "dropzone";
import CustomCropper from "./CustomCropper";
import fileVerificator from "./fileVerificator";

let selectedRatio = 'square';

// ratio buttons
const filtersWrapper = document.querySelector('#filtersWrapper');
console.log(filtersWrapper);
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
// rotate selected area button
const rotateSelectedAreaButton = document.querySelector("#rotate-selected-area-button");
// canvases + context of result canvas
const canvas = document.querySelector('#main-canvas');
const resultCanvas = document.querySelector("#result-canvas");
const context = resultCanvas.getContext('2d');
const addToCartClass = document.querySelector('.addToCart');
const addToCart = document.querySelector('#addToCart');
// cropped Image
let croppedImage;
let imageLoaded = false;

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

const myDropzone1 = document.querySelector('#dropzone');

// document.getElementsByClassName("image-container").style.display = "none";

const imgCotainer = document.getElementsByClassName("image-container")[0]; 

myDropzone.on("addedfile", function(file) {
  if (fileVerificator(file)) {
    const image = new Image();
    image.src = window.URL.createObjectURL(file);

    image.onload = function() {
      customCropper.replace(image.src);
      document.getElementById("dropzone").style.display = "none";
      document.getElementById("settings").style.visibility = "visible";
      settings
      imgCotainer.style.visibility= "visible";
      imageLoaded = true;
    };
  }

})

//CROP

function uncheckAll() {
  let prices = document.querySelectorAll('.price');
  prices.forEach(function(el) {
    el.checked = false;
  });
}

function whatToDisplay (selected) {
  let ratios = [
    {
      name: 'square',
      class: 'addToCart--square'
    },
    {
      name: 'digital',
      class: 'addToCart--digital'
    },
    {
      name: 'panorama',
      class: 'addToCart--panorama'
    }
  ];

  ratios.forEach(function(ratio) {
    if(ratio.name != selected) {
      document.getElementsByClassName(ratio.class)[0].style.display = 'none';
    } else {
      document.getElementsByClassName(ratio.class)[0].style.display = 'block';
    }
  })
}

cropButton.addEventListener("click", async () => {
  croppedImage = await customCropper.selectDefinedZone();
  if (imageLoaded) {
    resultCanvas.width = croppedImage.naturalWidth;
    resultCanvas.height = croppedImage.naturalHeight;
    // console.log(filtersWrapper);
    context.drawImage(croppedImage, 0, 0);
    resultCanvas.style.visibility= "visible";
    imgCotainer.style.visibility= "hidden";
    myDropzone1.style.visibility= "hidden";
    filtersWrapper.style.height = 'auto';
    filtersWrapper.style.visibility = 'visible';
    addToCartClass.style.visibility = 'visible';
    uncheckAll();
    whatToDisplay(selectedRatio);
    // console.log(selectedRatio);
  }
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
  selectedRatio = 'square';
  customCropper.setSquareRatio();
  squareButton.classList.add('active');
  landscapeButton.classList.remove('active');
  portraitButton.classList.remove('active');
});

landscapeButton.addEventListener("click", () => {
  selectedRatio = 'digital';
  customCropper.setPortraitRatio();
  landscapeButton.classList.add('active');
  squareButton.classList.remove('active');
  portraitButton.classList.remove('active');
});

portraitButton.addEventListener("click", () => {
  selectedRatio = 'panorama';
  customCropper.setLandscapeRatio();
  portraitButton.classList.add('active');
  squareButton.classList.remove('active');
  landscapeButton.classList.remove('active');
});

// ROTATE SELECTED AREA
rotateSelectedAreaButton.addEventListener("click", () => {
  customCropper.rotateSelectedArea();
});

//RESET
resetButton.addEventListener("click", () => {
  customCropper.resetToDefaultState();
  if (imageLoaded) {
    resultCanvas.style.visibility= "hidden";
    imgCotainer.style.visibility= "visible";
    myDropzone1.style.visibility= "visible";
    filtersWrapper.style.visibility = 'hidden';
    filtersWrapper.style.height = '0px';
    addToCartClass.style.visibility = 'hidden';
    let prices = document.querySelectorAll('.type-variants');
    prices.forEach(function(el){
      el.style.display = 'none';
    })
  }
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

addToCart.addEventListener("click", () => {
  let variants = document.querySelectorAll(`.addToCart--${selectedRatio} > .price`);
  console.log(variants);
  let resPrice = 0;
  for (let price of variants) {
    if (price.checked) {
      resPrice = price.value;
      console.log('Price' ,resPrice);
    }
  }

  const appUri = 'https://api.yulimage.com';


    resultCanvas.toBlob(function(blob){

      let fd = new FormData();
      fd.append( 'picture', blob );
      fd.append( 'price', resPrice );

      $.ajax({
        type: 'POST',
        url: `${appUri}/api/create-product`,
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        success(res) {
            console.log('OK1');
            $.ajax({
                type: "POST",
                url: '/cart/add.js',  
                data: {
                    form_type: 'product',
                    utf8: '%E2%9C%93',
                    id: Number(res),
                    quantity: 1,
                },
                dataType: 'json',
                cache: false,
                success: function(res) {
                  console.log('OK2')
                  window.location.replace('/cart');    
                }
          });
        }
      });
    }, 'image/jpeg', 1);

    function b64toBlob(dataURI) {

      var byteString = atob(dataURI.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/jpeg' });
    }
});

function insertloader () {
  document.getElementById('loaderYul').style.display = 'flex';
  document.querySelector('body').style.overflow = 'hidden';
}

document.getElementById('addToCart').addEventListener('click', insertloader);

// document.getElementsByClassName('addToCart--square')[0].remove() для удаления ноды