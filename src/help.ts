import * as packageData from "../package.json";

export function help(args: string[]): boolean {
  const found = args.indexOf("--help") >= 0 || args.indexOf("-h") >= 0;

  if (found) {
    console.log(packageData.description);
    return true;
  }
}

export function version(args: string[]): boolean {
  const found = args.indexOf("--version") >= 0 || args.indexOf("-v") >= 0;

  if (found) {
    console.log(packageData.version);
    return true;
  }
}
