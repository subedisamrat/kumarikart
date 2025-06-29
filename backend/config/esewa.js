import { EsewaIntegration } from "esewa-integration-server";
import dotenv from "dotenv";
dotenv.config();

const esewa = new EsewaIntegration({
  secretKey: process.env.ESEWA_SECRET_KEY,
  successUrl: `${process.env.CLIENT_BASE_URL}/payment-success`,
  failureUrl: `${process.env.CLIENT_BASE_URL}/payment-error`,
  secure: false,
  sameSite: "lax",
});

export default esewa;
