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

//-----------------------------------------------------------------------------------------------------------------------

//AI Search with reference with GROK ✅

// import { Product } from "../../models/Product.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// // Initialize Gemini API with error handling
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const searchProducts = async (req, res) => {
//   try {
//     const keyword = req.query.q?.trim();
//     if (!keyword) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a search term",
//       });
//     }

//     // Direct MongoDB search for exact matches
//     const directResults = await Product.find({
//       $or: [
//         { title: { $regex: escapeRegex(keyword), $options: "i" } },
//         { description: { $regex: escapeRegex(keyword), $options: "i" } },
//         { category: { $regex: escapeRegex(keyword), $options: "i" } },
//         { brand: { $regex: escapeRegex(keyword), $options: "i" } },
//       ],
//       totalStock: { $gt: 0 },
//     })
//       .limit(20)
//       .lean();

//     // Return direct results if sufficient
//     if (directResults.length >= 3) {
//       return res.status(200).json({
//         success: true,
//         message: "Products found",
//         data: directResults,
//         searchType: "direct",
//       });
//     }

//     // AI-powered search for advanced queries
//     return await handleAdvancedSearch(keyword, res);
//   } catch (err) {
//     console.error("Search Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Search failed. Please try again.",
//       error: err.message,
//     });
//   }
// };

// async function handleAdvancedSearch(query, res) {
//   // Validate API key
//   if (!process.env.GEMINI_API_KEY) {
//     console.error("GEMINI_API_KEY is not set in environment variables");
//     // Fallback to direct search
//     const results = await Product.find({
//       $or: [
//         { title: { $regex: escapeRegex(query), $options: "i" } },
//         { description: { $regex: escapeRegex(query), $options: "i" } },
//       ],
//       totalStock: { $gt: 0 },
//     })
//       .limit(20)
//       .lean();

//     return res.status(200).json({
//       success: true,
//       message: results.length ? "Some products found" : "No results",
//       data: results,
//       searchType: "direct",
//     });
//   }

//   // Fetch in-stock products for AI context
//   const sampleProducts = await Product.find({ totalStock: { $gt: 0 } })
//     .limit(200)
//     .select(
//       "_id title description category brand price gender rating totalStock",
//     )
//     .lean();

//   // Prompt with related product suggestions
//   const prompt = `
// You are an AI-powered product search assistant for a Nepali e-commerce platform. Interpret user queries in natural language (e.g., "classic shoes above NPR 5000") or structured language (e.g., "category:shoes, style:classic, price:>5000") and return matching products from the provided inventory. If no exact matches are found, suggest related products (e.g., for "classic shoes", suggest shoe laces, socks, sandals, or other footwear). Follow these guidelines:

// 1. **Query Types**:
//    - Natural: "classic shoes above NPR 5000", "trendy women’s dresses under NPR 3000".
//    - Structured: "category:smartphones, brand:Samsung, price:<50000", "color:blue, sort:price-low-to-high".

// 2. **Product Matching**:
//    - Extract: category, brand, price range, color, size, gender, style, features, sort.
//    - Ambiguous queries (e.g., "cheap phones"): assume price < NPR 20000, note in assumptions.
//    - Partial matches: "classic shoes" matches "vintage leather shoes".
//    - Synonyms: "classic" = "vintage", "traditional"; "inexpensive" = "affordable".
//    - Prioritize in-stock products (totalStock > 0).

// 3. **Related Products**:
//    - If no exact matches, suggest related items based on category or use case:
//      - For "shoes": suggest shoe laces, socks, insoles, sandals, sneakers.
//      - For "dresses": suggest scarves, jewelry, handbags.
//      - For "electronics": suggest accessories (e.g., chargers, cases).
//    - Include a message indicating related products are shown.

// 4. **Output Format**:
//    - JSON:
//      {
//        "query": "original query",
//        "products": [
//          {
//            "_id": "product ID",
//            "title": "product title",
//            "category": "category",
//            "brand": "brand name",
//            "price": number,
//            "gender": "gender or null",
//            "rating": number or null,
//            "totalStock": number
//          }
//        ],
//        "total_results": number,
//        "message": "optional message, e.g., 'No exact matches, showing related products'"
//      }
//    - Use exact IDs from inventory.
//    - Limit to 12 products.
//    - Empty results: return empty array with message.

// 5. **Context**:
//    - Currency: NPR.
//    - Categories: shoes, clothing, electronics, accessories, etc.
//    - Nepali trends: "classic" = formal, traditional styles; "trendy" = modern, vibrant.
//    - Sort: price-low-to-high, price-high-to-low, relevance, newest.

// 6. **Inventory**:
// [
// ${sampleProducts
//   .map(
//     (p) => `
//   {
//     "_id": "${p._id}",
//     "title": "${p.title || "No title"}",
//     "price": ${p.price || 0},
//     "category": "${p.category || "Uncategorized"}",
//     "brand": "${p.brand || "Generic"}",
//     "description": "${p.description || "No description"}",
//     "gender": "${p.gender || "unisex"}",
//     "rating": ${p.rating || null},
//     "totalStock": ${p.totalStock || 0}
//   }`,
//   )
//   .join(",\n")}
// ]

// 7. **Examples**:
//    - Query: "classic shoes above NPR 5000"
//      - If matches: return classic shoes > NPR 5000.
//      - If no matches: suggest shoe laces, socks, or other footwear with message.
//    - Query: "category:laptops, brand:Apple, price:<100000"
//      - Return Apple laptops < NPR 100000.

// Process query: "${query}"
// `;

//   try {
//     const response = await model.generateContent(prompt);
//     const responseText = cleanJsonResponse(response.response.text());
//     const aiResponse = JSON.parse(responseText);

//     // Fetch full product details
//     const aiResults = await Product.find({
//       _id: { $in: aiResponse.products.map((p) => p._id) },
//       totalStock: { $gt: 0 },
//     })
//       .limit(12)
//       .lean();

//     // Combine with direct results
//     const directResults = await Product.find({
//       $or: [
//         { title: { $regex: escapeRegex(query), $options: "i" } },
//         { description: { $regex: escapeRegex(query), $options: "i" } },
//       ],
//       totalStock: { $gt: 0 },
//     })
//       .limit(5)
//       .lean();

//     // Remove duplicates
//     const allResults = [...directResults, ...aiResults];
//     const uniqueResults = allResults.filter(
//       (p, i, self) =>
//         i === self.findIndex((sp) => sp._id.toString() === p._id.toString()),
//     );

//     return res.status(200).json({
//       success: true,
//       message: uniqueResults.length
//         ? aiResponse.message || "Products found"
//         : "No results",
//       data: uniqueResults,
//       searchType: "ai_enhanced",
//     });
//   } catch (err) {
//     console.error("AI search failed:", err);
//     // Fallback to enhanced direct search with related products
//     const results = await Product.find({
//       $or: [
//         { title: { $regex: escapeRegex(query), $options: "i" } },
//         { description: { $regex: escapeRegex(query), $options: "i" } },
//         { category: { $regex: escapeRegex(query), $options: "i" } },
//         // Add related categories for shoes
//         query.toLowerCase().includes("shoes")
//           ? {
//               category: {
//                 $in: ["accessories", "clothing", "shoes"],
//                 $regex: "laces|socks|sandals|footwear",
//                 $options: "i",
//               },
//             }
//           : {},
//       ],
//       totalStock: { $gt: 0 },
//     })
//       .limit(20)
//       .lean();

//     return res.status(200).json({
//       success: true,
//       message: results.length
//         ? query.toLowerCase().includes("shoes") &&
//           !results.some((p) => p.title.toLowerCase().includes("classic"))
//           ? "No exact matches, showing related products"
//           : "Some products found"
//         : "No results",
//       data: results,
//       searchType: "direct",
//     });
//   }
// }

// function cleanJsonResponse(text) {
//   return text.replace(/```json|```/g, "").trim();
// }

// function escapeRegex(string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// export default searchProducts;

//test🔻

// import { Product } from "../../models/Product.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const searchProducts = async (req, res) => {
//   try {
//     const keyword = req.query.q?.trim();

//     if (!keyword) {
//       console.log("🔴 Search aborted: Empty keyword.");
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a search keyword.",
//         data: [],
//       });
//     }

//     const isNatural = detectNaturalLanguage(keyword);
//     console.log(`📍 Detected search: ${isNatural ? "AI-enhanced" : "Direct"}`);

//     if (!isNatural) {
//       const directResults = await getDirectSearchResults(keyword);
//       console.log(`✅ Normal Search Used. Matches: ${directResults.length}`);
//       return res.status(200).json({
//         success: true,
//         message: directResults.length
//           ? "Products found"
//           : "No matching results",
//         data: directResults,
//         searchType: "direct",
//       });
//     }

//     const aiResults = await handleAIEnhancedSearch(keyword);
//     console.log(`✅ AI Search Used. Matches: ${aiResults.data.length}`);
//     return res.status(200).json(aiResults);
//   } catch (err) {
//     console.error("🚨 Search Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong.",
//       error: err.message,
//     });
//   }
// };

// function detectNaturalLanguage(query) {
//   const grammarTriggers = [
//     "more than",
//     "less than",
//     "greater than",
//     "under",
//     "above",
//     "around",
//     "between",
//     "with",
//     "in",
//     "want",
//     "looking for",
//     "need",
//     "budget",
//     "recommend",
//     "style",
//     "design",
//   ];
//   const wordCount = query.trim().split(/\s+/).length;
//   return (
//     wordCount > 3 ||
//     grammarTriggers.some((phrase) => query.toLowerCase().includes(phrase))
//   );
// }

// function escapeRegex(text) {
//   return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// async function getDirectSearchResults(keyword) {
//   const regex = new RegExp(escapeRegex(keyword), "i");

//   return await Product.find({
//     $or: [
//       { title: regex },
//       { description: regex },
//       { category: regex },
//       { brand: regex },
//     ],
//     totalStock: { $gt: 0 },
//   })
//     .sort({ wilsonScore: -1 }) // prioritize high-quality
//     .limit(20)
//     .lean();
// }

// async function handleAIEnhancedSearch(query) {
//   const products = await Product.find({ totalStock: { $gt: 0 } })
//     .limit(150)
//     .select(
//       "_id title description category brand price salePrice totalStock averageReview wilsonScore positiveReviews",
//     )
//     .lean();

//   const prompt = buildAIPrompt(query, products);

//   try {
//     const result = await model.generateContent(prompt);
//     const tokensUsed = result.usageMetadata?.totalTokens || "N/A";

//     console.log(`🧠 Gemini AI used with prompt tokens: ${tokensUsed}`);

//     const jsonText = cleanJsonResponse(result.response.text());
//     const parsed = JSON.parse(jsonText);

//     const validIds = parsed.products.map((p) => p._id);

//     const aiResults = await Product.find({
//       _id: { $in: validIds },
//       totalStock: { $gt: 0 },
//     })
//       .sort({ wilsonScore: -1 })
//       .limit(12)
//       .lean();

//     return {
//       success: true,
//       message: parsed.message || "AI-enhanced results",
//       data: aiResults,
//       searchType: "ai_enhanced",
//     };
//   } catch (err) {
//     console.error("⚠️ AI fallback triggered:", err.message);
//     const fallbackResults = await getDirectSearchResults(query);
//     return {
//       success: true,
//       message: "AI failed. Showing best effort results.",
//       data: fallbackResults,
//       searchType: "fallback",
//     };
//   }
// }

// function buildAIPrompt(query, products) {
//   return `
// You are a smart Nepali eCommerce assistant.

// The user searched: "${query}"
// You need to recommend the most relevant products from this list, even if the query has spelling errors or is written in natural/grammatical language.

// Match based on:
// - title, category, brand, description
// - filters like price, salePrice, popularity, review quality (wilsonScore, averageReview)
// - prioritize in-stock products with better ratings
// - match "cheap" = under NPR 2000, "expensive" = over NPR 5000
// - detect color/style/size where possible

// Return max 12 product _id in JSON format:
// {
//   "query": "...",
//   "products": [
//     { "_id": "...", "title": "...", "salePrice": ..., "averageReview": ..., "wilsonScore": ... }
//   ],
//   "message": "Optional message like 'showing similar to red dress under 5000'"
// }

// Products:
// [
// ${products
//   .map((p) => {
//     return `{
//       "_id": "${p._id}",
//       "title": "${p.title}",
//       "category": "${p.category}",
//       "brand": "${p.brand}",
//       "price": ${p.price},
//       "salePrice": ${p.salePrice || p.price},
//       "averageReview": ${p.averageReview || 0},
//       "wilsonScore": ${p.wilsonScore || 0},
//       "positiveReviews": ${p.positiveReviews || 0},
//       "description": "${(p.description || "").slice(0, 60)}"
//     }`;
//   })
//   .join(",\n")}
// ]
//   `.trim();
// }

// function cleanJsonResponse(text) {
//   return text.replace(/```json|```/g, "").trim();
// }

// export default searchProducts;

//okok but typo error✅

// import { Product } from "../../models/Product.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import Typo from "typo-js";
// import dotenv from "dotenv";
// dotenv.config();

// // Load dictionary
// const dictionary = new Typo("en_US");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const searchProducts = async (req, res) => {
//   try {
//     let keyword = req.query.q?.trim();
//     if (!keyword) {
//       console.log("🔴 Empty keyword");
//       return res
//         .status(400)
//         .json({ success: false, message: "Empty search query", data: [] });
//     }

//     const originalKeyword = keyword;
//     let results = await getDirectSearchResults(keyword);

//     if (results.length >= 3) {
//       console.log(`✅ Direct Search used for: "${originalKeyword}"`);
//       return res.status(200).json({
//         success: true,
//         message: "Direct match",
//         data: results,
//         searchType: "direct",
//       });
//     }

//     // 🔍 Try fuzzy correction if not matched
//     const corrected = correctSpelling(keyword);
//     if (corrected && corrected !== keyword) {
//       console.log(`🔄 Corrected "${keyword}" to "${corrected}"`);
//       keyword = corrected;
//       results = await getDirectSearchResults(corrected);
//       if (results.length > 0) {
//         return res.status(200).json({
//           success: true,
//           message: `Showing results for "${corrected}"`,
//           data: results,
//           searchType: "corrected",
//         });
//       }
//     }

//     // 🤖 Gemini AI fallback
//     const aiResults = await handleAIEnhancedSearch(originalKeyword);
//     return res.status(200).json(aiResults);
//   } catch (err) {
//     console.error("🚨 Search Error:", err.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Search failed", error: err.message });
//   }
// };

// function correctSpelling(word) {
//   const words = word.split(" ");
//   const corrected = words.map((w) =>
//     dictionary.check(w) ? w : dictionary.suggest(w)[0] || w,
//   );
//   return corrected.join(" ");
// }

// function escapeRegex(text) {
//   return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// async function getDirectSearchResults(keyword) {
//   const regex = new RegExp(escapeRegex(keyword), "i");
//   return await Product.find({
//     $or: [
//       { title: regex },
//       { description: regex },
//       { category: regex },
//       { brand: regex },
//     ],
//     totalStock: { $gt: 0 },
//   })
//     .sort({ wilsonScore: -1 })
//     .limit(20)
//     .lean();
// }

// async function handleAIEnhancedSearch(query) {
//   const products = await Product.find({ totalStock: { $gt: 0 } })
//     .limit(150)
//     .select(
//       "_id title description category brand price salePrice totalStock averageReview wilsonScore positiveReviews",
//     )
//     .lean();

//   const prompt = buildAIPrompt(query, products);

//   try {
//     const result = await model.generateContent(prompt);
//     const tokensUsed = result.usageMetadata?.totalTokens || "N/A";
//     console.log(`🧠 Gemini AI used with prompt tokens: ${tokensUsed}`);

//     const responseText = cleanJsonResponse(result.response.text());
//     const parsed = JSON.parse(responseText);
//     const ids = parsed.products.map((p) => p._id);

//     const aiResults = await Product.find({
//       _id: { $in: ids },
//       totalStock: { $gt: 0 },
//     })
//       .sort({ wilsonScore: -1 })
//       .lean();

//     return {
//       success: true,
//       message: parsed.message || "AI-enhanced results",
//       data: aiResults,
//       searchType: "ai_enhanced",
//     };
//   } catch (err) {
//     console.log("⚠️ AI failed. Falling back.");
//     return {
//       success: false,
//       message: "AI failed to understand your query",
//       data: [],
//       searchType: "fallback",
//     };
//   }
// }

// function buildAIPrompt(query, products) {
//   return `
// You are a smart eCommerce search assistant. Match the user query: "${query}" with the following products. Suggest products based on category, brand, title, description, price, and quality and current fashion trend.

// Return max 12 _id values in this JSON format:
// {
//   "query": "...",
//   "products": [
//     { "_id": "...", "title": "...", "salePrice": ..., "averageReview": ..., "wilsonScore": ... }
//   ],
//   "message": "Optional helpful note"
// }

// Product List:
// [
// ${products
//   .map((p) => {
//     return `{
//     "_id": "${p._id}",
//     "title": "${p.title}",
//     "category": "${p.category}",
//     "brand": "${p.brand}",
//     "price": ${p.price},
//     "salePrice": ${p.salePrice || p.price},
//     "averageReview": ${p.averageReview || 0},
//     "wilsonScore": ${p.wilsonScore || 0},
//     "positiveReviews": ${p.positiveReviews || 0},
//     "description": "${(p.description || "").slice(0, 60)}"
//   }`;
//   })
//   .join(",\n")}
// ]
//   `.trim();
// }

// function cleanJsonResponse(text) {
//   return text.replace(/```json|```/g, "").trim();
// }

// export default searchProducts;

import { Product } from "../../models/Product.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Typo from "typo-js";
import dotenv from "dotenv";
dotenv.config();

// Typo dictionary
const dictionary = new Typo("en_US");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const searchProducts = async (req, res) => {
  try {
    let keyword = req.query.q?.trim();
    if (!keyword) {
      return res
        .status(400)
        .json({ success: false, message: "Empty search query", data: [] });
    }

    const originalKeyword = keyword;

    // 1️⃣ Direct MongoDB Search
    let results = await getDirectSearchResults(keyword);
    if (results.length >= 3) {
      console.log(`✅ Direct Search used for: "${originalKeyword}"`);
      return res.status(200).json({
        success: true,
        message: "Direct match",
        data: results,
        searchType: "direct",
      });
    }

    // 2️⃣ Spell Correction (Only if at least one incorrect word exists)
    const { correctedQuery, isCorrected } = correctIfMisspelled(keyword);

    if (isCorrected && correctedQuery !== keyword) {
      console.log(`🔄 Did you mean: "${correctedQuery}"`);
      const correctedResults = await getDirectSearchResults(correctedQuery);
      if (correctedResults.length > 0) {
        return res.status(200).json({
          success: true,
          message: `Showing results for "${correctedQuery}"`,
          data: correctedResults,
          searchType: "corrected",
          didYouMean: correctedQuery,
        });
      }
    }

    // 3️⃣ Gemini AI Enhanced Search
    const aiResults = await handleAIEnhancedSearch(originalKeyword);
    return res.status(200).json({ ...aiResults });
  } catch (err) {
    console.error("🚨 Search Error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Search failed", error: err.message });
  }
};

