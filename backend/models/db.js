const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

// const  userSchema = new mongoose.Schema({
//     email :{
//         type: String,
//         required: true,
//     },
//     password :{
//         type: String,
//         required: true,
//     }
// }, { timestamps: true })

// const  User = mongoose.model('User', userSchema);
// module.exports = User;  //export the model to use it in other files

const mongo_url = process.env.MONGO_CONN;
mongoose.connect(mongo_url).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("mongo connection fail", err)
})

const conn = mongoose.connection;


let gfs;

conn.once('open', () => {
  // Initialize stream for GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('resumes'); // The bucket name, adjust it if needed
  console.log('Connected to MongoDB and GridFS is ready.');
});