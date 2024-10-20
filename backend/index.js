const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 8000;
const bodyParser = require('body-parser');
const Company =  require('./models/jobs');
const Job = require('./models/jobs')

// mongoose.connect('mongodb+srv://sumerafatima382:vHyYNKQuirXoj280@jobportal.azdo2.mongodb.net/careers').then(console.log("mongodb Connected"))
// vHyYNKQuirXoj280

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

app.use(bodyParser.json()); // For parsing JSON
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 


app.post('/register',async (req,res)=>{
    let user = new Company(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtkey,{expiresIn: '2h'}, (err, token)=>{
        if(err){
         res.send({result: 'something went wrong, please try after few seconds'});
        }
         res.send({result, auth:token});
     })
  })
  


//   const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter');


require('dotenv').config();
require('./models/db');
const PORT = process.env.PORT || 8000;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);
app.use('/uploads', express.static('uploads'))


require('./geminiApi')