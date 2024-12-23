export const waitAsync = async (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(milliseconds), milliseconds)
  })
}
