import fs from "fs";
import util from "util";

import { bold } from "colorette";
import { Spinner } from "cli-spinner";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const writePackageJson = async (
  folder: string,
  step: string
): Promise<void> => {
  const loading = new Spinner(bold(`${step} Writing package.json...`));
  loading.setSpinnerString(18);
  loading.start();

  const packageString = await readFile(folder + "/package.json", "utf8");

  const packageJson = JSON.parse(packageString);
  packageJson.name = folder;
  packageJson.version = "1.0.0";
  delete packageJson.author;
  delete packageJson.description;
  const newPackageString = JSON.stringify(packageJson, null, 2);

  await writeFile(folder + "/package.json", newPackageString, "utf8");

  loading.stop(true);
};
