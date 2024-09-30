import { fileSystem } from '../../src/js/index.js'
import { renderContent, renderSidebar } from '../../src/js/ui.js'
import '@testing-library/jest-dom'
import { fireEvent, getByText } from '@testing-library/dom'

// Mock dependencies
jest.mock('../../src/js/index.js', () => ({
  fileSystem: [
    {
      type: 'folder',
      name: 'Files',
      modified: new Date(),
      size: 0,
      expanded: false,
      children: [
        { type: 'file', name: 'document.txt', modified: new Date(), size: 500 },
        {
          type: 'folder',
          name: 'images',
          modified: new Date(),
          expanded: false,
          size: 0,
          children: []
        }
      ]
    }
  ]
}))

jest.mock('../../src/js/utils.js', () => ({
  ...jest.requireActual('../../src/js/utils.js'),
  getFileSize: jest.fn(size => `${size} B`),
  getIconType: jest.fn(node => (node.type === 'folder' ? 'folder' : 'file')),
  hasNoFolders: jest.fn(
    node =>
      !node.children || node.children.every(child => child.type === 'file')
  )
}))

describe('UI rendering functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="sidebar"></div>
      <div id="content"></div>
    `
  })

  test('renders sidebar with file system tree structure', () => {
    renderSidebar()

    const sidebar = document.getElementById('sidebar')
    expect(sidebar).toBeInTheDocument()
    expect(sidebar.querySelectorAll('li.tree-node').length).toBe(1) // Only one root folder

    const folderNode = getByText(sidebar, 'Files')
    expect(folderNode).toBeInTheDocument()
  })

  test('expands and collapses folders in the sidebar', () => {
    renderSidebar()

    const folderNode = getByText(document.body, 'Files')
    fireEvent.click(folderNode.closest('li')) // Simulate click to expand

    expect(fileSystem[0].expanded).toBe(true) // Check if folder is expanded

    renderSidebar() // Re-render sidebar
    const subFilesNode = getByText(document.body, 'document.txt')
    expect(subFilesNode).toBeInTheDocument() // Check if child is visible

    // Collapse folder and check
    fireEvent.click(folderNode.closest('li'))
    expect(fileSystem[0].expanded).toBe(false) // Check if folder is collapsed

    renderSidebar() // Re-render sidebar
    expect(subFilesNode).not.toBeInTheDocument() // Check if child is hidden
  })

  test('renders content for selected folder', () => {
    renderContent(fileSystem[0])

    const content = document.getElementById('content')
    expect(content).toBeInTheDocument()
    expect(content.querySelectorAll('table tbody tr').length).toBe(2) // Two children in the folder

    const fileNode = getByText(content, 'document.txt')
    expect(fileNode).toBeInTheDocument()
  })
})
