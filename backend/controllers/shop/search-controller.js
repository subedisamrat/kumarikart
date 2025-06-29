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

//--------------------------AI Implemenation for Searching the products ✅---------------------------------------------------------//

// import dotenv from "dotenv";
// dotenv.config();
// import { Product } from "../../models/Product.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const searchProducts = async (req, res) => {
//   try {
//     // const { keyword } = req.params;
//     const keyword = req.query.q;
//     if (!keyword || typeof keyword !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing keyword.",
//         data: [],
//       });
//     }

//     const query = keyword.trim();

//     // 1. First: Strict MongoDB search
//     const regex = new RegExp(query, "i");
//     const exactResults = await Product.find({
//       $or: [
//         { title: regex },
//         { description: regex },
//         { category: regex },
//         { brand: regex },
//       ],
//     });

//     // If exact matches found, return them immediately
//     if (exactResults.length > 0) {
//       return res.status(200).json({
//         success: true,
//         message: "Direct product matches found.",
//         data: exactResults,
//       });
//     }

//     // 2. Fallback: Ask Gemini to suggest alternative search keywords (not products!)
//     const productTitles = await Product.find({}, { title: 1, _id: 0 }).limit(
//       100,
//     );
//     const allTitles = productTitles.map((p) => p.title).join(", ");

//     const prompt = `
//      You are a smart product search assistant for an eCommerce site.

//     User searched for: "${query}"
//     But no products were found.

//     Here are available product names in the store:
//     ${allTitles}

//     Follow these basic below mentioned rules:

//     -You must know greater than and less than from the ${query} given by users in search bar for the ${allTitles} products they search for.
//     -You should understand fashions about the user through their ${query} done in search bar.
//     -You must know what products are cheap and what are expensive in this store available, Here's the products ${allTitles} in the store.
//     -You should understand mis-spelled words like shose -> shoes etc.
//     -You should also understand what products are of what uses and what products are of nice brands, qualities , features etc which makes customer also easy to filter the products.
//     -Suggest a similar or alternative product name if possible.
//     -If nothing relevant exists, just say: "Not found".
//     -Only return a single suggestion string or say "Not found".
//     -Use current running fashion sense in the present world with nice trending features which should give the result based on the customers preferance.
//     -Shouldn't give unrelated products like customer is talking about one product and you suggesting another different product it shouldn't happen.
//     `;

//     const response = await model.generateContent(prompt);
//     const suggestion = response.response.text().trim().replace(/"/g, "");

//     if (suggestion.toLowerCase().includes("not found")) {
//       return res.status(404).json({
//         success: false,
//         message: "No matching products found.",
//         data: [],
//       });
//     }

//     // 3. Search again using Gemini's suggestion

//     function escapeRegex(string) {
//       return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     }

//     const safeSuggestion = escapeRegex(suggestion);
//     const suggestionRegex = new RegExp(safeSuggestion, "i");
//     const aiResults = await Product.find({
//       $or: [
//         { title: suggestionRegex },
//         { description: suggestionRegex },
//         { category: suggestionRegex },
//         { brand: suggestionRegex },
//       ],
//     });

//     // console.log("Results", response);

//     // const suggestionRegex = new RegExp(suggestion, "i");
//     // const aiResults = await Product.find({
//     //   $or: [
//     //     { title: suggestionRegex },
//     //     { description: suggestionRegex },
//     //     { category: suggestionRegex },
//     //     { brand: suggestionRegex },
//     //   ],
//     // });

//     if (aiResults.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: `No products found for "${query}" or similar.`,
//         data: [],
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `No exact match, but similar results for "${suggestion}".`,
//       data: aiResults,
//     });
//   } catch (err) {
//     console.error("Search Error:", err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Search failed due to server error.",
//       error: err.message,
//     });
//   }
// };

// export default searchProducts;

//-----------------------------------------------------------------------------------------------------------------------

//AI Search with reference with GROK ✅

import { Product } from "../../models/Product.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini API with error handling
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q?.trim();
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Please enter a search term",
      });
    }

    // Direct MongoDB search for exact matches
    const directResults = await Product.find({
      $or: [
        { title: { $regex: escapeRegex(keyword), $options: "i" } },
        { description: { $regex: escapeRegex(keyword), $options: "i" } },
        { category: { $regex: escapeRegex(keyword), $options: "i" } },
        { brand: { $regex: escapeRegex(keyword), $options: "i" } },
      ],
      totalStock: { $gt: 0 },
    })
      .limit(20)
      .lean();

    // Return direct results if sufficient
    if (directResults.length >= 3) {
      return res.status(200).json({
        success: true,
        message: "Products found",
        data: directResults,
        searchType: "direct",
      });
    }

    // AI-powered search for advanced queries
    return await handleAdvancedSearch(keyword, res);
  } catch (err) {
    console.error("Search Error:", err);
    return res.status(500).json({
      success: false,
      message: "Search failed. Please try again.",
      error: err.message,
    });
  }
};

