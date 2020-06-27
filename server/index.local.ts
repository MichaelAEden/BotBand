require("dotenv").config();

import app from "./app/app";

const port = 9000;

app.listen(port, () => console.log(`Listening on port ${port}`));
