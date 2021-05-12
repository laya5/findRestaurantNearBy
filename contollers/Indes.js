const Model = require("../models/restaurant");
// getALL restaurants
exports.getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Model.find();

    return res.status(200).json({
      message: "success",
      length: restaurant.length,
      restaurant,
    });
  } catch (err) {
    console.log(err, "error in fetching details of restaurants");
    res.status(500).json({
      error,
      message: "couldnt fetch restaurants",
    });
  }
};
//add newrating into array
exports.addRatings = async (req, res) => {
  var id = req.params.id;
  var ratings = req.body.ratings;
  await Model.findByIdAndUpdate(
    id,
    {
      $push: {
        ratings: [ratings],
      },
    },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: "error in updating ",
        });
      } else {
        return res.status(200).json({
          message: "updated",
          result,
        });
      }
    }
  );
};

// updatinf RestaurantsBy ID
exports.patchUpdate = async (req, res) => {
  var id = req.params.id;
  await Model.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: "error in updating value",
        });
      } else {
        return res.status(200).json({
          message: "updated",
          result,
        });
      }
    }
  );
};
// putRequest
exports.putUpdate = async (req, res) => {
  var id = req.params.id;
  var { nameOfRestaurant, DescriptionofRestaurant, ratings, location } =
    req.body;
  await Model.findByIdAndUpdate(
    id,
    {
      $set: {
        nameOfRestaurant,
        DescriptionofRestaurant,
        ratings,
        location,
      },
    },
    { new: true },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: "error in updating values",
        });
      } else if (result) {
        return res.status(200).json({
          message: "updated",
          result,
        });
      } else if (!result) {
        return res.status(200).json({
          message: "NO ID EXISTS WITH THE GIVEN ID",
        });
      }
    }
  );
};

// Creating Restaurants
exports.addRestaurant = async (req, res, next) => {
  Model.findOne(
    { nameofRestaurant: req.body.nameOfRestaurant },
    async function (err, result) {
      if (err) {
        return res.status(400).json({
          message: "there is a problem with server please try again",
        });
      }
      if (result) {
        return res.status(203).json({
          message: "Restaurant already present in Database",
        });
      } else if (!result) {
        const user1 = new Model({
          nameofRestaurant: req.body.nameOfRestaurant,
          DescriptionofRestaurant: req.body.DescriptionofRestaurant,
          location: req.body.location,
          ratings: req.body.ratings,
        });
        user1.save(function (error, data) {
          if (data) {
            return res.status(201).json({
              Restaurant: data,
              message: "Restaurant added succesfully",
            });
          }
          if (error) {
            return res.status(400).json({
              message:
                "something went wrong unable to add restaurant try again later",
            });
          }
        });
      }
    }
  );
};

// for finding Restaurants Near the given Distance

function distance(lat1, lat2, lon1, lon2, Radius) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 6371;

  // calculate the result
  var distance = c * r * 1000;
  if (distance <= Radius) {
    return true;
  } else {
    return false;
  }
}

exports.findRestaurantsNearMe = async (req, res) => {
  const { Latitude, Longitude, Radius } = req.body;
  console.log("latitudes input", req.body);
  try {
    const restaurant = await Model.find();
    var array3 = [];
    restaurant.forEach(function (item) {
      var lat2 = item.location.Latitude;
      var long2 = item.location.Longitude;
      const DIstance = distance(Latitude, lat2, Longitude, long2, Radius);
      if (DIstance) {
        array3.push(item._id);
      }
    });
    console.log(array3);
    var Array1 = [];
    Model.aggregate(
      [
        { $match: { _id: { $in: array3 } } },
        {
          $project: {
            _id: 0,
            nameofRestaurant: 1,
            DescriptionofRestaurant: 1,
            AverageRating: { $avg: "$ratings" },
            NumberOfRatings: {
              $size: { $ifNull: ["$ratings", []] },
            },
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.status(500).json({
            message: "error in some aggregate function",
          });
        } else if (result.length == 0) {
          res.status(200).json({
            message:
              "OOPS!! no restaurants at this distance try finding restaurants far away",
          });
        } else if (result) {
          res.status(200).json({
            result,
            message: "all restaurants near you",
          });
        }
      }
    );
  } catch (e) {
    res.status(400).json({
      message: "error occured",
      err,
    });
  }
};

// delete Requests

exports.deleteRestaurant = async (req, res) => {
  Model.findByIdAndDelete(req.params.id, function (err, docs) {
    if (err) {
      res.status(500).json({
        message: "error in deleting restaurant from database",
      });
    } else {
      console.log("Deleted : ", docs);
      res.status(200).json({
        message: "succesufully deleted estaurant from database",
        docs,
      });
    }
  });
};
