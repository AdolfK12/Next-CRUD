import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Supplier = {
  id_suplier: number;
  nama_suplier: string;
};

type ProductFormProps = {
  initialData?: any;
  onSubmit: (data: any) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: 0,
    stok: 0,
    foto: "",
    suplier_id: "",
    ...initialData,
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/supplier/read");
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const suppliersData: Supplier[] = await response.json();
        setSuppliers(suppliersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();

    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     let file = e.target.files[0];

  //     // Memastikan file tidak lebih besar dari 2MB
  //     if (file.size > 2097152) {
  //       alert("File is too big!");
  //       return;
  //     }

  //     setFormData((prevState) => ({ ...prevState, foto: file }));
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div>
          <label htmlFor="nama">Nama Produk:</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "4px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label htmlFor="deskripsi">Deskripsi:</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              height: "100px",
              padding: "8px",
              margin: "4px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label htmlFor="harga">Harga:</label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "4px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label htmlFor="stok">Stok:</label>
          <input
            type="number"
            id="stok"
            name="stok"
            value={formData.stok}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "4px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label htmlFor="foto">Foto URL:</label>
          <input
            type="text"
            id="foto"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "4px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {/* <div>
        <label htmlFor="foto">Foto Produk:</label>
        <input
          type="file"
          id="foto"
          name="foto"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
          required
        />
      </div> */}
        <div>
          <label htmlFor="suplier_id">Supplier:</label>
          <select
            id="suplier_id"
            name="suplier_id"
            value={formData.suplier_id}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "4px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Pilih Supplier --</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id_suplier} value={supplier.id_suplier}>
                {supplier.nama_suplier}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleBack}
          style={{
            padding: "10px",
            backgroundColor: "grey",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
