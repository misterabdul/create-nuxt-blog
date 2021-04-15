import { get, RequestOptions } from "https";
import fs from "fs";
import path from "path";

export function downloadBlogBoilerplate(): Promise<Buffer> {
  return downloadFromURL(
    `https://github.com/misterabdul/nuxt-blog-boilerplate/archive/refs/tags/latest.zip`
  );
}

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

export function downloadToFile(
  url: string,
  folder: string,
  fileName: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const fileStream = fs.createWriteStream(folder + path.sep + fileName);

    fileStream
      .on("open", () => {
        get(url, (res) => {
          res.on("error", (err) => {
            reject(err);
          });

          res.pipe(fileStream);
        });
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("finish", () => {
        resolve();
      });
  });
}

export function createDir(folder: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const exist: boolean = fs.existsSync(folder);
    if (!exist) {
      fs.mkdirSync(folder);
    }

    resolve();
  });
}
