/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */






module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");

        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username;
            req.session.usertype = user.usertype;
            req.session.coins = user.coins;
            req.session.number = user.id;
            return res.json(user);
        }

        // Start a new session for the new login user
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.usertype = user.usertype;
            req.session.coins = user.coins;
            req.session.number = user.id;
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");
        });
    },

    populate: async function (req, res) {

        var restaurant = await User.findOne(req.session.number).populate("orders");


        if (!restaurant) return res.redirect("/");

        return res.view('user/myredeem', { restaurant: restaurant.orders, user: restaurant });
    },

    add: async function (req, res) {

        if (req.wantsJSON) {

            if (!await User.findOne(req.session.number)) return res.status(404).json("User not found.");

            var thatUser = await User.findOne(req.session.number).populate("orders", { id: req.params.fk });
            var thatRestaurant = await Restaurant.findOne(req.params.fk);


            if (thatUser.orders.length > 0)
                return res.status(409).json("Already added.");   // conflict
            if (thatUser.coins - thatRestaurant.coins < 0)
                return res.status(410).json("No enough coins");
            if (thatRestaurant.quota = 0)
                return res.status(410).json("No enough quota");


            await User.addToCollection(req.session.number, "orders").members(req.params.fk);
            await User.updateOne(req.session.number).set({ coins: parseInt(thatUser.coins - thatRestaurant.coins) });
            await Restaurant.updateOne(req.params.fk).set({quota : parseInt(thatRestaurant.quota-1)});
            return res.status(204).send();
        } else {
            res.redirect("/")
        }
    },






};

