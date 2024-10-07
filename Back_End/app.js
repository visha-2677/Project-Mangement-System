const express=require("express");
const database=require("./config/database");
const cors=require("cors")
const {errorHandler}=require("./middlewares/errorHandler");
const { cloudinaryConnect } = require("./config/cloudinary");
require("dotenv").config();


(async ()=>{
    try{
        const PORT=process.env.PORT || 4000;

        //initialize express application
        const app=express();

        // Add the middleware to parse JSON bodies from all api request
        app.use(express.json());
        // this middleware using express to parse complex, nested URL-encoded form data while limiting the request body size to 100MB to prevent excessive payloads.
        app.use(express.urlencoded({
            extended: true,
            limit: '100mb'
        }));

        //use this middleware to front end application for excess the back end api request for that use cors (Same Origin Policy)
        //if not use than front end are not excess api 
        app.use(
            cors({
                // frontend url to connect backend using cors
                origin:"http://localhost:4200",
                credentials:true,
            })
        )

        //first response file are save server side temp dir than get this file using req.files to excess it and using this parse the (multipart/form-data) 
        // app.use(
        //     fileUpload({
        //         useTempFiles:true,
        //         tempFileDir:os.tmpdir(),
        //     })
        // )
        
        //data base connection of mongodb
        await database.connect();

        //cloudinary database connection
        cloudinaryConnect();
        
        app.use(process.env.BASE_URL+"/auth",require("./routes/user.route"));
        app.use(process.env.BASE_URL+"/project",require("./routes/project.route"));

        app.get("/",(req,res)=>{
            return res.json({
                success:true,
                message:'--------------------- YOUR API SERVER IS RUNNING ------------------------',
            })
        })
        
        app.listen(PORT,()=>{
            console.info(`------------------------- APP IS RUNNING PORT ${PORT} ----------------------------`)
        })
        app.use(errorHandler);
    }
    catch(error){
        console.error(error);
		console.log("----------------- DB Error and Exit -----------------");
		process.exit(3); // DB not connect
    }
})();


