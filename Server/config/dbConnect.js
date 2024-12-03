import  {mongoose}  from "mongoose";


export const dbConnection = () =>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })
}