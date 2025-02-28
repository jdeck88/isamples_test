# Sample Metadata Validator Service

This service validates sample metadata by checking the required fields:

- `materialSampleId`
- `decimalLatitude`
- `decimalLongitude`
- `institutionCode`
- `sampleEnteredBy`
- `rights`

## Usage

### 1️⃣ **Start the Service**
Simply open `index.html` in a browser. It will register a service worker to handle POST requests.

### 2️⃣ **Submit Data Using cURL**
You can send JSON data using `cURL`:

#### ✅ **Valid Data (Blue Ribbon)**
```sh
curl -X POST http://localhost:3000/validate \
     -H "Content-Type: application/json" \
     -d '{
           "materialSampleId": "123",
           "decimalLatitude": "45.1234",
           "decimalLongitude": "-122.1234",
           "institutionCode": "XYZ",
           "sampleEnteredBy": "John Doe",
           "rights": "Public Domain"
         }'
