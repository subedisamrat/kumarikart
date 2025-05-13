//Normal search for searching the products available!! ✅

// import { Product } from "../../models/Product.js";

// const searchProducts = async (req, res) => {
//   try {
//     const { keyword } = req.params;

//     if (!keyword || typeof keyword !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid search keyword and must be in string",
//       });
//     }

//     const regEx = new RegExp(keyword, "i");

//     const createSearchQuery = {
//       $or: [
//         { title: regEx },
//         { description: regEx },
//         { category: regEx },
//         { brand: regEx },
//       ],
//     };

//     const searchResults = await Product.find(createSearchQuery);

//     res.status(200).json({
//       success: true,
//       data: searchResults,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export default searchProducts;

//---------------------------------------------------------------------------------------------------------------------------------

//AI Implemenation for Searching the products ✅

// import dotenv from "dotenv";
// dotenv.config();
// import { Product } from "../../models/Product.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Utility: Detect natural language queries
// const isNaturalLanguageQuery = (q) => {
//   const wordCount = q.trim().split(/\s+/).length;
//   const hasNumbers = /\d/.test(q);
//   const hasComparative =
//     /(above|below|under|over|between|cheap|expensive|best|suggest|around|more than|less than)/i.test(
//       q,
//     );
//   return wordCount > 3 || hasNumbers || hasComparative;
// };

// // Use Gemini to filter products
// const generateFilteredProductsPrompt = async (query, products) => {
//   const prompt = `You are a smart product search assistant for an eCommerce site.
// User search query: "${query}"
// Available products:
// ${JSON.stringify(products, null, 2)}
// Your job: Filter and return only the best matching products (based on title, category, tags, price, etc.)
// IMPORTANT: Respond ONLY with a JSON array of matching products. No explanations, no markdown, just plain JSON.
// `;

//   const result = await model.generateContent(prompt);
//   const text = result.response.text();
//   const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

//   try {
//     return JSON.parse(cleanedText);
//   } catch (err) {
//     console.error("Failed to parse Gemini response:", err.message);
//     return [];
//   }
// };

// const searchProducts = async (req, res) => {
//   try {
//     const keyword = req.query.q;
//     // const { keyword } = req.params;

//     if (!keyword || typeof keyword !== "string") {
//       return res.status(400).json({
//         success: false,
//         //message: "Invalid or missing query string (use ?q=your-query)",
//       });
//     }

//     const trimmedKeyword = keyword.trim();
//     const useAI = isNaturalLanguageQuery(trimmedKeyword);

//     if (useAI) {
//       // Fetch all products for AI to analyze
//       const allProducts = await Product.find();
//       const aiResults = await generateFilteredProductsPrompt(
//         trimmedKeyword,
//         allProducts,
//       );

//       return res.status(200).json({
//         success: true,
//         message: "AI search results",
//         data: aiResults,
//       });
//     } else {
//       // Fallback to normal keyword search
//       const regEx = new RegExp(trimmedKeyword, "i");

//       const createSearchQuery = {
//         $or: [
//           { title: regEx },
//           { description: regEx },
//           { category: regEx },
//           { brand: regEx },
//         ],
//       };

//       const searchResults = await Product.find(createSearchQuery);

//       return res.status(200).json({
//         success: true,
//         message: "Traditional search results",
//         data: searchResults,
//       });
//     }
//   } catch (error) {
//     console.error("Search error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// export default searchProducts;

import dotenv from "dotenv";
dotenv.config();

import { Product } from "../../models/Product.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- Utility: Check if query is a natural language query ---
const isNaturalLanguageQuery = (q) => {
  const wordCount = q.trim().split(/\s+/).length;
  const hasNumbers = /\d/.test(q);
  const hasComparative =
    /(above|below|under|over|between|cheap|expensive|best|suggest|around|more than|less than)/i.test(
      q,
    );
  return wordCount > 3 || hasNumbers || hasComparative;
};

// --- Utility: Create Gemini prompt ---
const generateFilteredProductsPrompt = async (query, products) => {
  const prompt = `You are an intelligent product search assistant for an eCommerce platform.

User search query: "${query}"

Available products:
${JSON.stringify(products, null, 2)}

Your task:
- ONLY return the best matching products from the list.
- Do not invent or hallucinate products.
- Output format: strict JSON array of product objects (must include _id).
- No markdown, no explanations.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```(?:json)?\n?|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini JSON parse error:", err.message);
    return [];
  }
};

const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword || typeof keyword !== "string" || keyword.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Invalid search query. Minimum 2 characters required.",
      });
    }

    const trimmedKeyword = keyword.trim();
    const useAI = isNaturalLanguageQuery(trimmedKeyword);

    if (useAI) {
      // Step 1: Fetch minimal product fields
      const rawProducts = await Product.find(
        {},
        "_id title description price category brand",
      );
      const aiResults = await generateFilteredProductsPrompt(
        trimmedKeyword,
        rawProducts,
      );

      // Step 2: Validate AI response
      const validIdSet = new Set(rawProducts.map((p) => p._id.toString()));
      const filteredIds = aiResults
        .filter((item) => item._id && validIdSet.has(item._id.toString()))
        .map((item) => item._id.toString());

      if (filteredIds.length === 0) {
        console.warn("AI returned no valid products, falling back...");
        return await fallbackSearch(trimmedKeyword, res);
      }

      // Step 3: Refetch full product data by ID
      const finalProducts = await Product.find({ _id: { $in: filteredIds } });

      return res.status(200).json({
        success: true,
        message: "AI-based search results",
        data: finalProducts,
      });
    }

    // --- Traditional Fallback Search ---
    return await fallbackSearch(trimmedKeyword, res);
  } catch (error) {
    console.error("Search error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// --- Fallback search logic ---
const fallbackSearch = async (keyword, res) => {
  const regEx = new RegExp(keyword, "i");

  const results = await Product.find({
    $or: [
      { title: regEx },
      { description: regEx },
      { category: regEx },
      { brand: regEx },
    ],
  });

  return res.status(200).json({
    success: true,
    message: "Traditional keyword search results",
    data: results,
  });
};

export default searchProducts;
