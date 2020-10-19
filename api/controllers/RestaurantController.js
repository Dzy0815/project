/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */




module.exports = {
    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('restaurant/create');

        var restaurant = await Restaurant.create(req.body).fetch();

        return res.status(201).json({ id: restaurant.id });
    },
    // action - list
    list: async function (req, res) {

        var everyones = await Restaurant.find();

        return res.view('restaurant/list', { restaurant: everyones });
    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var thatRestaurant = await Restaurant.findOne(req.params.id);

            if (!thatRestaurant) return res.notFound();

            return res.view('restaurant/update', { restaurant: thatRestaurant });

        } else {

            var updatedRestaurant = await Restaurant.updateOne(req.params.id).set(req.body);

            if (!updatedRestaurant) return res.notFound();

            return res.ok();
        }
    },

    // action - delete 
    delete: async function (req, res) {

        var deletedRestaurant = await Restaurant.destroyOne(req.params.id);

        if (!deletedRestaurant) return res.notFound();

        return res.ok();
    },

    // json function
    json: async function (req, res) {

        var everyones = await Restaurant.find();

        return res.json(everyones);
    },

    searchRegion: async function (req, res) {
    
        
        var thoseHKIslandRestaurants = await Restaurant.find({
            where: {region : 'HK Island'},
            sort: 'updatedAt',limit:2
        });

        var thoseKowloonRestaurants = await Restaurant.find({
            where: {region : 'Kowloon'},
            sort: 'updatedAt',limit:2
        });

        var thoseNewTerritoriesRestaurants = await Restaurant.find({
            where: {region : 'New Territories'},
            sort: 'updatedAt',limit:2
        });
        
        return res.view('restaurant/homepage', { HKrestaurant: thoseHKIslandRestaurants , KLrestaurant: thoseKowloonRestaurants , NTrestaurant: thoseNewTerritoriesRestaurants });
    },


};

