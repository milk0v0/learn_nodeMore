const add = (x, y) => x + y;
const square = z => z * z;

// const fn = (x, y) => square(add(x, y));

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));

// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args);
//   other.forEach(fn => {
//     ret = fn(ret);
//   });
//   return ret
// }

// const fn = compose(add, square, square);

// console.log(fn(1, 2));

// 异步处理
// 俄罗斯套娃

function compose(middlewares) {
  return () => {
    return dispatch(0)
  }
}

async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}
async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}
function fn3(next) {
  console.log("fn3");
}