const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require('./config/key');

require("./models/users");
require("./models/pensioners");
require("./models/pensionInfo");

mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/pensioners'));
app.use(require('./routes/pensionInfo'));
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});