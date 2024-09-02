import express, { urlencoded } from 'express'
import generateFile from './generateFile.js'
import executeCpp from './executeCpp.js'
import cors from 'cors'
const app=express()

app.use(express.json())
app.use(cors())
app.use(urlencoded({
    extended: true
}))
app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/run",async(req,res)=>{
    const {language="cpp",code}=req.body;
    if(code===undefined)
    {
        res.status(400).json({
            success:false,
            error:"Empty code body"
        })
    }
    try {
        
        const filePath=await generateFile(language,code)
        console.log(filePath);
        const output=await executeCpp(filePath)
        console.log(output);
        return res.json({filePath,output})
    } catch (error) {
        res.status(500).json({error})
    }

})
app.listen(5000,()=>{
    console.log('server is running on port 5000')
})