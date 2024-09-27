export const hasNoFolders = node => {
  if (!node.children) return true
  return node.children.every(child => child.type === 'file')
}

export const getFileSize = size => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export const getFileExtension = name => {
  const parts = name.split('.')
  return parts[parts.length - 1]
}

export const getIconType = node => {
  const extensions = ['png', 'pdf', 'png', 'rtf', 'txt']
  if (node.type === 'folder') return 'folder'
  const ext = getFileExtension(node.name)
  return extensions.includes(ext) ? ext : 'none'
}
