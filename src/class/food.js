const Supabase = require("./supabase");
const supabaseRequest = new Supabase();

class Food {
    data = {
        'nancy': ['Burger King', 'Waffle Factory', 'Mon Caribou', 'Nemo', 'Voyou', 'Papa Fries', 'O Noodles', 'KFC', 'Tizi', 'Basilic & Co', 'Fox Den'],
        'metz': ['Burger King', 'Waffle Factory', 'Woko', 'Kefan', 'Colombus', 'Mon Caribou', 'Ayako Sushi', 'Tacos', 'Burritos', 'Au bureau'],
    }
    async getFood(city) {
        const foods = await supabaseRequest.getFood(city).then((data) => {
            return data;
        });

        console.log(foods);

        if (foods.length === 0) {
            return 'Ville inconnue';
        }

        return foods[this.getRandomInt(foods.length)].restaurant;
    }

    async postFood(city, restaurant, created_by) {
        await supabaseRequest.postFood(city, restaurant, created_by);
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = Food;