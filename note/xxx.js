function mySettimeout(fn, t) {
  let timer = null;
  function setinterval() {
    fn();
    timer = setTimeout(setinterval, t);
  }
  setinterval();
  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
}

function myInstanceof(left, right) {
  while (true) {
    if (left === null) {
      return false;
    }
    if (left.__proto__ === right.prototype) {
      return true;
    }

    left = left.__proto__;
  }
}
