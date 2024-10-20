const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// MongoDB URI
const mongoURI = process.env.MONGO_CONN; // Make sure this is set in your environment variables

// Create a connection to the database
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname, // Use the original filename
      bucketName: "resumes", // Name of the bucket
    };
  },
});

// Create the upload instance
const upload = multer({ storage });

module.exports = upload;
