import createProduct from './createProduct'
import getAllProducts from './getAllProducts'
import updateProductImage from './updateProductImage'

export default {
  '/products': {
    ...getAllProducts,
    ...createProduct,
  },
  '/products/{productId}/image': {
    ...updateProductImage,
  },
}
