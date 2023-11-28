import type { NextApiRequest, NextApiResponse } from "next";
import { Produk } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  interface ProdukRequestBody {
    nama: string;
    deskripsi: string;
    harga: number;
    stok: number;
    foto: string;
    suplier_id: number;
  }

  const { nama, deskripsi, harga, stok, foto, suplier_id } =
    req.body as ProdukRequestBody;

  try {
    const produkBaru = await Produk.create({
      nama,
      deskripsi,
      harga,
      stok,
      foto,
      suplier_id,
    });
    res
      .status(200)
      .json({ message: "Produk berhasil ditambahkan", produk: produkBaru });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
}
