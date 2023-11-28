import type { NextApiRequest, NextApiResponse } from "next";
import { Produk } from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query;
  const updateData = req.body;

  try {
    const produk = await Produk.findByPk(id as string);
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    if (updateData.foto && !updateData.foto.startsWith("/public/")) {
      updateData.foto = `/public/uploads/products/${updateData.foto}`;
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
