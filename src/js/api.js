export const fetchFileSystem = async () => {
  try {
    const response = await fetch('/api/filesystem')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch file system data', error)
  }
}
