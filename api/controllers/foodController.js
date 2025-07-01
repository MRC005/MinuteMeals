const foodModel = require('../model/foodModel');
const fsPromises = require('fs').promises;
const path = require('path');

const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image_filename = req.file ? req.file.filename : '';

        if (!name || !description || !price || !category || !image_filename) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        await foodModel.create({
            name,
            description,
            price,
            category,
            image: image_filename
        });
        res.status(201).json({ success: true, message: "Food added" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching foods" });
    }
};

const removeFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await foodModel.findById(id);
        if (!food) return res.status(404).json({ success: false, message: "Food not found" });

        if (food.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'images', food.image);
            try {
                await fsPromises.unlink(imagePath);
            } catch (err) {
                console.log('Image deletion error:', err);
            }
        }

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting food" });
    }
};

module.exports = { addFood, listFood, removeFood };
