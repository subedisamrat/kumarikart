import { Address } from "../../models/Address.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(404).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      phone,
      pincode,
      notes,
    });
    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is Required",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "UserId and AddressId is Required",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true },
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!!",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "UserId and AddressId is Required",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

export { addAddress, fetchAllAddress, editAddress, deleteAddress };
