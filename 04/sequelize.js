(async () => {
  const Sequelize = require("sequelize");
  const Op = Sequelize.Op;
  // 建立连接
  const sequelize = new Sequelize('test04', 'root', 'milkPF711.', {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false // 仍可通过传入 operators map 至operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
  });
  // 定义模型
  const Fruit = sequelize.define("Fruit", {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  let ret = await Fruit.sync();

  // ret = await Fruit.create({
  //   name: '香蕉',
  //   price: 3.5
  // })

  // console.log('create', ret);

  // await Fruit.update({
  //   price: 4
  // }, {
  //   where: {
  //     name: '香蕉'
  //   }
  // })

  ret = await Fruit.findAll({
    where: {
      price: {
        [Op.lt]: 5,
        [Op.gt]: 2
      }
    }
  })

  console.log('select', JSON.stringify(ret));
})()