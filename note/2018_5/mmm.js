function a(a) {
  console.log(a);
  return a + "a";
}
function b(b) {
  console.log(b);
  return b + "b";
}
function c(c) {
  console.log(c);
  return c + "c";
}
var funs = [a, b, c];

function compose(...fns) {
  if (fns.length === 0) {
    return (arg) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce(
    (prev, cur) =>
      (...args) =>
        prev(cur(...args))
  );
}

console.log(compose(a, b, c)("12"));
