import { fetchFileSystem } from './api.js'

export let fileSystem = []
document.addEventListener('DOMContentLoaded', async () => {
  fileSystem = await fetchFileSystem()
})
