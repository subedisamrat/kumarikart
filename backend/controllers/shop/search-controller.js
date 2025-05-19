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

const searchProducts = async (req, res) => {
  try {
    // const { keyword } = req.params;
    const keyword = req.query.q;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing keyword.",
        data: [],
      });
    }

    const query = keyword.trim();

    // 1. First: Strict MongoDB search
    const regex = new RegExp(query, "i");
    const exactResults = await Product.find({
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
      ],
    });

    // If exact matches found, return them immediately
    if (exactResults.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Direct product matches found.",
        data: exactResults,
      });
    }

    // 2. Fallback: Ask Gemini to suggest alternative search keywords (not products!)
    const productTitles = await Product.find({}, { title: 1, _id: 0 }).limit(
      100,
    );
    const allTitles = productTitles.map((p) => p.title).join(", ");

    const prompt = `
You are a smart product search assistant for an eCommerce site. 

User searched for: "${query}"
But no products were found.

Here are available product names in the store:
${allTitles}

Follow these basic below mentioned rules:

-You should also understand what products are of what uses and what products are of nice brands, qualities , features etc which makes customer also easy to filter the products.
-Suggest a similar or alternative product name if possible.
-If nothing relevant exists, just say: "Not found".
-Only return a single suggestion string or say "Not found".
-Use current running fashion sense in the present world with nice trending features which should give the result based on the customers preferance. 
-Shouldn't give unrelated products like customer is talking about one product and you suggesting another different product it shouldn't happen.
`;

    const response = await model.generateContent(prompt);
    const suggestion = response.response.text().trim().replace(/"/g, "");

    if (suggestion.toLowerCase().includes("not found")) {
      return res.status(404).json({
        success: false,
        message: "No matching products found.",
        data: [],
      });
    }

    // 3. Search again using Gemini's suggestion

    function escapeRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    const safeSuggestion = escapeRegex(suggestion);
    const suggestionRegex = new RegExp(safeSuggestion, "i");
    const aiResults = await Product.find({
      $or: [
        { title: suggestionRegex },
        { description: suggestionRegex },
        { category: suggestionRegex },
        { brand: suggestionRegex },
      ],
    });

    // const suggestionRegex = new RegExp(suggestion, "i");
    // const aiResults = await Product.find({
    //   $or: [
    //     { title: suggestionRegex },
    //     { description: suggestionRegex },
    //     { category: suggestionRegex },
    //     { brand: suggestionRegex },
    //   ],
    // });

    if (aiResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found for "${query}" or similar.`,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: `No exact match, but similar results for "${suggestion}".`,
      data: aiResults,
    });
  } catch (err) {
    console.error("Search Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Search failed due to server error.",
      error: err.message,
    });
  }
};

export default searchProducts;
