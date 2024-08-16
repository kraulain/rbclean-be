export const myProfile = async (_, res) => {
  return res.status(200).json({ message: "profile" })
}