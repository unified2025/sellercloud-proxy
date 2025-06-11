import express from "express";
import axios from "axios";
import getRawBody from "raw-body";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.post('/authenticate', async (req, res) => {
  try {
    const xml = await getRawBody(req, {
      length: req.headers["content-length"],
      limit: "1mb",
      encoding: true,
    });

    const response = await axios.post(
      "https://unifiedsolutions.ws.sellercloud.us/scservice.asmx",
      xml,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          'SOAPAction': '"http://api.sellercloud.com/Authenticate"'
        },
      }
    );

// Route for GetProductInfoBySerial
app.post("/get-product", async (req, res) => {
  try {
    const xml = await getRawBody(req, {
      length: req.headers["content-length"],
      limit: "1mb",
      encoding: true,
    });

    const response = await axios.post(
      "https://unifiedsolutions.ws.sellercloud.us/scservice.asmx",
      xml,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://api.sellercloud.com/GetProductInfoBySerial",
        },
      }
    );

    res.status(200).send(response.data);
  } catch (error) {
    console.error("❌ GetProduct Proxy Error:", error.message);
    res.status(500).send(error.response?.data || "Internal Server Error");
  }
});

// Route for WarehouseBin_Transfer
app.post("/transfer-bin", async (req, res) => {
  try {
    const xml = await getRawBody(req, {
      length: req.headers["content-length"],
      limit: "1mb",
      encoding: true,
    });

    const response = await axios.post(
      "https://unifiedsolutions.ws.sellercloud.us/scservice.asmx",
      xml,
      {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://api.sellercloud.com/WarehouseBin_Transfer",
        },
      }
    );

    res.status(200).send(response.data);
  } catch (error) {
    console.error("❌ Transfer Proxy Error:", error.message);
    res.status(500).send(error.response?.data || "Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
