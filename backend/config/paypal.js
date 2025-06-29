import paypal from "paypal-rest-sdk";

export const configurePaypal = () => {
  paypal.configure({
    mode: process.env.PAYPAL_MODE || "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
};

export default paypal;
