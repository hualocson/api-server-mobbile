import httpStatus from 'http-status'
import { osHelpers } from '~helpers/index'
import ApiError from '~utils/api-error'
import cloudinary from '~configs/cloudinary.config'

// remote url
const uploadImage = async (imagePath, folderPath, imageName = 'base') => {
  const photo = await cloudinary.uploader.upload(imagePath, {
    folder: folderPath,
    public_id: imageName,
  })

  return photo.secure_url
}

// return image url local
const uploadProductImage = async (productId, imagePath, imageName = 'base') => {
  const imgPath = osHelpers.getPath(imagePath)

  const photo = await uploadImage(
    imgPath,
    `mobileapp/product_${productId}`,
    imageName,
  )

  if (!photo) throw new ApiError(httpStatus.BAD_REQUEST, 'Upload image failed')
  return photo.secure_url
}

// return image url remote
const uploadProductImageWithRemoteUrl = async (
  productId,
  imageUrl,
  imageName = 'base',
) => {
  const photo = await uploadImage(
    imageUrl,
    `mobileapp/product_${productId}`,
    imageName,
  )

  if (!photo) throw new ApiError(httpStatus.BAD_REQUEST, 'Upload image failed')
  return photo.secure_url
}

export default {
  uploadImage,
  uploadProductImage,
  uploadProductImageWithRemoteUrl,
}
