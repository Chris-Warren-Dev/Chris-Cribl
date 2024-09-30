import {
  hasNoFolders,
  getFileSize,
  getFileExtension,
  getIconType
} from '../../src/js/utils.js'

describe('hasNoFolders', () => {
  it('should return true if node has no children', () => {
    const node = { type: 'file', name: 'file.txt' }
    expect(hasNoFolders(node)).toBe(true)
  })

  it('should return true if all children are files', () => {
    const node = {
      children: [
        { type: 'file', name: 'file1.txt' },
        { type: 'file', name: 'file2.txt' }
      ]
    }
    expect(hasNoFolders(node)).toBe(true)
  })

  it('should return false if any child is a folder', () => {
    const node = {
      children: [
        { type: 'file', name: 'file1.txt' },
        { type: 'folder', name: 'folder1' }
      ]
    }
    expect(hasNoFolders(node)).toBe(false)
  })
})

describe('getFileSize', () => {
  it('should return size in bytes for sizes less than 1024 B', () => {
    expect(getFileSize(500)).toBe('500 B')
  })

  it('should return size in KB for sizes between 1024 B and 1 MB', () => {
    expect(getFileSize(1024)).toBe('1.0 KB')
    expect(getFileSize(2048)).toBe('2.0 KB')
  })

  it('should return size in MB for sizes 1 MB and above', () => {
    expect(getFileSize(1024 * 1024)).toBe('1.0 MB')
    expect(getFileSize(5 * 1024 * 1024)).toBe('5.0 MB')
  })
})

describe('getFileExtension', () => {
  it('should return the file extension from the name', () => {
    expect(getFileExtension('file.txt')).toBe('txt')
    expect(getFileExtension('archive.tar.gz')).toBe('gz')
    expect(getFileExtension('no-extension')).toBe('no-extension')
  })
})

describe('getIconType', () => {
  it('should return "folder" if node type is folder', () => {
    const node = { type: 'folder', name: 'Documents' }
    expect(getIconType(node)).toBe('folder')
  })

  it('should return file extension if it is in the list', () => {
    const node = { type: 'file', name: 'document.pdf' }
    expect(getIconType(node)).toBe('pdf')
  })

  it('should return "none" for unsupported file extensions', () => {
    const node = { type: 'file', name: 'unsupported.xyz' }
    expect(getIconType(node)).toBe('none')
  })
})
