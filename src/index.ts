async function run() {
  console.log('hello world')
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
