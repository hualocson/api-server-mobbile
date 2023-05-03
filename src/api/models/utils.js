const productConfigurationsSelectOptions = {
  select: {
    variationOption: {
      select: {
        variation: {
          select: {
            id: true,
            name: true,
          },
        },
        value: true,
      },
    },
  },
}

export default { productConfigurationsSelectOptions }
