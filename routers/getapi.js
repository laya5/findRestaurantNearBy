const express = require("express");
const {
  getRestaurant,
  addRestaurant,
  findRestaurantsNearMe,
  patchUpdate,
  putUpdate,
  deleteRestaurant,
  addRatings,
} = require("../contollers/Indes");
const router = express.Router();
const Model = require("../models/restaurant");
router.route("/").get(getRestaurant).post(addRestaurant);
router.route("/nearMe").post(findRestaurantsNearMe);
router
  .route("/:id")
  .delete(deleteRestaurant)
  .put(putUpdate)
  .post(addRatings)
  .patch(patchUpdate);
module.exports = router;
