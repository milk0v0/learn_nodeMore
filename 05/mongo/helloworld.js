(async () => {
  const { MongoClient } = require('mongodb');

  // 创建客户端实例
  const client = new MongoClient(
    'mongodb://127.0.0.1:27017',
    {
      useNewUrlParser: true
    }
  );

  let ret = await client.connect();
  // console.log('connect', ret);

  const db = client.db('test');
  const fruits = db.collection('fruits');

  // 添加文档 - 增
  ret = await fruits.insertOne({
    name: '芒果',
    price: 20.1
  })
  console.log('insert', JSON.stringify(ret));

  // 查询
  ret = await fruits.findOne({
    name: '芒果'
  });
  console.log('find', JSON.stringify(ret));

  // 更新
  ret = await fruits.updateOne({
    name: '芒果'
  }, {
    $set: { name: '苹果' }
  })

  // 删除
  await fruits.deleteMany()
})()