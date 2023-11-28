import type { NextApiRequest, NextApiResponse } from "next";
import { Suplier } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const suplier = await Suplier.findAll();
    res.status(200).json(suplier);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
}
