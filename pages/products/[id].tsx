import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "./product_form";

export default function UpdateProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchProductData() {
      if (id) {
        const res = await fetch(
          `http://localhost:3000/api/products/read?id=${id}`
        );
        const data = await res.json();
        setInitialData(data);
      }
    }

    fetchProductData();
  }, [id]);

  async function handleSubmit(formData: any) {
    const response = await fetch(
      `http://localhost:3000/api/products/update?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      router.push("/");
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  }

  return (
    <div>
      <h1>Edit Produk</h1>
      {initialData ? (
        <ProductForm initialData={initialData} onSubmit={handleSubmit} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
