const express = require("express");
const authen = require("../middleware/authen");
const todo = require("../models/todo");
const router = express.Router();

router.get("/getAll", authen, async (req, res) => {
    const { user_id } = req.user;
    const listTodo = await todo.find({ userId: user_id });
    res.status(200).json(listTodo);

})

router.get("/get/:id", authen, async (req, res) => {
    const { user_id } = req.user;
    try {
        const getTodo = await todo.findOne({ _id: req.params.id, userId: user_id });
        console.log(getTodo);
        if (!getTodo)
            res.status(400).json({ message: "Not found" });
        res.status(200).json(getTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
)


router.post("/add", authen, async (req, res) => {
    const { title, description } = req.body;
    const { user_id } = req.user;

    const checkExist = await todo.findOne({ title: title, userId: user_id });
    if (checkExist)
        return res.status(400).json({ message: "Todo already exists" });


    const newTodo = new todo({
        title: title,
        description: description,
        userId: user_id,
    });
    newTodo.save().then((response) => {
        res.status(201).json(newTodo);
    }).catch((err) => {
        res.status(400).send("Todo created failed");
    })


})

router.put("/update/:id", authen, async (req, res) => {
    const { isCompleted } = req.body;

    const { user_id } = req.user;

    //update todo   
    const updateTodo = await todo.findOneAndUpdate({ _id: req.params.id, userId: user_id }, {
        isCompleted: isCompleted,
    }, { new: true });

    if (!updateTodo)
        res.status(400).send("Update todo failed");
    res.status(200).json({ message: "Update todo success" });

}
)

router.delete("/delete/:id", authen, async (req, res) => {
    const id = req.params.id;
    const { user_id } = req.user;

    const deleteTodo = await todo.findOneAndDelete({ _id: id, userId: user_id });
    if (!deleteTodo)
        res.status(400).send("Delete todo failed");
    res.status(200).json({ message: "Delete todo success" });
});

module.exports = router;