async function handleAdvancedSearch(query, res) {
  // Validate API key
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    // Fallback to direct search
    const results = await Product.find({
      $or: [
        { title: { $regex: escapeRegex(query), $options: "i" } },
        { description: { $regex: escapeRegex(query), $options: "i" } },
      ],
      totalStock: { $gt: 0 },
    })
      .limit(20)
      .lean();

    return res.status(200).json({
      success: true,
      message: results.length ? "Some products found" : "No results",
      data: results,
      searchType: "direct",
    });
  }

  // Fetch in-stock products for AI context
  const sampleProducts = await Product.find({ totalStock: { $gt: 0 } })
    .limit(200)
    .select(
      "_id title description category brand price gender rating totalStock",
    )
    .lean();

  // Prompt with related product suggestions
  const prompt = `
You are an AI-powered product search assistant for a Nepali e-commerce platform. Interpret user queries in natural language (e.g., "classic shoes above NPR 5000") or structured language (e.g., "category:shoes, style:classic, price:>5000") and return matching products from the provided inventory. If no exact matches are found, suggest related products (e.g., for "classic shoes", suggest shoe laces, socks, sandals, or other footwear). Follow these guidelines:

1. **Query Types**:
   - Natural: "classic shoes above NPR 5000", "trendy women’s dresses under NPR 3000".
   - Structured: "category:smartphones, brand:Samsung, price:<50000", "color:blue, sort:price-low-to-high".

2. **Product Matching**:
   - Extract: category, brand, price range, color, size, gender, style, features, sort.
   - Ambiguous queries (e.g., "cheap phones"): assume price < NPR 20000, note in assumptions.
   - Partial matches: "classic shoes" matches "vintage leather shoes".
   - Synonyms: "classic" = "vintage", "traditional"; "inexpensive" = "affordable".
   - Prioritize in-stock products (totalStock > 0).

3. **Related Products**:
   - If no exact matches, suggest related items based on category or use case:
     - For "shoes": suggest shoe laces, socks, insoles, sandals, sneakers.
     - For "dresses": suggest scarves, jewelry, handbags.
     - For "electronics": suggest accessories (e.g., chargers, cases).
   - Include a message indicating related products are shown.

4. **Output Format**:
   - JSON:
     {
       "query": "original query",
       "products": [
         {
           "_id": "product ID",
           "title": "product title",
           "category": "category",
           "brand": "brand name",
           "price": number,
           "gender": "gender or null",
           "rating": number or null,
           "totalStock": number
         }
       ],
       "total_results": number,
       "message": "optional message, e.g., 'No exact matches, showing related products'"
     }
   - Use exact IDs from inventory.
   - Limit to 12 products.
   - Empty results: return empty array with message.

5. **Context**:
   - Currency: NPR.
   - Categories: shoes, clothing, electronics, accessories, etc.
   - Nepali trends: "classic" = formal, traditional styles; "trendy" = modern, vibrant.
   - Sort: price-low-to-high, price-high-to-low, relevance, newest.

6. **Inventory**:
[
${sampleProducts
  .map(
    (p) => `
  {
    "_id": "${p._id}",
    "title": "${p.title || "No title"}",
    "price": ${p.price || 0},
    "category": "${p.category || "Uncategorized"}",
    "brand": "${p.brand || "Generic"}",
    "description": "${p.description || "No description"}",
    "gender": "${p.gender || "unisex"}",
    "rating": ${p.rating || null},
    "totalStock": ${p.totalStock || 0}
  }`,
  )
  .join(",\n")}
]

7. **Examples**:
   - Query: "classic shoes above NPR 5000"
     - If matches: return classic shoes > NPR 5000.
     - If no matches: suggest shoe laces, socks, or other footwear with message.
   - Query: "category:laptops, brand:Apple, price:<100000"
     - Return Apple laptops < NPR 100000.

Process query: "${query}"
`;

  try {
    const response = await model.generateContent(prompt);
    const responseText = cleanJsonResponse(response.response.text());
    const aiResponse = JSON.parse(responseText);

    // Fetch full product details
    const aiResults = await Product.find({
      _id: { $in: aiResponse.products.map((p) => p._id) },
      totalStock: { $gt: 0 },
    })
      .limit(12)
      .lean();

    // Combine with direct results
    const directResults = await Product.find({
      $or: [
        { title: { $regex: escapeRegex(query), $options: "i" } },
        { description: { $regex: escapeRegex(query), $options: "i" } },
      ],
      totalStock: { $gt: 0 },
    })
      .limit(5)
      .lean();

    // Remove duplicates
    const allResults = [...directResults, ...aiResults];
    const uniqueResults = allResults.filter(
      (p, i, self) =>
        i === self.findIndex((sp) => sp._id.toString() === p._id.toString()),
    );

    return res.status(200).json({
      success: true,
      message: uniqueResults.length
        ? aiResponse.message || "Products found"
        : "No results",
      data: uniqueResults,
      searchType: "ai_enhanced",
    });
  } catch (err) {
    console.error("AI search failed:", err);
    // Fallback to enhanced direct search with related products
    const results = await Product.find({
      $or: [
        { title: { $regex: escapeRegex(query), $options: "i" } },
        { description: { $regex: escapeRegex(query), $options: "i" } },
        { category: { $regex: escapeRegex(query), $options: "i" } },
        // Add related categories for shoes
        query.toLowerCase().includes("shoes")
          ? {
              category: {
                $in: ["accessories", "clothing", "shoes"],
                $regex: "laces|socks|sandals|footwear",
                $options: "i",
              },
            }
          : {},
      ],
      totalStock: { $gt: 0 },
    })
      .limit(20)
      .lean();

    return res.status(200).json({
      success: true,
      message: results.length
        ? query.toLowerCase().includes("shoes") &&
          !results.some((p) => p.title.toLowerCase().includes("classic"))
          ? "No exact matches, showing related products"
          : "Some products found"
        : "No results",
      data: results,
      searchType: "direct",
    });
  }
}

function cleanJsonResponse(text) {
  return text.replace(/```json|```/g, "").trim();
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default searchProducts;

//test🔻
