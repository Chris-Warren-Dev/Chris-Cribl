import { fileSystem } from './index.js'
import { getFileSize, getIconType, hasNoFolders } from './utils.js'

let selectedTreeNodeName = null
let selectedContentNodeName = null
// Function to render the sidebar with the updated logic for arrows and indentations
export const renderSidebar = () => {
  const sidebar = document.getElementById('sidebar')
  sidebar.innerHTML = ''
  const ul = document.createElement('ul')
  fileSystem.forEach(node => renderTreeNode(ul, node, 0)) // Start with depth 0
  sidebar.appendChild(ul)
}

const renderTreeNode = (parentElement, node, depth) => {
  if (node.type === 'file') return // Do not show files in the sidebar

  const li = document.createElement('li')
  li.classList.add('tree-node')
  if (selectedTreeNodeName === node.name) {
    li.classList.add('selected')
  }

  const container = document.createElement('div')
  container.classList.add('node-container')
  container.style.marginLeft = `${depth * 20}px` // Indent based on depth
  li.addEventListener('click', () => {
    node.expanded = !node.expanded
    selectedTreeNodeName = node.name
    renderSidebar() // Re-render the sidebar to reflect changes
    renderContent(node)
  })

  const arrow = document.createElement('span')
  arrow.textContent = hasNoFolders(node) ? '' : '►' // Arrow right if it has child folders
  arrow.classList.add('arrow')
  if (node.expanded && !hasNoFolders(node)) {
    arrow.textContent = '▼' // Arrow down if expanded
  }
  container.appendChild(arrow)

  const icon = document.createElement('img')
  icon.src = '../assets/icons/folder.png'
  icon.classList.add('icon')
  container.appendChild(icon)

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

export const renderContent = node => {
  const content = document.getElementById('content')
  content.innerHTML = ''

  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const headings = ['Name', 'Modified', 'Size']
  const tr = document.createElement('tr')

  headings.forEach(heading => {
    const th = document.createElement('th')
    th.textContent = heading
    tr.appendChild(th)
  })
  thead.appendChild(tr)
  table.appendChild(thead)

  const tbody = document.createElement('tbody')
  if (node.children) {
    node.children.forEach(child => {
      const tr = document.createElement('tr')
      if (selectedContentNodeName === child.name) {
        tr.classList.add('selected')
      }
      tr.addEventListener('click', () => {
        if (child.type === 'folder') {
          child.expanded = true
          renderContent(child) // Re-render content when clicking on folder
          renderSidebar() // Re-render when clicking on folder
        } else {
          selectedContentNodeName = child.name
          renderContent(node)
        }
      })

      const nameContainer = document.createElement('div')
      nameContainer.classList.add('node-container')
      const nameTd = document.createElement('td')
      const icon = document.createElement('img')
      icon.src = `../assets/icons/${getIconType(child)}.png`
      icon.classList.add('icon')
      nameContainer.appendChild(icon)

      const text = document.createElement('span')
      text.textContent = child.name
      nameContainer.appendChild(text)

      nameTd.appendChild(nameContainer)
      tr.appendChild(nameTd)

      const modifiedTd = document.createElement('td')
      modifiedTd.textContent = new Date(child.modified).toLocaleString()
      tr.appendChild(modifiedTd)

      const sizeTd = document.createElement('td')
      sizeTd.textContent = child.type === 'file' ? getFileSize(child.size) : ''
      tr.appendChild(sizeTd)

      tbody.appendChild(tr)
    })
  }
  table.appendChild(tbody)
  content.appendChild(table)
}
