const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  getAllOrdersByUser,
  getAllOrdersByAdmin,
  updateOrderByAdmin,
  deleteOrderByAdmin,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders").get(isAuthenticatedUser, getAllOrdersByUser);

// ..... Admin Only .....

router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrdersByAdmin);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderByAdmin)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrderByAdmin);

module.exports = router;
