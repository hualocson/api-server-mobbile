import path from 'path'

export const getRootPath = () => {
  const base_path = path.join(__dirname, "../../")
  return base_path
}
