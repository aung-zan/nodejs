// async code and promise

const fetch = callback => {
  callback("testing");
  setTimeout(() => {
    callback("Hello after 1.5 seconds delay");
  }, 1500);
}

setTimeout(() => {
  console.log("Hello after 2 seconds delay");

  fetch(text => {
    console.log(text);
  })
}, 2000);

console.log("Hello no delay");
console.log("Hello world");

