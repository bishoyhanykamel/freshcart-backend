const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: './config.env' });

//////////////////////////////////////////////////
// Database connection
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then((con) => console.log('[Database]: connection successful'))
.catch(err => console.log('[Database]: connection error: ', err));

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Fresh cart back-end started, listening on port: ${PORT}`);
});
