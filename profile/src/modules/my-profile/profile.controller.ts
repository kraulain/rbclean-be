import type { Response, Request } from "express";

export const myProfile = async (_: Request, res: Response) => {
  return res.status(200).json({ message: "profile" });
};
