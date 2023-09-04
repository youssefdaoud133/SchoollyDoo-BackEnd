const { spawn } = require("child_process");
const path = require("path");

const make = (dataToSend) => {
  return new Promise((resolve, reject) => {
    // Convert the data to a JSON string
    const dataString = JSON.stringify(dataToSend.excelData);

    // Get the absolute path to the Python script based on the location of this Node.js script

    const pythonScriptPath =
      dataToSend.option === "rightToLeft"
        ? path.join(__dirname, "", "RTL.py")
        : path.join(__dirname, "", "LTR.py");

    // Define the command to run your Python script with data as an argument
    const pythonProcess = spawn("python", [
      pythonScriptPath,
      dataString,
      dataToSend.schoolname,
      dataToSend.fontsize,
    ]);

    let resultData = ""; // To accumulate the stdout data

    // Listen for Python script output
    pythonProcess.stdout.on("data", (data) => {
      resultData += data.toString(); // Accumulate the data
    });

    // Listen for Python script errors
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python stderr: ${data}`);
      reject(data.toString()); // Reject the Promise if there are errors
    });

    // Listen for the Python script to exit
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        resolve(resultData); // Resolve the Promise with the accumulated data
      } else {
        console.error(`Python process exited with code ${code}`);
        reject(`Python process exited with code ${code}`);
      }
    });
  });
};

module.exports = make;
