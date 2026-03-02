import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var dayOfWeek = "Weekend";
var tagLine = "have fun";

//app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const d = new Date();
    const day = d.getDay();

    if (day === 0 || day === 6) {
        dayOfWeek = "Weekend";
        tagLine = "have fun!";
    }else {
        dayOfWeek = "Weekday";
        tagLine = "work hard!";
    }

    res.render(__dirname + "/views/index.ejs", {dayOfWeek: dayOfWeek, tagLine: tagLine});
});


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});