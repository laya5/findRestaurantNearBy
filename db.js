const mongoose = require("mongoose");

const connect = async () => {
  console.log(process.env.MONGO_URI);
  const MONGOURI =
    "mongodb+srv://Laya:Hello@7@cluster0.6psnh.mongodb.net/GEOLOCATIONS?retryWrites=true&w=majority";
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Laya:Hello@7@cluster0.6psnh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("hellomongooseConnected");
    console.log(`${conn.connection.host}`);
  } catch (error) {
    console.log("error");
  }
};
module.exports = connect;