// ✅ Function: Only correct if at least one misspelled word
function correctIfMisspelled(input) {
  const words = input.split(" ");
  let isCorrected = false;
  const correctedWords = words.map((word) => {
    if (dictionary.check(word)) return word;
    const suggestion = dictionary.suggest(word)[0];
    if (suggestion) {
      isCorrected = true;
      return suggestion;
    }
    return word;
  });

  return {
    correctedQuery: correctedWords.join(" "),
    isCorrected,
  };
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getDirectSearchResults(keyword) {
  const regex = new RegExp(escapeRegex(keyword), "i");
  return await Product.find({
    $or: [
      { title: regex },
      { description: regex },
      { category: regex },
      { brand: regex },
    ],
    totalStock: { $gt: 0 },
  })
    .sort({ wilsonScore: -1 })
    .limit(20)
    .lean();
}

async function handleAIEnhancedSearch(query) {
  const products = await Product.find({ totalStock: { $gt: 0 } })
    .limit(150)
    .select(
      "_id title description category brand price salePrice totalStock averageReview wilsonScore positiveReviews",
    )
    .lean();

  const prompt = buildAIPrompt(query, products);

  try {
    const result = await model.generateContent(prompt);
    const tokensUsed = result.usageMetadata?.totalTokens || "N/A";
    console.log(`🧠 Gemini AI used (tokens: ${tokensUsed})`);

    const responseText = cleanJsonResponse(result.response.text());
    const parsed = JSON.parse(responseText);
    const ids = parsed.products.map((p) => p._id);

    const aiResults = await Product.find({
      _id: { $in: ids },
      totalStock: { $gt: 0 },
    })
      .sort({ wilsonScore: -1 })
      .lean();

    return {
      success: true,
      message: parsed.message || "AI-enhanced results",
      data: aiResults,
      searchType: "ai_enhanced",
    };
  } catch (err) {
    console.log("⚠️ Gemini AI failed:", err.message);
    return {
      success: false,
      message: "AI failed to understand your query",
      data: [],
      searchType: "fallback",
    };
  }
}

function buildAIPrompt(query, products) {
  return `
You are a smart eCommerce product search assistant.
Match the query: "${query}" against the following product inventory.

Return max 12 _id values:
{
  "query": "...",
  "products": [
    { "_id": "...", "title": "...", "salePrice": ..., "averageReview": ..., "wilsonScore": ..., "description": ..., "price": ..., "category": ..., "brand": ... }
  ],
  "message": "Optional helpful note"
}

Available Products:
[
${products
  .map((p) => {
    return `{
      "_id": "${p._id}",
      "title": "${p.title}",
      "category": "${p.category}",
      "brand": "${p.brand}",
      "price": ${p.price},
      "salePrice": ${p.salePrice || p.price},
      "averageReview": ${p.averageReview || 0},
      "wilsonScore": ${p.wilsonScore || 0},
      "description": "${(p.description || "").slice(0, 60)}"
    }`;
  })
  .join(",\n")}
]
  `.trim();
}

function cleanJsonResponse(text) {
  return text.replace(/```json|```/g, "").trim();
}

export default searchProducts;
