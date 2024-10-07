const fsAsync = require('fs/promises'); 

const makeDirectoryFunction=async (path)=>{
    if(path){
        try{
            await fsAsync.access(path); // Check if the directory exists
            return true;
        }
        catch(error){
            try{
                //recursive:true mean one dir in next dir created based on path like that /dir1/dir2..
                await fsAsync.mkdir(path,{recursive:true});
                return true;
            }
            catch(error){
                console.log(`Error While Creating Directory ${path}`,error);
            }
        }
    }
    return false;
}

module.exports={makeDirectoryFunction};