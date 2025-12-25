import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

export const getDashboardStats = async (req, res) => {
  try {
    const { filter, startDate, endDate } = req.query;

    let dateQuery = {};
    const now = new Date();

    if (filter === "today") {
      const start = new Date(now.setHours(0, 0, 0, 0));
      const end = new Date(now.setHours(23, 59, 59, 999));
      dateQuery = { $gte: start, $lte: end };

    } else if (filter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const start = new Date(yesterday.setHours(0, 0, 0, 0));
      const end = new Date(yesterday.setHours(23, 59, 59, 999));
      dateQuery = { $gte: start, $lte: end };

    } else if (filter === "weekly") {
      const start = new Date();
      start.setDate(start.getDate() - 7);
      dateQuery = { $gte: start, $lte: new Date() };

    } else if (filter === "monthly") {
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      dateQuery = { $gte: start, $lte: new Date() };

    } else if (filter === "custom") {
      if (!startDate || !endDate) {
        return res.status(400).json({
          message: "Start date and end date are required for custom filter"
        });
      }

      dateQuery = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const userCount = await User.countDocuments({ createdAt: dateQuery });
    const productCount = await Product.countDocuments({ createdAt: dateQuery });
    const orderCount = await Order.countDocuments({ createdAt: dateQuery });

    const revenueResult = await Order.aggregate([
      { $match: { createdAt: dateQuery } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      totalUsers: userCount,
      totalProducts: productCount,
      totalOrders: orderCount,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      message: "Dashboard data fetch failed",
      error: error.message
    });
  }
};
