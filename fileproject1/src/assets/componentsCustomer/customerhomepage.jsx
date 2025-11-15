import React, { useState, useEffect } from "react";

const CustomerHomepage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({ colors: [], sizes: [], categories: [] });
  const [slideIndex, setSlideIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: "", address: "", profilePic: "" });

  const slides = ["/images/ua1.jpg", "/images/ua2.jpg", "/images/ua3.jpg"];

  // ✅ Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setAllProducts(saved);
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (savedUser) setUser(savedUser);
  }, []);

  // ✅ Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // ✅ Toggle filters
  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  // ✅ Filter logic
  const filteredProducts = allProducts.filter((item) => {
    return (
      (filters.colors.length === 0 || filters.colors.includes(item.color)) &&
      (filters.sizes.length === 0 || filters.sizes.includes(item.size)) &&
      (filters.categories.length === 0 || filters.categories.includes(item.category))
    );
  });

  // ✅ Group products by category
  const categories = ["latest", "fashion", "casual", "sports"];
  const groupedProducts = categories.map((cat) => ({
    name: cat,
    products: filteredProducts.filter((item) => item.category === cat),
  }));

  // ✅ Add to cart
  const handleAddToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((p) => p.id === item.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...item, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`🛒 Added ${item.name} to cart!`);
  };

  // ✅ Buy Now
  const handleBuyNow = (item) => {
    const updated = allProducts.map((p) => {
      if (p.id === item.id) {
        if (p.quantity <= 0) {
          alert("❌ Out of stock!");
          return p;
        }
        return { ...p, quantity: p.quantity - 1, sold: (p.sold || 0) + 1 };
      }
      return p;
    });
    localStorage.setItem("products", JSON.stringify(updated));
    setAllProducts(updated);
    alert(`✅ You bought 1 ${item.name}!`);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    window.location.href = "/logincustomer_admin";
  };

  // ✅ Profile handlers
  const handleProfileSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    alert("✅ Profile updated!");
    setShowProfile(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUser({ ...user, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 🧭 Navbar */}
      <header className="bg-gradient-to-r from-black to-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">🧢 CapStore</h1>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <button onClick={() => window.location.reload()} className="hover:text-yellow-400 transition">Home</button>
          <button onClick={() => (window.location.href = "/cart")} className="hover:text-yellow-400 transition">🛒 Add to Cart</button>
          <button onClick={handleLogout} className="hover:text-red-400 transition">Logout</button>
          <img
            src={user.profilePic || "/images/default-profile.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer hover:scale-110 transition"
            onClick={() => setShowProfile(true)}
          />
        </nav>
      </header>

      {/* 🎞️ Slideshow */}
      <div className="relative w-full h-80 md:h-[450px] overflow-hidden">
        {slides.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              idx === slideIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white z-30">
          <h2 className="text-4xl font-extrabold mb-2">Find Your Style Cap</h2>
          <p className="text-lg text-gray-200">Under Armour Collection</p>
        </div>
      </div>

      {/* 🧢 Main Section */}
      <div className="flex flex-col lg:flex-row gap-8 p-6">
        {/* Filters */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-semibold mb-3">Filters</h3>
          <div className="mb-4">
            <p className="font-medium mb-1">Color</p>
            {["black", "white", "red", "green", "brown"].map((color) => (
              <label key={color} className="flex items-center gap-2 text-sm mb-1">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => toggleFilter("colors", color)}
                  className="accent-black"
                />
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <p className="font-medium mb-1">Size</p>
            {["small", "medium", "large"].map((size) => (
              <label key={size} className="flex items-center gap-2 text-sm mb-1">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleFilter("sizes", size)}
                  className="accent-black"
                />
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </label>
            ))}
          </div>

          <div>
            <p className="font-medium mb-1">Category</p>
            {["latest", "fashion", "casual", "sports"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm mb-1">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleFilter("categories", cat)}
                  className="accent-black"
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)} Caps
              </label>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
          {groupedProducts.map(
            (group) =>
              group.products.length > 0 && (
                <div key={group.name} className="mb-10">
                  <h2 className="text-2xl font-bold mb-4 border-b-4 border-yellow-400 inline-block pb-1 capitalize">
                    {group.name} Caps
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.products.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-xl shadow-sm bg-gray-50 hover:shadow-lg transition relative overflow-hidden"
                      >
                        {item.quantity <= 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white font-bold text-lg">
                            SOLD OUT
                          </div>
                        )}
                        <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">
                            {item.color} | {item.size}
                          </p>
                          <p className="font-semibold text-gray-800">${item.price}</p>
                          <p className="text-sm text-gray-500">
                            Available: {item.quantity} | Sold: {item.sold || 0}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button
                              disabled={item.quantity <= 0}
                              onClick={() => handleAddToCart(item)}
                              className={`px-3 py-1 rounded-md text-sm w-1/2 ${
                                item.quantity <= 0
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-black text-white hover:bg-gray-800"
                              }`}
                            >
                              Add to Cart
                            </button>
                            <button
                              disabled={item.quantity <= 0}
                              onClick={() => handleBuyNow(item)}
                              className={`px-3 py-1 rounded-md text-sm w-1/2 ${
                                item.quantity <= 0
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-green-600 text-white hover:bg-green-700"
                              }`}
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* 👤 Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-center text-xl font-bold mb-4 text-gray-800">
              My Profile
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 border-2 border-dashed border-gray-400 rounded-full overflow-hidden mb-3">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-400 text-xs flex items-center justify-center h-full text-center">
                    Upload Photo
                  </p>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-3 text-sm border border-gray-300 p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Full Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="border rounded-md p-2 w-full mb-2"
              />
              <textarea
                placeholder="Address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                rows="3"
                className="border rounded-md p-2 w-full mb-4"
              />
              <button
                onClick={handleProfileSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHomepage;
