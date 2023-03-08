class Food {
    data = {
        'nancy': ['Burger King', 'Waffle Factory', 'Mon Caribou', 'Nemo', 'Voyou', 'Papa Fries', 'O Noodles', 'KFC', 'Tizi', 'Basilic & Co', 'Fox Den'],
        'metz': ['Burger King', 'Waffle Factory', 'Woko', 'Kefan', 'Colombus', 'Mon Caribou', 'Ayako Sushi', 'Tacos', 'Burritos', 'Au bureau'],
    }
    getFood(city) {
        if (!this.data[city]) {
            return 'Ville inconnue';
        }
        return this.data[city][this.getRandomInt(this.data[city].length)];
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = Food;