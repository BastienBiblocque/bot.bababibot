class Food {
    data = {
        'nancy': ['Burger King', 'Waffle Factory', 'Poutine', 'Nemo'],
        'metz': ['Burger King', 'Waffle Factory', 'Woko', 'Kefan', 'Colombus', 'Poutine', 'Ayako Sushi', 'Tacos'],
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