export const hasNoFolders = node => {
  if (!node.children) return true
  return node.children.every(child => child.type === 'file')
}

export const getFileSize = size => {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}
