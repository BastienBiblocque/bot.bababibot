const { createClient } = require('@supabase/supabase-js')

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_TOKEN);

class Supabase {
    async postFood(city, restaurant, created_by, server) {
        await supabaseClient
            .from('food')
            .insert({city: city, restaurant: restaurant, created_by: created_by, server: server}).then((error) => {
                const date = new Date();
                console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${error}`);
            });
    }

    async getFood(city) {
        const { data, error } = await supabaseClient
            .from('food')
            .select('restaurant')
            .eq('city', city)
            .order('id', { ascending: false })
        if (error) {
            const date = new Date();
            console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${error}`);
        }
        return data;
    }
}

module.exports = Supabase;