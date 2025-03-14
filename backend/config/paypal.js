import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "Accgld464f794btHonykroRTI-E0CICOaGeOZjnvNhaiR_UuMrwYEtxICOTzZN7pxjWQ2M10vnQphgIe",
  //"AR27CbfRrkjy_lrNCPzS96yAFYGtSR8suAqDidVSjIvyn3XAKMHyWZpjTcwr3FGkd85kb0sAYODL8_4G",

  client_secret:
    "EJninTSW9futUknTInqZAfqzt4S3pzajgdG4gHF3pNxePuCJ3navYiMZPcF-MhQQqYApngF6HGanQQOp",
  //"EFZ4gvMPB7uumnf7nyiR9bZ6avT1xAh_aPTTwL3Xyn5XqgQuZvBxQQ_-eGfn9qb1BkeGngNk0FJ8Lk_N",
});

export default paypal;
