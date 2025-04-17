// import paypal from "../../config/paypal.js";
// import { Order } from "../../models/Order.js";

// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdatedDate,
//       paymentId,
//       payerId,
//     } = req.body;

//     const create_payment_json = {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       redirect_urls: {
//         return_url: "http://localhost:5173/shop/paypal-return",
//         cancel_url: "http://localhost:5173/shop/paypal-cancel",
//       },
//       transactions: [
//         {
//           item_list: {
//             items: cartItems.map((item) => ({
//               name: item.title,
//               sku: item.productId,
//               price: item.price.toFixed(2),
//               currency: "USD", // paypal isn't yet working in context of nepal so i'm keeping USD here change as per your suitability of the currency.
//               quantity: item.quantity,
//             })),
//           },
//           amount: {
//             currency: "USD",
//             total: totalAmount.toFixed(2),
//           },
//           description: "This is a description!!",
//         },
//       ],
//     };

//     paypal.payment.create(create_payment_json, async (paymentInfo, error) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: "Error while making paypal payment",
//         });
//       } else {
//         const newlyCreatedOrder = new Order({
//           userId,
//           cartItems,
//           addressInfo,
//           orderStatus,
//           paymentMethod,
//           paymentStatus,
//           totalAmount,
//           orderDate,
//           orderUpdatedDate,
//           paymentId,
//           payerId,
//         });

//         await newlyCreatedOrder.save();

//         const approvalURL = paymentInfo.links.find(
//           (link) => link.rel === "approval_url",
//         ).href;

//         res.status(200).json({
//           success: true,
//           approvalURL,
//           orderId: newlyCreatedOrder._id,
//         });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error!",
//     });
//   }
// };
// const capturePayment = async (req, res) => {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error!",
//     });
//   }
// };

// export { createOrder, capturePayment };

import paypal from "../../config/paypal.js";
import { Order } from "../../models/Order.js";
import { Cart } from "../../models/Cart.js";
import { Product } from "../../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdatedDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD", // paypal isn't yet working in context of nepal so i'm keeping USD here change as per your suitability of the currency.
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "This is a description!!",
        },
      ],
    };

    // ❌ ERROR FIX: Convert callback-based function to promise-based to handle async issues
    const paymentInfo = await new Promise((resolve, reject) => {
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
          console.log(error);
          reject(error); // ✅ Fix: Properly reject to handle errors
        } else {
          resolve(payment);
        }
      });
    });

    // ❌ ERROR FIX: Ensure approval URL exists before using it
    const approvalURL = paymentInfo.links.find(
      (link) => link.rel === "approval_url",
    )?.href;

    if (!approvalURL) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve approval URL",
      });
    }

    const newlyCreatedOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdatedDate,
      paymentId,
      payerId,
      cartId,
    });

    await newlyCreatedOrder.save();

    res.status(200).json({
      success: true,
      approvalURL,
      orderId: newlyCreatedOrder._id,
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message || error,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, orderId, payerId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    (order.paymentId = paymentId), (order.payerId = payerId);

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for ${product.title}`,
        });
      }
      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCardId = order.cartId;
    await Cart.findByIdAndDelete(getCardId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Confirmed !",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };
