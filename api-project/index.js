const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const imageUpload = require('multer');

const { connectMongoDB } = require('./config/database');
const { diskStorage } = require('./config/image');

const userRoutes = require('./routes/user');

const app = express();

// need config cors
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);

(
  async () => {
    try {
      await connectMongoDB();
      app.listen(3000);
    } catch (error) {
      console.log(error);
    }
  }
)();