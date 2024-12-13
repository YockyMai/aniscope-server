import fs from 'fs/promises'

export const isDirExists = async (path: string) => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}
