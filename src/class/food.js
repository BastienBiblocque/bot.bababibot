const Supabase = require("./supabase");
const supabaseRequest = new Supabase();

class Food {
    async getFood(city) {
        const foods = await supabaseRequest.getFood(city).then((data) => {
            return data;
        });

        if (foods.length === 0) {
            return ' :x: Aucun restaurant trouvé pour cette ville.\n Vous pouvez en ajouter avec la commande `b! food add <ville> <restaurant>`.'
        }
        return foods[this.getRandomInt(foods.length)].restaurant;
    }

    async postFood(city, restaurant, created_by, server) {
        return await supabaseRequest.postFood(city, restaurant, created_by, server).then(() => {
            return true;
        }).catch(() => {
            return false;
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = Food;