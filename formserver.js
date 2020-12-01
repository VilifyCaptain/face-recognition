const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors=require("cors");
const path=require('path');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pundir@98',
    database: 'faceapp'
});

console.log(__dirname);


connection.connect((err) => {
    if (err) throw err;
    console.log("Connected....");
});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname,'/public/index.html'));
})


app.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/registerPage.html'));
})


app.get('/signin', (req,res)=>{
   res.sendFile(path.join(__dirname,'/public/signinPage.html'));
})


app.get('/signedin', (req,res)=>{
res.sendFile(path.join(__dirname,'/public/faceoption.html'));
})


app.get('/liveface',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/livefaceindex.html'));
})


app.get('/photoface',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/photofaceindex.html'));
})


app.post('/registration', (req, res) => {
     console.log(req.body);
    let name = req.body.name;
    // let rollNo = req.body.RollNo;
    // let mobile = req.body.contact;
    // let branch = req.body.branch;
    // let year = req.body.Year;
    let email = req.body.email;
    let password = req.body.password;
    let dob = req.body.dob;

    let query = "insert into `registration` (`name`, `email`, `password`,`dob`) values (' " + name + "','" + email + " ',' " + password + "','"+dob+" ' )";

    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("UNSUCESSFULL ATTEMPT");
            return;
        }
        else{
            res.sendFile(path.join(__dirname,'/public/index.html'));
            return;
        }
    });
    
    
})


app.listen(3000);

