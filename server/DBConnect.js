const mongoose = require("mongoose");

function DBConnect() {
    mongoose.connect("mongodb+srv://prashadh:UZqnWkGqROiTsRs8@cluster0.w1uwrvn.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0", {
    }).then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.error("Error connecting to DB:", err.message);
    });
}

module.exports = DBConnect;
