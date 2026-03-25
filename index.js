const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");

const app = express();

app.use(cors());
app.use(express.json());

async function getSheet(){

const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

await doc.useServiceAccountAuth(
JSON.parse(process.env.GOOGLE_CREDENTIALS)
);

await doc.loadInfo();

return doc.sheetsByIndex[0];

}

app.get("/data", async(req,res)=>{

const sheet = await getSheet();

const rows = await sheet.getRows();

res.json(rows);

});

app.post("/add", async(req,res)=>{

const sheet = await getSheet();

await sheet.addRow(req.body);

res.json("Row Added");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
