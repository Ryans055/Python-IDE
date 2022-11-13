import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { PythonShell } from 'python-shell';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "files")));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

// app.use("/", routes);
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/python", (req, res) => {
  console.log(req.text);
  fs.writeFile("temp/script.py", req.text, function (err) {
    if (err) throw err;
  });
  let allCode = "";

  PythonShell.run('temp/script.py', null, function(err, results) {
    if (err) throw err;
    results.forEach(result => {
      allCode += `${result}\n`
    });

    res.json(allCode);
  })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});