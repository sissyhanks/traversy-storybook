const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //things that prevent warnings in console???? 8 &9 gave me shit in the console ??? commented them out are OK
      useNewUrlParser: true,
      // useUnifiedTypology : true,
      // useFindAndModify: false
    })

    console.log(`Mongo DB connected: ${conn.connection.host}`);
  } catch (err) {
    //log the error in console
    console.error(err);
    //stop the presses and exit with error >>> which is what the one indicates
    process.exit(1);
  }
}

module.exports = connectDB;