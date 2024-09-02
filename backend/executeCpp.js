import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, input = "") => {
  const jobId = path.basename(filepath, ".cpp");
  const exePath = path.join(outputPath, `${jobId}.exe`);
  const inputPath = path.join(outputPath, `${jobId}.txt`);

  // Write the input to a temporary file
  fs.writeFileSync(inputPath, input);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${exePath} && ${exePath} < ${inputPath}`,
      (error, stdout, stderr) => {
        // Clean up the temporary input file
        fs.unlinkSync(inputPath);

        if (error) {
          console.error('Execution error:', error);
          return reject({ error, stderr });
        }
        if (stderr) {
          console.error('Compilation stderr:', stderr);
          return reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

export default executeCpp;
