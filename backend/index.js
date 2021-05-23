const express = require("express");
const cors = require("cors");
const db = require("./database/connection");
const bodyParser = require("body-parser");

const passengerRoutes = require("./routes/passenger");
const flightsRoutes = require("./routes/flights");
const checkoutRoutes = require("./routes/checkout");
const bookRoutes = require("./routes/book");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use("/passenger", passengerRoutes);
app.use("/book", bookRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/flights", flightsRoutes);

app.listen(5000, async () => {
  console.log("server has started on port 5000");
});
