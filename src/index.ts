import { help, version } from "./help";

async function run() {
  const args = process.argv.slice(2);

  if (help(args) || version(args)) return;
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
