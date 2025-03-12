import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "Accgld464f794btHonykroRTI-E0CICOaGeOZjnvNhaiR_UuMrwYEtxICOTzZN7pxjWQ2M10vnQphgIe",
  client_secret:
    "EJninTSW9futUknTInqZAfqzt4S3pzajgdG4gHF3pNxePuCJ3navYiMZPcF-MhQQqYApngF6HGanQQOp",
});

export default paypal;
