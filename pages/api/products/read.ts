import type { NextApiRequest, NextApiResponse } from "next";
import { Produk, Suplier } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id?: string };

  try {
    const options = {
      include: [{ model: Suplier, as: "suplier" }],
    };

    const data = id
      ? await Produk.findByPk(id, options)
      : await Produk.findAll(options);

    if (!data) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
}
