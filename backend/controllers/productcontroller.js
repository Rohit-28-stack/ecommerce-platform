
const Product = require("../models/product")
const cloudinary = require("../config/cloudinary");


module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const images = req.files
      ? req.files.map(file => file.path)
      : [];

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock),
      images,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    let query = {};

    // Search by product name
    if (req.query.search) {
      query.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Price filter
    if (req.query.minprice || req.query.maxPrice) {
      query.price = {};

      if (req.query.minprice) {
        query.price.$gte = Number(req.query.minprice);
      }

      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    // Stock filter
    if (req.query.stock === "instock") {
      query.stock = { $gt: 0 };
    }

    if (req.query.stock === "outofstock") {
      query.stock = 0;
    }

    // Create query
    let productsQuery = Product.find(query);

    // Sorting
    if (req.query.sort === "priceAsc") {
      productsQuery = productsQuery.sort({ price: 1 });
    }

    if (req.query.sort === "priceDesc") {
      productsQuery = productsQuery.sort({ price: -1 });
    }

    if (req.query.sort === "newest") {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    if (req.query.sort === "oldest") {
      productsQuery = productsQuery.sort({ createdAt: 1 });
    }

    // Pagination
    const products = await productsQuery
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

   if (req.files && req.files.length > 0) {
  updateData.images = req.files.map(file => file.path);
}

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "product deleted"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })

    }
}
module.exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(
            req.params.id
        )
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user.id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({
                message: "You already reviewed this product"
            })
        }
        const review = {
            user: req.user.id,
            rating: Number(rating),
            comment
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.averageRating = product.reviews.reduce(
            (acc, item) => acc + item.rating, 0
        ) / product.reviews.length

        await product.save()
        res.status(201).json({
            message: "Review added successfully",
            product
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports.getReviews = async (req, res) => {

    try {
        const product = await Product.findById(
            req.params.id
        ).populate(
            "reviews.user",
            "name"
        )

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json(
            product.reviews
        )
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })

    }
}