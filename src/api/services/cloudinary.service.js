import { v2 as cloudinary } from 'cloudinary'
import httpStatus from 'http-status'
import osHelpers from '~helpers/index'
import ApiError from '~utils/api-error'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// return image url
const uploadProductImage = async (productId, imagePath) => {
  const imgPath = osHelpers.getPath(imagePath)
  const photo = await cloudinary.uploader.upload(imgPath, {
    folder: `mobileapp/product_${productId}`,
  })

  if (!photo) throw new ApiError(httpStatus.BAD_REQUEST, 'Upload image failed')
  return photo.secure_url
}

const uploadProductImageWithRemoteUrl = async (productId, imageUrl) => {
  const photo = await cloudinary.uploader.upload(imageUrl, {
    folder: `mobileapp/product_${productId}`,
  })

  if (!photo) throw new ApiError(httpStatus.BAD_REQUEST, 'Upload image failed')
  return photo.secure_url
}
export default {
  uploadProductImage,
  uploadProductImageWithRemoteUrl,
}
