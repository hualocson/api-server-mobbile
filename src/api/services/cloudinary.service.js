import httpStatus from 'http-status'
import { osHelpers } from '~helpers/index'
import ApiError from '~utils/api-error'
import cloudinary from '~configs/cloudinary.config'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

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

  const photoUrl = await uploadImage(
    imgPath,
    `mobileapp/product_${productId}`,
    imageName,
  )

  if (!photoUrl)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Upload image failed')
  return photoUrl
}

// return image url remote
const uploadProductImageWithRemoteUrl = async (
  productId,
  imageUrl,
  imageName = 'base',
) => {
  const photoUrl = await uploadImage(
    imageUrl,
    `mobileapp/product_${productId}`,
    imageName,
  )

  if (!photoUrl)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Upload image failed')
  return photoUrl
}

// return image url remote
const uploadUserAvatar = async (userId, imageUrl) => {
  const photoUrl = await uploadImage(
    imageUrl,
    `mobileapp/user`,
    `user_${userId}`,
  )

  if (!photoUrl)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Upload image failed')

  return photoUrl
}

const getUploader = () => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'user-images',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    },
  })
  const upload = multer({ storage })
  return upload
}

export default {
  uploadImage,
  uploadProductImage,
  uploadProductImageWithRemoteUrl,
  getUploader,
  uploadUserAvatar,
}
