// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// const TopRatedProducts = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [topRated, setTopRated] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/shop/products/sort`,
//         );
//         const products = res.data.data;
//         setAllProducts(products);

//         // Extract unique categories
//         const uniqueCategories = [
//           "All",
//           ...new Set(products.map((p) => p.category)),
//         ];
//         setCategories(uniqueCategories);

//         // Sort and filter
//         const sortedProducts = [...products].sort(
//           (a, b) => b.wilsonScore - a.wilsonScore,
//         );
//         const top = sortedProducts
//           .filter((p) => p.totalReviews > 0)
//           .slice(0, 6);
//         setTopRated(top);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Re-filter on category change
//   useEffect(() => {
//     const filtered = allProducts
//       .filter((p) => p.totalReviews > 0)
//       .filter(
//         (p) => selectedCategory === "All" || p.category === selectedCategory,
//       )
//       .sort((a, b) => b.wilsonScore - a.wilsonScore)
//       .slice(0, 6);

//     setTopRated(filtered);
//   }, [selectedCategory, allProducts]);

//   const renderStars = (score) => {
//     const rating = score * 5;
//     const fullStars = Math.floor(rating);
//     const halfStar = rating - fullStars >= 0.5;
//     const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//     return (
//       <div className="flex items-center text-yellow-500">
//         {[...Array(fullStars)].map((_, i) => (
//           <FaStar key={`full-${i}`} />
//         ))}
//         {halfStar && <FaStarHalfAlt key="half" />}
//         {[...Array(emptyStars)].map((_, i) => (
//           <FaRegStar key={`empty-${i}`} />
//         ))}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="p-4 text-center text-gray-600">
//         Loading top-rated products...
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">⭐ Top Rated Products</h2>

//       {/* Category Filter */}
//       <div className="mb-4">
//         <label className="font-medium mr-2">Filter by Category:</label>
//         <select
//           className="border border-gray-300 rounded px-3 py-1"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Products */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {topRated.map((product) => (
//           <div
//             key={product._id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-48 object-cover rounded mb-2"
//             />
//             <h3 className="text-lg font-medium">{product.title}</h3>
//             <p className="text-gray-500 text-sm">{product.brand}</p>
//             <p className="text-gray-700">{product.description}</p>
//             <div className="mt-2">
//               <span className="text-green-600 font-bold">
//                 Rs. {product.salePrice}
//               </span>{" "}
//               <span className="line-through text-gray-500 text-sm">
//                 Rs. {product.price}
//               </span>
//             </div>
//             <div className="mt-2 text-sm">
//               {renderStars(product.wilsonScore)}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRatedProducts;

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProductDetailsDialog from "../../components/shopping-view/product-details";

const TopRatedProducts = () => {
  const dispatch = useDispatch(); // in case you want to use review fetching later
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/shop/products/sort`,
        );
        const products = res.data.data;

        setAllProducts(products);

        const uniqueCategories = [
          "All",
          ...new Set(products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);

        const filtered = products
          .filter((p) => p.totalReviews > 0)
          .sort((a, b) => b.wilsonScore - a.wilsonScore)
          .slice(0, 6);
        setTopRated(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter topRated on category change
  useEffect(() => {
    if (allProducts.length === 0) return;

    const filtered = allProducts
      .filter((p) => p.totalReviews > 0)
      .filter(
        (p) => selectedCategory === "All" || p.category === selectedCategory,
      )
      .sort((a, b) => b.wilsonScore - a.wilsonScore)
      .slice(0, 6);
    setTopRated(filtered);
  }, [selectedCategory, allProducts]);

  // Star rendering based on wilsonScore (0-1 scale)
  const renderStars = useCallback((wilsonScore) => {
    const rating = wilsonScore * 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div
        className="flex items-center text-yellow-500"
        aria-label={`Rating: ${rating.toFixed(1)} out of 5`}
      >
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-sm" />
        ))}
        {halfStar && <FaStarHalfAlt key="half" className="text-sm" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-sm" />
        ))}
        <span className="ml-1 text-xs text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Loading top-rated products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        {error}
        <br />
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (topRated.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        No top-rated products found.
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">
            ⭐ Top Rated Products
          </h2>
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 text-base border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter products by category"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRated.map((product) => (
            <div
              key={product._id}
              className="group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {product.price > product.salePrice && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(
                      ((product.price - product.salePrice) / product.price) *
                        100,
                    )}
                    % OFF
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className="text-lg font-semibold text-gray-800 line-clamp-1"
                    title={product.title}
                  >
                    {product.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded whitespace-nowrap">
                    {product.category}
                  </span>
                </div>

                <p
                  className="text-gray-500 text-sm mb-2 truncate"
                  title={product.brand}
                >
                  {product.brand}
                </p>

                <p
                  className="text-gray-600 text-sm mb-3 line-clamp-2"
                  title={product.description}
                >
                  {product.description}
                </p>

                {/* <div className="mb-1">{renderStars(product.wilsonScore)}</div>
                <p className="text-xs text-gray-500">
                  {product.totalReviews} review
                  {product.totalReviews !== 1 ? "s" : ""}
                </p> */}

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {product.salePrice.toLocaleString()}
                    </span>
                    {product.price > product.salePrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleViewDetails(product)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label={`View details for ${product.title}`}
                  >
                    View Details <IoIosArrowForward className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductDetailsDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        productDetails={selectedProduct}
      />
    </>
  );
};

export default TopRatedProducts;
