const User = require("../models/user")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")


module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports.loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports.addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        user.addresses.push(req.body)
        await user.save()
        res.status(201).json({
            message: "Address added",
            addresses: user.addresses
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
module.exports.getAddresses = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        res.json(user.addresses);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports.updateAddress = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)

        const address = user.addresses.id(req.params.addressId)

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            })
        }

        address.fullName =
            req.body.fullName || address.fullName

        address.mobile =
            req.body.mobile || address.mobile

        address.addressLine =
            req.body.addressLine || address.addressLine

        address.city =
            req.body.city || address.city

        address.state =
            req.body.state || address.state

        address.pincode =
            req.body.pincode || address.pincode

        await user.save()

        res.json({
            message: "Address updated",
            address
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports.deleteAddress = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)

        const address = user.addresses.id(
            req.params.addressId
        )

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            })
        }

        address.deleteOne()

        await user.save()

        res.json({
            message: "Address deleted"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports.getallusers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};