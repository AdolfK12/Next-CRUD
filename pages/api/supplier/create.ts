import type { NextApiRequest, NextApiResponse } from "next";
import { Suplier } from "../../../db";

type RequestBody = {
  nama_suplier: string;
  alamat: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { nama_suplier, alamat, email }: RequestBody = req.body;

  try {
    const supplierBaru = await Suplier.create({ nama_suplier, alamat, email });
    res
      .status(200)
      .json({
        message: "Supplier berhasil ditambahkan",
        supplier: supplierBaru,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
}
