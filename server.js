const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.text({ type: 'text/xml' }));

app.post('/get-product', async (req, res) => {
  try {
    const response = await axios.post(
      'https://unifiedsolutions.ws.sellercloud.us/scservice.asmx',
      req.body,
      {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': '"http://api.sellercloud.com/GetProductInfoBySerial"',
          'Host': 'unifiedsolutions.ws.sellercloud.us',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.response?.data || error.message);
    res.status(500).send(error.response?.data || 'Internal server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});