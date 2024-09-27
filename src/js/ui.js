import { fileSystem } from './index.js'
import { hasNoFolders } from './utils.js'

// Function to render the sidebar with the updated logic for arrows and indentations
export const renderSidebar = () => {
  const sidebar = document.getElementById('sidebar')
  sidebar.innerHTML = ''
  const ul = document.createElement('ul')
  fileSystem.forEach(node => renderTreeNode(ul, node, 0)) // Start with depth 0
  sidebar.appendChild(ul)
}

const renderTreeNode = (parentElement, node, depth) => {
  if (node.type === 'file') return // Skip files

  const li = document.createElement('li')
  li.classList.add('tree-node')

  const container = document.createElement('div')
  container.classList.add('node-container')
  container.style.marginLeft = `${depth * 20}px` // Indent based on depth
  li.addEventListener('click', () => {
    node.expanded = !node.expanded
    renderSidebar() // Re-render the sidebar to reflect changes
  })

  const arrow = document.createElement('span')
  arrow.textContent = hasNoFolders(node) ? '' : '►' // Arrow right if it has child folders
  arrow.classList.add('arrow')
  if (node.expanded && !hasNoFolders(node)) {
    arrow.textContent = '▼' // Arrow down if expanded
  }
  container.appendChild(arrow)

  const text = document.createElement('span')
  text.textContent = node.name
  text.classList.add('name')
  container.appendChild(text)

  li.appendChild(container)
  parentElement.appendChild(li)

  if (node.children && node.expanded) {
    const ul = document.createElement('ul')
    ul.classList.add('children')
    node.children.forEach(child => renderTreeNode(ul, child, depth + 1)) // Increase depth for children
    parentElement.appendChild(ul)
  }
}
