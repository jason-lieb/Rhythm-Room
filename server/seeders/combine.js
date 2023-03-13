const fs = require('fs')

// Create an empty array to store the JSON objects
const jsonList = []

// Loop through each file and load the JSON object into the array
for (let i = 1; i <= 10; i++) {
  const filename = `trackSeeds${i}.json`
  const jsonData = fs.readFileSync(filename, 'utf-8')
  jsonList.push(JSON.parse(jsonData))
}

// Write the array of JSON objects to a new file
const combinedData = JSON.stringify(jsonList)
fs.writeFileSync('combined.json', combinedData, 'utf-8')
