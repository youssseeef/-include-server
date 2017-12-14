//This is the main app file.
//should only hook the routes and run the server
app = require('./api/api.js');
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));