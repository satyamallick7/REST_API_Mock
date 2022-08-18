const express = require("express")

const router = express.Router()

const Model = require("../model/model")


//these routers are taking the route as the first parameter and callback as the second.
//callbacks has res and req where we use res to send response to client and use req to recieve request from client.


//saving the data uing data.sava() and storing it in the variable dataToSave

router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get("/getAll", async (req, res)=>{
    
    try {
        const data = await Model.find()
        res.json(data)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get("/getOne/:id", async (req, res)=>{
    try {
        const data = await Model.findById(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.patch("/update/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const updateData = req.body
        const option = {new: true}
        const result = Model.findByIdAndUpdate(id,updateData, option)
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} is deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router