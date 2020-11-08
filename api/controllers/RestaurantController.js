/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const User = require("../models/User");









module.exports = {
    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('restaurant/create');

        var restaurant = await Restaurant.create(req.body).fetch();

        return res.redirect("/");
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

            return res.redirect("/restaurant/list");
        }
    },

    // action - delete 
    delete: async function (req, res) {

        var deletedRestaurant = await Restaurant.destroyOne(req.params.id);

        if (!deletedRestaurant) return res.notFound();

        return res.redirect("/restaurant/list");
    },

    // json function
    json: async function (req, res) {

        var everyones = await Restaurant.find();

        return res.json(everyones);
    },

    searchRegion: async function (req, res) {


        var thoseHKIslandRestaurants = await Restaurant.find({
            where: { region: 'HK Island' },
            sort: 'updatedAt', limit: 2
        });

        var thoseKowloonRestaurants = await Restaurant.find({
            where: { region: 'Kowloon' },
            sort: 'updatedAt', limit: 2
        });

        var thoseNewTerritoriesRestaurants = await Restaurant.find({
            where: { region: 'New Territories' },
            sort: 'updatedAt', limit: 2
        });

        var username = req.session.username;
        var usertype = req.session.usertype;

        return res.view('restaurant/homepage', { HKrestaurant: thoseHKIslandRestaurants, KLrestaurant: thoseKowloonRestaurants, NTrestaurant: thoseNewTerritoriesRestaurants, username: username, usertype: usertype });
    },

    // action - read
    read: async function (req, res) {

        var thatRestaurant = await Restaurant.findOne(req.params.id).populate("reserves", { id: req.session.number });
        var thatUser = req.session.number;
        var thatUsertype = req.session.usertype;

        if (!thatRestaurant) return res.redirect("/");

        return res.view('restaurant/read', { restaurant: thatRestaurant, user: thatUser, usertype: thatUsertype });
    },

    // action - paginate
    search: async function (req, res) {
        var count = await Restaurant.count();
        
        if (res.wantsJSON) {
            var whereClause = {};

            var region = req.query.region;
            var date = req.query.expirarydate;
            var prasedMaxCoins = parseInt(req.query.maxcoins);
            var prasedMinCoins = parseInt(req.query.mincoins);

            

            if (region != "region") whereClause.region = region;
            if (!isNaN(prasedMaxCoins)) whereClause.coins = { '<=': prasedMaxCoins };
            if (!isNaN(prasedMinCoins)) whereClause.coins = { '>=': prasedMinCoins };
            if (date != "not defined") whereClause.expirarydate <= date;


            var limit = Math.max(req.query.limit, 2) || 2;
            var offset = Math.max(req.query.offset, 0) || 0;

            var somerestaurant = await Restaurant.find({
                where: whereClause,
                limit: limit,
                skip: offset
            });

            

            return res.json({ restaurants: somerestaurant, numOfRecords: count });
        } else {
            return res.view("restaurant/search", { numOfRecords: count });
        }
    },

    listreserves: async function (req, res) {
        var thatRestaurant = await Restaurant.findOne(req.params.id).populate("reserves");

        return res.view("/restaurant/reserves", { restaurant: thatRestaurant })
    },


};

