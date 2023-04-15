import productController from './product.controller'
import productItemController from './productItem.controller'

export default {
  ...productController,
  ...productItemController,
}
