import productItemInstance from './productItem.model'

const productInstance = (product, aggregate) => {
  if (product.productItems) {
    return {
      ...product,
      minPrice: aggregate._min.price,
      productItems: product.productItems.map((item) =>
        productItemInstance(item),
      ),
    }
  }
  return {
    ...product,
    minPrice: aggregate._min.price,
  }
}

export default productInstance
