import basicInfo from './basicInfo'
import options from './options'
import servers from './servers'
import paths from './pathsApi'
import tags from './tags'
import components from './components'

export { options }
export default {
  ...basicInfo,
  ...servers,
  ...tags,
  ...paths,
  ...components,
}
