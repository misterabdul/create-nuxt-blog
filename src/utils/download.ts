import { get, RequestOptions } from "https";
import { bold } from "colorette";
import { Spinner } from "cli-spinner";

import { rimraf } from "./utils";
import { unZipBuffer } from "./unzip";

export const downloadBoilerplate = async (
  folder: string,
  step: string
): Promise<void> => {
  const loading = new Spinner(bold(`${step} Creating project...`));
  loading.setSpinnerString(18);
  loading.start();

  // 1. Remove dir
  rimraf(folder);

  // 2. Download starter
  const buffer = await downloadFromURL(
    `https://github.com/misterabdul/nuxt-blog-boilerplate/archive/refs/tags/latest.zip`
  );
  await unZipBuffer(buffer, folder);

  loading.stop(true);
};

function downloadFromURL(
  url: string,
  headers: RequestOptions = {}
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    get(url, headers, (res) => {
      if (res.statusCode === 302) {
        if ((res.headers?.location ?? null) !== null)
          downloadFromURL(res.headers.location).then(resolve, reject);
      } else {
        const data: any[] = [];

        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () => {
          resolve(Buffer.concat(data));
        });
        res.on("error", reject);
      }
    });
  });
}
