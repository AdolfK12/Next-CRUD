import type { NextApiRequest, NextApiResponse } from "next";
import { Produk } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { id } = req.query as { id: string };
  const updateData = req.body as Partial<Produk>;

  try {
    const produk = await Produk.findByPk(id);
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    await produk.update(updateData);
    res.status(200).json({ message: "Produk berhasil diperbarui", produk });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
}
