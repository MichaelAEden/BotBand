require("dotenv").config();

import app from "./app/app";

// PORT env variable is provided by Heroku
const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Listening on port ${port}`));
