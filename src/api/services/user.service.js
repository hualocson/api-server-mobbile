import ApiError from '~/utils/api-error'
import httpStatus from 'http-status'
import { osHelpers } from '~helpers/index'

// [GET] '/users/'
const getListUser = async (prisma) => {
  const allUsers = await prisma.user.findMany()

  return { allUsers }
}

const getUserByEmail = async (prisma, email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  return user
}

// [GET] '/users/profile'
const getUserProfile = async (prisma, userId) => {
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'User id is required')
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      avatar: true,
      gender: true,
    },
  })
  return user
}

// [PATCH] /users/:id => update user
const updateUser = async (prisma, userId, data) => {
  const { firstName, lastName, phone, avatar, gender } = data
  if (
    gender !== 'UNKNOWN' &&
    gender !== 'MALE' &&
    gender !== 'FEMALE' &&
    gender !== 'OTHER'
  )
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')
  const user = await prisma.user.findUnique({
    where: { id: osHelpers.toNumber(userId) },
  })

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const updatedUser = await prisma.user.update({
    where: { id: osHelpers.toNumber(userId) },
    data: {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      phone: phone || user.phone,
      avatar: avatar || user.avatar,
      gender,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      avatar: true,
      gender: true,
    },
  })

  return updatedUser
}

// #region address

// [POST] /users/addresses => create new address use middleware
const createAddress = async (prisma, userId, data) => {
  const { name, street, city, state, zip, addressDetails, isDefault } = data

  if (!name || !street || !city || !state || !zip || !addressDetails) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields')
  }
  const user = prisma.user.findUnique({
    where: { id: osHelpers.toNumber(userId) },
  })

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const addresses = await prisma.address.findMany({
    where: { userId: osHelpers.toNumber(userId) },
  })

  const addressData = {
    name,
    street,
    city,
    state,
    zip,
    addressDetails,
    isDefault: osHelpers.toBool(isDefault),
    user: {
      connect: { id: userId },
    },
  }

  if (addresses.length === 0) {
    // first address will be default
    addressData.isDefault = true
  } else if (addressData.isDefault) {
    await prisma.address.updateMany({
      where: {
        userId: osHelpers.toNumber(userId),
      },
      data: {
        isDefault: false,
      },
    })
  }

  const newAddress = await prisma.address.create({
    data: addressData,
  })

  return newAddress
}

// [GET] /users/addresses => get all address of user
const getAllAddress = async (prisma, userId, flag) => {
  let getDefault = false
  if (flag) getDefault = flag.toLowerCase() === 'default'
  const user = await prisma.user.findUnique({
    where: { id: osHelpers.toNumber(userId) },
  })

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const condition = { userId: osHelpers.toNumber(userId) }
  if (getDefault) condition.isDefault = true

  const addresses = await prisma.address.findMany({
    where: { ...condition },
    orderBy: [
      { isDefault: 'desc' }, // default address first
      { id: 'asc' },
    ],
  })

  return addresses
}

// [PATCH] /users/addresses/:addressId => update address
const updateAddress = async (prisma, userId, addressId, data) => {
  const { name, street, city, state, zip, addressDetails, isDefault } = data

  const user = await prisma.user.findUnique({
    where: { id: osHelpers.toNumber(userId) },
  })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const address = await prisma.address.findUnique({
    where: { id: osHelpers.toNumber(addressId) },
  })
  if (!address) throw new ApiError(httpStatus.NOT_FOUND, 'Address not found')
  if (osHelpers.toBool(isDefault)) {
    await prisma.address.updateMany({
      where: {
        userId: osHelpers.toNumber(userId),
      },
      data: {
        isDefault: false,
      },
    })
  }

  const updatedAddress = prisma.address.update({
    where: { id: osHelpers.toNumber(addressId) },
    data: {
      name: name || address.name,
      street: street || address.street,
      city: city || address.city,
      state: state || address.state,
      zip: zip || address.zip,
      addressDetails: addressDetails || address.addressDetails,
      isDefault:
        isDefault !== undefined
          ? osHelpers.toBool(isDefault)
          : address.isDefault,
    },
  })

  return updatedAddress
}

// [DELETE] /users/addresses/:addressId => delete address
const deleteAddress = async (prisma, userId, addressId) => {
  const user = await prisma.user.findUnique({
    where: { id: osHelpers.toNumber(userId) },
  })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  const address = await prisma.address.findUnique({
    where: { id: osHelpers.toNumber(addressId) },
  })
  if (!address) throw new ApiError(httpStatus.NOT_FOUND, 'Address not found')

  const defaultAddress = await prisma.address.findFirst({
    where: {
      userId: osHelpers.toNumber(userId),
      isDefault: true,
    },
  })

  if (defaultAddress.id === osHelpers.toNumber(addressId)) {
    // If the address to be deleted is the default address, find the next most recent address and set it as the new default
    const newDefaultAddress = await prisma.address.findFirst({
      where: {
        user: {
          id: osHelpers.toNumber(userId),
        },
        NOT: {
          id: osHelpers.toNumber(addressId), // exclude the address being deleted
        },
      },
      orderBy: {
        createdAt: 'desc', // select the most recent address
      },
    })

    if (newDefaultAddress) {
      // Set the new default address
      await prisma.address.update({
        where: { id: newDefaultAddress.id },
        data: { isDefault: true },
      })
    }
  }

  const deletedAddress = await prisma.address.delete({
    where: { id: osHelpers.toNumber(addressId) },
  })

  return deletedAddress
}

// #endregion
export default {
  getListUser,
  getUserByEmail,
  getUserProfile,
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  updateUser,
}
