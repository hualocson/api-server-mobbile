const productItemInstance = (productItem) => ({
  ...productItem,
  productConfigurations: productItem.productConfigurations.map((item) => {
    return {
      variation: item.variationOption.variation.name,
      value: item.variationOption.value,
    }
  }),
})

export default productItemInstance
