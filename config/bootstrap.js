/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */


module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await Restaurant.count() > 0) {
    return;
  };

  await Restaurant.createEach([
    { "expiarydate": "14-12-2020", "createdAt": 1603109226574, "updatedAt": 1603109316504, "id": 3, "title": "五折", "restaurant": "元福", "region": "HK Island", "mall": "IFC Mall", "image": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", "quota": 12, "coins": 25, "expirarydate": "", "details": "", "_id": 3 },
    { "expiarydate": "23234", "createdAt": 1603109396647, "updatedAt": 1603109396647, "id": 4, "title": "sdc", "restaurant": "sdfs", "region": "Kowloon", "mall": "Festval Walk", "image": "asdaed", "quota": 23, "coins": 23, "expirarydate": "", "details": "", "_id": 4 },
    { "expiarydate": "14-12-2020", "createdAt": 1603192357529, "updatedAt": 1603192357529, "id": 5, "title": "八达通优惠", "restaurant": "aab", "region": "Kowloon", "mall": "Festval Walk", "image": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", "quota": 12, "coins": 25, "expirarydate": "", "details": "", "_id": 5 },
    { "expiarydate": "234", "createdAt": 1603212405481, "updatedAt": 1603212405481, "id": 6, "title": "sfsd", "restaurant": "sdfs", "region": "Kowloon", "mall": "Harbour City", "image": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", "quota": 23, "coins": 34, "expirarydate": "", "details": "", "_id": 6 },
    { "expiarydate": "23", "createdAt": 1603213162419, "updatedAt": 1603213162419, "id": 7, "title": "adasd", "restaurant": "sdfsw", "region": "HK Island", "mall": "Pacific Place", "image": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", "quota": 23, "coins": 43, "expirarydate": "", "details": "", "_id": 7 },
    { "createdAt": 1603213497080, "updatedAt": 1603213497080, "id": 8, "title": "sfsd", "restaurant": "问问", "region": "New Territories", "mall": "Tsuen Wan Plaza", "image": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", "quota": 23, "coins": 34, "expirarydate": "null", "details": "威风威风", "_id": 8 },

    // etc.
  ]);


};
