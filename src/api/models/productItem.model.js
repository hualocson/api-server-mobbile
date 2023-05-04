const productItemInstance = (productItem) => ({
  ...productItem,
  productConfigurations: productItem.productConfigurations.map((item) => {
    return {
      id: item.variationOption.variation.id,
      variation: item.variationOption.variation.name,
      value: item.variationOption.value,
    }
  }),
})

export default productItemInstance
