/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'RestaurantController.searchRegion',

  'GET /restaurant/create': 'RestaurantController.create',
  'POST /restaurant/create': 'RestaurantController.create',
  'GET /restaurant/update/:id': 'RestaurantController.update',
  'POST /restaurant/update/:id': 'RestaurantController.update',
  'POST /restaurant/delete/:id': 'RestaurantController.delete',
  'GET /restaurant/list': 'RestaurantController.list',
  'GET /restaurant/read/:id': 'RestaurantController.read',
  'GET /restaurant/search': 'RestaurantController.search',

  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /user/redeem': 'UserController.populate',
  'POST /user/addredeem/:fk': 'UserController.add',
  'POST /user/delete/:fk': 'UserController.delete',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
