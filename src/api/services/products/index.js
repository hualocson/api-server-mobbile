import productService from './product.service'
import productItemService from './productItem.service'

export default {
  ...productItemService,
  ...productService,
}
