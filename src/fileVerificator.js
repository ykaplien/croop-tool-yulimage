export default function verifyFileUpload(file) {
  if (file){
    const fileSizeInMB = file.size / 1000 / 1000;
    if (fileSizeInMB < 0.2 && fileSizeInMB > 40) { // CHECK IMAGE SIZE (now from 0.2MB to 40MB)
      throw new Error("Image size is not correct"); // HERE CAN BE HANDLER FOR INCORRECT SIZE ERROR
    } else if (file.type !== "image/jpeg" && file.type !== "image/png") { // CHECK IMAGE TYPE (JPEG, JPG, PNG)
      throw new Error("Image file type is not correct"); // HERE CAN BE HANDLER FOR INCORRECT FILE TYPE ERROR
    }
    if (file.width < 500 || file.height < 500) { // CHECK IMAGE RESOLUTION
      throw new Error("Image resolution is not correct"); // HERE CAN BE HANDLER FOR INCORRECT RESOLUTION ERROR
    } else {
      return true;
    }
  }
}
