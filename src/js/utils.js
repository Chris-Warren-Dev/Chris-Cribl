export const hasNoFolders = node => {
  if (!node.children) return true
  return node.children.every(child => child.type === 'file')
}
