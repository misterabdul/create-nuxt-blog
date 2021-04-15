import { help, version } from "./help";
import { initBlog } from "./create";

async function run(): Promise<void> {
  const args = process.argv.slice(2);

  if (help(args) || version(args)) return;

  return await initBlog();
}

(async () => {
  try {
    await run();
  } catch (e) {
    console.error(e);
  }
})();
