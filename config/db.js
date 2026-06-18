const mongoose = require("mongoose");

async function connectDB() {
  try {
    //this is a code which perhaps can go wrong so we put it in a try catch block
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qm94ulj.mongodb.net/${process.env.DB_NAME}`,
    );
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("mongo db failed!!!");
    //catch the error and give methe function to reacte
  }
}
module.exports = connectDB; //הפונקציה הזו זמינה לקבצים אחרים
