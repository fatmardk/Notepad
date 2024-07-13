const mongoose = require('mongoose');
const baglan = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDb Baglandi --> ${conn.connection.name}`.blue.inverse);
};

module.exports = baglan;

