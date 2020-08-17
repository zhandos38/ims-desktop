const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");

// routers
const routeUser = require("./routes/user");
const routeInvoice = require("./routes/invoice");
const routeSupplier = require("./routes/supplier");
const routeProduct = require("./routes/product");
const routeBarcode = require("./routes/barcode");
const routeCategory = require("./routes/category");
const routeCustomer = require("./routes/customer");

const app = express();
const port = 4040;

// use the modules
app.use(cors());
app.use(bodyParser.json());

// use router
app.use("/user", routeUser);
app.use("/invoice", routeInvoice);
app.use("/supplier", routeSupplier);
app.use("/product", routeProduct);
app.use("/barcode", routeBarcode);
app.use("/category", routeCategory);
app.use("/customer", routeCustomer);

// starting the server
app.listen(port, () => console.log(`Server started, listening port: ${port}`));
