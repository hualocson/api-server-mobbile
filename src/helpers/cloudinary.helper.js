const getProductFolder = (productId) => {
  return `mobileapp/product_${productId}`
}

const getCategoryFolder = () => {
  return `mobileapp/category`
}

export default {
  getProductFolder,
  getCategoryFolder,
}
