import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();
const port = 3000;
var num = 1;
var posts = [];

var date = new Date();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const post = {
        name: "daniel",
        local: "This is my  local",
        date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
        text: "Text goes right here"
    };
    posts.push(post);
    num++;
    res.render("index_2.ejs", {
        posts: posts
    });
    console.log(post);
    console.log(posts.length);
    console.log(posts);
});

app.get("/submit", (req, res) =>{
    res.render("index3.ejs");
});

app.post("/newPost", (req, res) => {
    const post = {
        name: req.body["name"],
        local: req.body["local"],
        date: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
        text: req.body["text"]
    }
    posts.push(post);
    res.render("index_2.ejs", {
        posts: posts
    });
});

app.listen(port, () => {
    console.log(`Listen to the port ${port}`);;
});