import { fetchFileSystem } from './api.js'
import { renderSidebar } from './ui.js'

export let fileSystem = []
document.addEventListener('DOMContentLoaded', async () => {
  fileSystem = await fetchFileSystem()
  if (fileSystem.length > 0) {
    fileSystem[0].expanded = true // Start with the root folder expanded
  }
  renderSidebar()
})
