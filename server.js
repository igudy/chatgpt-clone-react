const PORT = 8000
const express = require("express")
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

const API_KEY = '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';

// The below is a post request to the /completions api route
app.post('/completions', (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        }
    }
    

    try {
        
    } catch (error) {
        console.error(error);
    }
})




app.listen(PORT, () => console.log("Your server is running on PORT " + PORT))

