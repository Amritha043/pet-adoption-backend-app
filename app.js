const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// connection
mongoose.connect("mongodb://Amritha:Amritha043@ac-o22rub6-shard-00-00.trbtgpr.mongodb.net:27017,ac-o22rub6-shard-00-01.trbtgpr.mongodb.net:27017,ac-o22rub6-shard-00-02.trbtgpr.mongodb.net:27017/petdb?ssl=true&replicaSet=atlas-bu3c5t-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("MongoDB connected")
    }
).catch(
    (error) => {
        console.log(error)
    }
)

const PetAdoption = mongoose.model("adoption", new mongoose.Schema({
   booking_id: Number,
    pet_name: String,
    pet_type: String,
    breed: String,
    age: Number,
    weight_kg: Number,
    vaccination_status: String,
    owner_name: String,
    owner_email: String,
    owner_phone: String,
    check_in_date: String,
    check_out_date: String,
    kennel_number: String
}));

app.post("/add-adoption", async (req, res) => {
    await PetAdoption.create(req.body)
    res.json({ "status": "success" })
})

app.get("/view-adoption", async (req, res) => {
    const adoptions = await PetAdoption.find()
    res.json(adoptions)
})

app.listen(3003, () => {
    console.log("server started")
})