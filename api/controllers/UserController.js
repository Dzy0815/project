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
    
        if (!user) {
            alert("No such user")
         return res.redirect("/user/login");
        }
    
        if (user.password != req.body.password){ 
            alert("Wrong password!")
            return res.redirect("/user/login");
        }
    
        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username; 
            return res.json(user);
        }
        
        // Start a new session for the new login user
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = user.username;   
            return res.json(user);
        });
    },
  

};

