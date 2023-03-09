const { createClient } = require('@supabase/supabase-js')

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_TOKEN);

class Supabase {
    async postFood(city, restaurant, created_by) {
        console.log("postFood");
        await supabaseClient
            .from('food')
            .insert({city: city, restaurant: restaurant, created_by: created_by}).then((error) => {
                console.log(error)
            });
    }

    async getFood(city) {
        const { data, error } = await supabaseClient
            .from('food')
            .select('restaurant')
            .eq('city', city)
            .order('id', { ascending: false })
        if (error) {
            console.log(error);
        }
        return data;
    }
}

module.exports = Supabase;