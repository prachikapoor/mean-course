const express = require("express");
const path=require('path');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const postRoutes= require("./routes/posts");
const userRoutes=require("./routes/user")
const app = express();
//072iBgd5TS6KIZLb


mongoose.connect("mongodb+srv://Prachi:"+ process.env.Mongo_Atlas_PW +"@cluster0.glnqh.mongodb.net/node-angular?retryWrites=true&w=majority",
 {
   useNewUrlParser: true,
  useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
   })
.then(()=>{
  console.log("connected to db....");
}).catch(()=>{
  console.log("connection failed");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));//any request targrting to /images will allowed to continues and fetch theri files

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/posts",postRoutes);
app.use("/api/user",userRoutes);
module.exports = app;
