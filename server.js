import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());


const BASE = "https://api-edu.go.vn/ioe-service/v2/game";


async function forward(path, body) {
const res = await fetch(`${BASE}/${path}`, {
method: "POST",
headers: { "content-type": "application/json" },
body: JSON.stringify(body)
});
const text = await res.text();
try {
const data = JSON.parse(text);
return { status: res.status, ok: res.ok, data };
} catch {
return { status: res.status, ok: res.ok, data: { raw: text } };
}
}


app.post("/api/getinfo", async (req, res) => {
const r = await forward("getinfo", req.body);
res.status(r.status).json(r.data);
});


app.post("/api/startgame", async (req, res) => {
const r = await forward("startgame", req.body);
res.status(r.status).json(r.data);
});


app.post("/api/answercheck", async (req, res) => {
const r = await forward("answercheck", req.body);
res.status(r.status).json(r.data);
});


app.post("/api/finishgame", async (req, res) => {
const r = await forward("finishgame", req.body);
res.status(r.status).json(r.data);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listening on :${PORT}`));