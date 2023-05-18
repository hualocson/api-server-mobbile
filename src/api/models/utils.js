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
        id: true,
        value: true,
      },
    },
  },
  orderBy: {
    variationOptionId: 'asc',
  },
}

export default { productConfigurationsSelectOptions }
