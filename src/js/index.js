import { fetchFileSystem } from './api.js'
import { renderSidebar, renderContent } from './ui.js'

export let fileSystem = []
document.addEventListener('DOMContentLoaded', async () => {
  fileSystem = await fetchFileSystem()
  if (fileSystem.length > 0) {
    fileSystem[0].expanded = true // Start with the root folder expanded
  }
  renderSidebar()
  renderContent(fileSystem[0])
})
