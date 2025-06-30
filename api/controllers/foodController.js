const foodModel = require('../model/foodModel');
const fsPromises = require('fs').promises;
const path = require('path');

const addFood = async (req, res) => {
    try {
        let image_filename = req.file ? req.file.filename : '';
        await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });
        res.status(201).json({ success: true, message: "Food added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching foods" });
    }
};

const removeFood = async (req, res) => {
    try {
        const { id } = req.query;
        const food = await foodModel.findById(id);
        if (!food) return res.status(404).json({ success: false, message: "Food not found" });

        if (food.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', food.image);
            try {
                await fsPromises.unlink(imagePath);
            } catch (err) {
                // Ignore if file does not exist
            }
        }

        await foodModel.deleteOne({ _id: id });
        res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting food" });
    }
};

module.exports = { addFood, listFood, removeFood };
