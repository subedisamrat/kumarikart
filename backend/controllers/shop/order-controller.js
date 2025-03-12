import paypal from "../../config/paypal.js";
import { Order } from "../../models/Order.js";

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
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-failure",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "NPR", // paypal isn't yet working in context of nepal so i'm keeping USD here change as per your suitability of the currency.
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "NPR",
            total: totalAmount.toFixed(2),
          },
          description: "This is a description!!",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (paymentInfo, error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while making paypal payment",
        });
      } else {
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
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url",
        ).href;

        res.status(200).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
const capturePayment = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export { createOrder, capturePayment };
