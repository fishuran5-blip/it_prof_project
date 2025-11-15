import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    color: "",
    size: "",
    category: "latest",
    imgUrl: "",
    imgFile: null,
    quantity: 0,
    sold: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || newProduct.quantity <= 0) {
      alert("⚠️ Please complete all required fields including quantity.");
      return;
    }

    const addProductToList = (imgSrc) => {
      const newItem = {
        id: Date.now(),
        ...newProduct,
        img: imgSrc || newProduct.imgUrl || "/images/default.jpg",
      };
      setProducts((prev) => [...prev, newItem]);
      setNewProduct({
        name: "",
        price: "",
        color: "",
        size: "",
        category: "latest",
        imgUrl: "",
        imgFile: null,
        quantity: 0,
        sold: 0,
      });
    };

    if (newProduct.imgFile) {
      const reader = new FileReader();
      reader.onload = (e) => addProductToList(e.target.result);
      reader.readAsDataURL(newProduct.imgFile);
    } else {
      addProductToList();
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleLogout = () => navigate("/logincustomer_admin");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 p-6">
        {/* Add Product */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border rounded-md p-2"
            />

            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border rounded-md p-2"
            />

            <input
              type="number"
              placeholder="Available Quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: Number(e.target.value) })
              }
              className="border rounded-md p-2"
            />

            <select
              value={newProduct.color}
              onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
              className="border rounded-md p-2"
            >
              <option value="">Select Color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="brown">Brown</option>
            </select>

            <select
              value={newProduct.size}
              onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
              className="border rounded-md p-2"
            >
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="all">All (Custom Fit)</option>
            </select>

            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border rounded-md p-2"
            >
              <option value="latest">Latest</option>
              <option value="fashion">Fashion</option>
              <option value="sports">Sports</option>
              <option value="casual">Casual</option>
            </select>

            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newProduct.imgUrl}
              onChange={(e) => setNewProduct({ ...newProduct, imgUrl: e.target.value })}
              className="border rounded-md p-2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, imgFile: e.target.files[0] })
              }
              className="border rounded-md p-2"
            />

            <button
              onClick={handleAddProduct}
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Product List</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="border rounded-xl overflow-hidden shadow-sm bg-gray-50"
                >
                  <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {p.color} | {p.size}
                    </p>
                    <p className="font-semibold">${p.price}</p>
                    <p className="text-xs">Available: {p.quantity}</p>
                    <p className="text-xs">Sold: {p.sold}</p>
                    <p className="text-xs italic capitalize">
                      Category: {p.category}
                    </p>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
