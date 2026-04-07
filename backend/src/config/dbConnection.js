import mongoose from 'mongoose'
export async function  connectDb(retries=3 ,delay = 1500){
    try {

       const connection =  await mongoose.connect(process.env.MONGO_URI);
       console.log("user sucessefully connected");
        
    } catch (error) {

        console.log("connection failed",error);
        if(retries === 0){
            console.log("all retries are finished exiting...");
        }

        console.log(`retrying in ${delay/1000} seconds`);

        setTimeout(()=>connectDb(retries-1,delay),delay);
        
    }
}