const productItemInstance = (productItem) => ({
  ...productItem,
  productConfigurations: productItem.productConfigurations.map((item) => {
    return {
      id: item.variationOption.id,
      variation: item.variationOption.variation.name,
      variationId: item.variationOption.variation.id,
      value: item.variationOption.value,
    }
  }),
})

export default productItemInstance
