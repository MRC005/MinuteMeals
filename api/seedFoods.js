// const mongoose = require('mongoose');
// const Food = require('./model/foodModel');

// mongoose.connect('mongodb+srv://machumroychoudhury2023:1234@cluster1.6vytpgi.mongodb.net/minutemeals?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


// const foods = [
//     {
//         name: "Greek salad",
//         image: "food_1.png",
//         price: 120,
//         description: "A refreshing blend of crisp veggies, olives, and feta for a light, healthy meal.",
//         category: "Salad",
//         isBestSeller: true,
//         offer: "20% OFF",
//         isVeg: true,
//         stock: 8,
//         rating: 4.7
//     },
//     {
//         name: "Veg salad",
//         image: "food_2.png",
//         price: 90,
//         description: "Colorful garden vegetables tossed in a zesty house dressing.",
//         category: "Salad",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 6,
//         rating: 4.2
//     },
//     {
//         name: "Clover Salad",
//         image: "food_3.png",
//         price: 100,
//         description: "A unique salad featuring fresh greens and a tangy vinaigrette.",
//         category: "Salad",
//         isBestSeller: false,
//         offer: "10% OFF",
//         isVeg: true,
//         stock: 5,
//         rating: 4.0
//     },
//     {
//         name: "Chicken Salad",
//         image: "food_4.png",
//         price: 150,
//         description: "Tender chicken with crisp lettuce and a creamy dressing.",
//         category: "Salad",
//         isBestSeller: true,
//         offer: null,
//         isVeg: false,
//         stock: 9,
//         rating: 4.8
//     },
//     {
//         name: "Lasagna Rolls",
//         image: "food_5.png",
//         price: 180,
//         description: "Classic lasagna flavors rolled up for a fun twist on tradition.",
//         category: "Rolls",
//         isBestSeller: false,
//         offer: "15% OFF",
//         isVeg: true,
//         stock: 10,
//         rating: 4.3
//     },
//     {
//         name: "Peri Peri Rolls",
//         image: "food_6.png",
//         price: 160,
//         description: "Spicy peri peri sauce wrapped with fresh veggies in a soft roll.",
//         category: "Rolls",
//         isBestSeller: true,
//         offer: null,
//         isVeg: true,
//         stock: 7,
//         rating: 4.5
//     },
//     {
//         name: "Chicken Rolls",
//         image: "food_7.png",
//         price: 200,
//         description: "Juicy chicken filling in a golden, flaky wrap.",
//         category: "Rolls",
//         isBestSeller: false,
//         offer: null,
//         isVeg: false,
//         stock: 4,
//         rating: 4.1
//     },
//     {
//         name: "Veg Rolls",
//         image: "food_8.png",
//         price: 140,
//         description: "A medley of seasoned vegetables rolled in a soft flatbread.",
//         category: "Rolls",
//         isBestSeller: false,
//         offer: "10% OFF",
//         isVeg: true,
//         stock: 6,
//         rating: 4.0
//     },
//     {
//         name: "Ripple Ice Cream",
//         image: "food_9.png",
//         price: 80,
//         description: "Creamy vanilla ice cream swirled with ribbons of fruit syrup.",
//         category: "Deserts",
//         isBestSeller: true,
//         offer: "Buy 1 Get 1",
//         isVeg: true,
//         stock: 12,
//         rating: 4.9
//     },
//     {
//         name: "Fruit Ice Cream",
//         image: "food_10.png",
//         price: 90,
//         description: "Rich ice cream blended with chunks of real fruit.",
//         category: "Deserts",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 10,
//         rating: 4.2
//     },
//     {
//         name: "Jar Ice Cream",
//         image: "food_11.png",
//         price: 70,
//         description: "Delicious ice cream served in a jar for a modern treat.",
//         category: "Deserts",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 8,
//         rating: 3.9
//     },
//     {
//         name: "Vanilla Ice Cream",
//         image: "food_12.png",
//         price: 80,
//         description: "Classic vanilla flavor, smooth and satisfying.",
//         category: "Deserts",
//         isBestSeller: false,
//         offer: "5% OFF",
//         isVeg: true,
//         stock: 5,
//         rating: 4.0
//     },
//     {
//         name: "Chicken Sandwich",
//         image: "food_13.png",
//         price: 120,
//         description: "Grilled chicken breast layered with crisp veggies and sauces.",
//         category: "Sandwich",
//         isBestSeller: true,
//         offer: null,
//         isVeg: false,
//         stock: 7,
//         rating: 4.6
//     },
//     {
//         name: "Vegan Sandwich",
//         image: "food_14.png",
//         price: 100,
//         description: "A plant-based delight with fresh veggies and vegan spreads.",
//         category: "Sandwich",
//         isBestSeller: false,
//         offer: "10% OFF",
//         isVeg: true,
//         stock: 9,
//         rating: 4.3
//     },
//     {
//         name: "Grilled Sandwich",
//         image: "food_15.png",
//         price: 110,
//         description: "Toasted bread filled with melted cheese and savory fillings.",
//         category: "Sandwich",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 8,
//         rating: 4.1
//     },
//     {
//         name: "Bread Sandwich",
//         image: "food_16.png",
//         price: 90,
//         description: "A simple yet satisfying sandwich with soft bread and classic fillings.",
//         category: "Sandwich",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 10,
//         rating: 4.0
//     },
//     {
//         name: "Cup Cake",
//         image: "food_17.png",
//         price: 80,
//         description: "Moist, fluffy cupcakes topped with creamy frosting.",
//         category: "Cake",
//         isBestSeller: false,
//         offer: "15% OFF",
//         isVeg: true,
//         stock: 12,
//         rating: 4.4
//     },
//     {
//         name: "Vegan Cake",
//         image: "food_18.png",
//         price: 120,
//         description: "A soft, dairy-free cake perfect for any celebration.",
//         category: "Cake",
//         isBestSeller: true,
//         offer: null,
//         isVeg: true,
//         stock: 7,
//         rating: 4.7
//     },
//     {
//         name: "Butterscotch Cake",
//         image: "food_19.png",
//         price: 150,
//         description: "Rich butterscotch flavor in every bite of this decadent cake.",
//         category: "Cake",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 6,
//         rating: 4.0
//     },
//     {
//         name: "Sliced Cake",
//         image: "food_20.png",
//         price: 90,
//         description: "Classic cake slices in a variety of tempting flavors.",
//         category: "Cake",
//         isBestSeller: false,
//         offer: "10% OFF",
//         isVeg: true,
//         stock: 10,
//         rating: 4.2
//     },
//     {
//         name: "Garlic Mushroom",
//         image: "food_21.png",
//         price: 110,
//         description: "Mushrooms sautéed with garlic and herbs for a savory treat.",
//         category: "Pure Veg",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 8,
//         rating: 4.1
//     },
//     {
//         name: "Fried Cauliflower",
//         image: "food_22.png",
//         price: 120,
//         description: "Crispy cauliflower florets with a hint of spice.",
//         category: "Pure Veg",
//         isBestSeller: true,
//         offer: "10% OFF",
//         isVeg: true,
//         stock: 6,
//         rating: 4.5
//     },
//     {
//         name: "Mix Veg Pulao",
//         image: "food_23.png",
//         price: 100,
//         description: "Aromatic rice cooked with a blend of fresh vegetables.",
//         category: "Pure Veg",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 12,
//         rating: 4.0
//     },
//     {
//         name: "Rice Zucchini",
//         image: "food_24.png",
//         price: 110,
//         description: "Steamed rice tossed with zucchini and light seasoning.",
//         category: "Pure Veg",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 7,
//         rating: 3.9
//     },
//     {
//         name: "Cheese Pasta",
//         image: "food_25.png",
//         price: 150,
//         description: "Pasta in a rich, creamy cheese sauce.",
//         category: "Pasta",
//         isBestSeller: true,
//         offer: null,
//         isVeg: true,
//         stock: 10,
//         rating: 4.7
//     },
//     {
//         name: "Tomato Pasta",
//         image: "food_26.png",
//         price: 130,
//         description: "Pasta tossed in a tangy tomato sauce with herbs.",
//         category: "Pasta",
//         isBestSeller: false,
//         offer: "10% OFF",
//         isVeg: true,
//         stock: 8,
//         rating: 4.2
//     },
//     {
//         name: "Creamy Pasta",
//         image: "food_27.png",
//         price: 140,
//         description: "Smooth and creamy pasta for a comforting meal.",
//         category: "Pasta",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 7,
//         rating: 4.0
//     },
//     {
//         name: "Chicken Pasta",
//         image: "food_28.png",
//         price: 170,
//         description: "Tender chicken pieces mixed with pasta and savory sauce.",
//         category: "Pasta",
//         isBestSeller: true,
//         offer: null,
//         isVeg: false,
//         stock: 5,
//         rating: 4.6
//     },
//     {
//         name: "Buttter Noodles",
//         image: "food_29.png",
//         price: 120,
//         description: "Noodles tossed in butter and mild spices.",
//         category: "Noodles",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 9,
//         rating: 4.0
//     },
//     {
//         name: "Veg Noodles",
//         image: "food_30.png",
//         price: 110,
//         description: "Stir-fried noodles with a variety of fresh vegetables.",
//         category: "Noodles",
//         isBestSeller: false,
//         offer: "5% OFF",
//         isVeg: true,
//         stock: 10,
//         rating: 4.1
//     },
//     {
//         name: "Somen Noodles",
//         image: "food_31.png",
//         price: 140,
//         description: "Thin, delicate noodles served with a light broth.",
//         category: "Noodles",
//         isBestSeller: true,
//         offer: null,
//         isVeg: true,
//         stock: 6,
//         rating: 4.4
//     },
//     {
//         name: "Cooked Noodles",
//         image: "food_32.png",
//         price: 100,
//         description: "Classic cooked noodles, simple and delicious.",
//         category: "Noodles",
//         isBestSeller: false,
//         offer: null,
//         isVeg: true,
//         stock: 12,
//         rating: 4.0
//     }
// ];


// Food.insertMany(foods)
//     .then(() => {
//         console.log('Foods seeded');
//         mongoose.disconnect();
//     })
//     .catch(err => {
//         console.error(err);
//         mongoose.disconnect();
//     });
