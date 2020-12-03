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

  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);


  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await Restaurant.count() > 0) {
    return generateUsers();
  };

  await Restaurant.createEach([
    { expiarydate: "14-12-2020", title: "五折", restaurant: "元福", region: "HK Island", mall: "IFC Mall", image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", quota: 12, coins: 25, expirarydate: "", details: "" },
    { expiarydate: "23234", title: "sdc", restaurant: "sdfs", region: "Kowloon", mall: "Festval Walk", image: "asdaed", quota: 23, coins: 320, expirarydate: "", details: "" },
    { expiarydate: "14-12-2020", "title": "八达通优惠", restaurant: "aab", region: "Kowloon", mall: "Festval Walk", image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", quota: 12, coins: 25, expirarydate: "", details: "" },
    { expiarydate: "234", title: "sfsd", restaurant: "sdfstsa", region: "Kowloon", mall: "Harbour City", image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1525574275,4149085703&fm=26&gp=0.jpg", quota: 23, coins: 34, expirarydate: "", details: "" },
    

    // etc.
  ]);

  return generateUsers();


  async function generateUsers() {
    
    if (await User.count() > 0) {
      return;
    }

    var hash = await sails.bcrypt.hash('12345', salt);

    await User.createEach([
      { username: "tony", password: hash, usertype: "admin" },
      { username: "jackey", password: hash, usertype: "member", coins : 1000 },
    ]);

    const 元福 = await Restaurant.findOne({ restaurant: "元福" });
    const sdfs = await Restaurant.findOne({ restaurant: "sdfs" });
    //const tony = await User.findOne({ username: "tony" });
    const jackey = await User.findOne({ username: "jackey" });
    const aab= await Restaurant.findOne({restaurant: "aab"});
    const sdfsw= await Restaurant.findOne({restaurant: "sdfsw"});

    // await User.addToCollection(jackey.id, 'orders').members(元福.id);
    // await User.addToCollection(jackey.id, 'orders').members(sdfs.id);
    await User.addToCollection(jackey.id, 'orders').members(aab.id);


  }


};
