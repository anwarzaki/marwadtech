import Product from "../models/product.js"

const createProduct = async(req,res) =>{
    const {name,price,discount,stock,category,status} = req.body;

    try{
        if (!name || price == null || stock == null || !category) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }
         const product = await Product.create({
            name,
            price,
            discount,
            stock,
            category,
            status,
            createdBy: req.user.id,
        });

        res.status(201).json({ message: "Product created successfully",product,});

    } catch(error){
         res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
}

// GET Products with Pagination, Search, Filter, Sort
  const getProducts = async (req, res) => {
  try {
    let { page, limit, search, sortBy, sortOrder, status, category, startDate, endDate } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    // Build query object
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive
    }

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Build sort object
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const products = await Product.find(query)
      .populate("createdBy", "name mobile") // optional
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      page,
      totalPages,
      totalItems: total,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};



export {createProduct,getProducts};