// import paypal from "paypal-rest-sdk";

// paypal.configure({
//   mode: "sandbox",
//   client_id:
//     "Accgld464f794btHonykroRTI-E0CICOaGeOZjnvNhaiR_UuMrwYEtxICOTzZN7pxjWQ2M10vnQphgIe",
//   //process.env.PAYPAL_CLIENT_ID,

//   client_secret:
//     "EJninTSW9futUknTInqZAfqzt4S3pzajgdG4gHF3pNxePuCJ3navYiMZPcF-MhQQqYApngF6HGanQQOp",
//   //process.env.PAYPAL_CLIENT_SECRET,
// });

// export default paypal;

// paypal-config.js✅
import paypal from "paypal-rest-sdk";

export const configurePaypal = () => {
  paypal.configure({
    mode: process.env.PAYPAL_MODE || "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
};

export default paypal;
