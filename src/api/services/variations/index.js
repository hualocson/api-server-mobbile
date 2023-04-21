import variationService from './variation.service'
import variationOptionService from './variationOption.service'

export default {
  ...variationService,
  ...variationOptionService,
}
