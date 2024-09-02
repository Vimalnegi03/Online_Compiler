import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v4 as uuid } from 'uuid';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the path to the "codes" directory
const dirCodes = path.join(__dirname, "codes");

// Ensure the "codes" directory exists, create it if it doesn't
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
const generateFile=async(format,content)=>{
const jobId=uuid()
const filename=`${jobId}.${format}`
const filePath=path.join(dirCodes,filename)
await fs.writeFileSync(filePath,content)
return filePath
}
export default generateFile