import { useRouter } from "next/router";
import ProductForm from "./product_form";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const response = await fetch("http://localhost:3000/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/");
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div>
      <h1>Tambah Produk Baru</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
