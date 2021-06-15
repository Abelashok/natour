/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

const fs=require('fs'); 
const  dotenv=require('dotenv');
const mongoose=require('mongoose');

const Tour=require('./../../../models/tourModel')
const User=require('./../../../models/userModel')
const Review=require('./../../../models/reviewModel')


dotenv.config({path: './config.env'});


mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
     // eslint-disable-next-line no-console
     console.log('DB connection successful');
 });

 //read json file

 const  tours=JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'));
 const  users=JSON.parse(fs.readFileSync(`${__dirname}/users.json`,'utf-8'));
 const  reviews=JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`,'utf-8'));
 //import data into database
 const importData=async ()=>{
     try{
      await Tour.create(tours);
      await User.create(users,{ validateBeforeSave:false});
      await Review.create(reviews);
      console.log('data successfully loaded');
      process.exit();
     }catch(err){
         console.log(err);
     }
 };
  //delete all data from collection
  const deleteData=async() =>{
    try{
        await Tour.deleteMany();
        await User.deleteMany();
         await Review.deleteMany();
        console.log('data successfully deleted');
        process.exit();
       }catch(err){
           console.log(err);
       } 
  }

if(process.argv[2]==='--import'){
    importData()
}else if(process.argv[2]==='--delete'){
    deleteData();
}

  console.log(process.argv);