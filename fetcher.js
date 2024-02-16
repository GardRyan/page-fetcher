//required modules
const http = require('http'); 
const fs = require('fs');
const path = require('path');
const readline = require('readline');

//readline interface with user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//information required to execute task
rl.question('Enter the URL: ', url => {
  rl.question('Enter the local file path: ', localFilePath => {
    rl.close();

   // Introduce a delay using setTimeout before making the HTTP request
    setTimeout(() => {
      const request = http.get(url, response => {
        if (response.statusCode !== 200) {
          console.error(`Error: Failed to fetch the resource. Status code: ${response.statusCode}`);
          process.exit(1);
        }

   
        const file = fs.createWriteStream(localFilePath);

        let byteSize = 0;
        response.on('data', chunk => {
          byteSize += chunk.length;
        });

      
        response.on('end', () => {
          file.end();
          console.log(`Downloaded and saved ${byteSize} bytes to ${localFilePath}`);
        });

       
        response.pipe(file);
      });

      request.on('error', err => {
        console.error(`Error: ${err.message}`);
      });
    }, 1000); 
  });
});
