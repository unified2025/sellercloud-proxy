const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.text({ type: 'text/xml' }));

app.post('/authenticate', async (req, res) => {
  try {
    const response = await axios.post(
      'http://unifiedsolutions.ws.sellercloud.us/scservice.asmx',
      req.body,
      {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': '"http://api.sellercloud.com/Authenticate"'
        }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Authentication error:', error.response?.data || error.message);
    res.status(500).send(error.response?.data || 'Internal server error');
  }
});

app.post('/get-product', async (req, res) => {
  try {
    const response = await axios.post(
      'https://unifiedsolutions.ws.sellercloud.us/scservice.asmx',
      req.body,
      {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': '"http://api.sellercloud.com/GetProductInfoBySerial"'
        }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('GetProductInfoBySerial error:', error.response?.data || error.message);
    res.status(500).send(error.response?.data || 'Internal server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
