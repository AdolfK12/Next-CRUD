import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
  foto: string;
  suplier?: {
    nama_suplier: string;
  };
}

export default function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products/read");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Could not fetch the data", error);
      }
    }

    fetchProducts();
  }, []);

  async function deleteProduct(id: number) {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const response = await fetch(`/api/products/delete?id=${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        alert(data.message);
        fetchProducts();
      } catch (error) {
        console.error("Could not delete the product", error);
      }
    }
  }

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Daftar Produk</h1>
      <button
        onClick={() => router.push("/products/create")}
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add New Product
      </button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Nama</th>
            <th style={thTdStyle}>Deskripsi</th>
            <th style={thTdStyle}>Harga</th>
            <th style={thTdStyle}>Stok</th>
            <th style={thTdStyle}>Foto</th>
            <th style={thTdStyle}>Supplier</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={thTdStyle}>{product.id}</td>
              <td style={thTdStyle}>{product.nama}</td>
              <td style={thTdStyle}>{product.deskripsi}</td>
              <td style={thTdStyle}>{product.harga}</td>
              <td style={thTdStyle}>{product.stok}</td>
              <td style={thTdStyle}>
                <img
                  src={product.foto}
                  alt={product.nama}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td style={thTdStyle}>
                {product.suplier && product.suplier.nama_suplier}
              </td>
              <td style={thTdStyle}>
                <button
                  onClick={() => router.push(`/products/${product.id}`)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "orange",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
