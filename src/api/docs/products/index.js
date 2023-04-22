import createProduct from './createProduct'
import createCategory from './createCategory'
import createProductItem from './createProductItem'
import getAllProducts from './getAllProducts'
import getAllProductByCategoryId from './getAllProductByCategoryId'
import getProductById from './getProductById'
import updateProductImage from './updateProductImage'

export default {
  '/categories/products/{productId}/items': {
    ...createProductItem,
  },

  '/categories/products': {
    ...getAllProducts,
    ...createProduct,
  },
  '/categories': {
    ...createCategory,
  },
  '/categories/{id}/products': {
    ...getAllProductByCategoryId,
  },
  '/categories/products/{productId}': {
    ...getProductById,
  },
  '/categories/products/{productId}/image': {
    ...updateProductImage,
  },
}
