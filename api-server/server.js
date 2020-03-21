const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin : "http://localhost:8081"
}
const db = require('./models');
const Role = db.role;
const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.json({message : "Welcome to my application !!"});
})

db.mongoose
    .connect(`mongodb://root:root@localhost:27017/db_whow`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

 const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
        new Role({
            name: "user"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'user' to roles collection");
        });

        new Role({
            name: "moderator"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }

            console.log("added 'moderator' to roles collection");
        });

        new Role({
            name: "admin"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }

            console.log("added 'admin' to roles collection");
        });
        }
    });
}

require('./routers/auth.routes')(app);
require('./routers/user.routes')(app);

app.listen(8081, ()=>{
    console.log("start server successfull !!")
})