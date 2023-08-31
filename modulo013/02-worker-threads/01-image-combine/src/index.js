import { createServer } from "http";
import { parse, fileURLToPath } from "url";
import { Worker } from "worker_threads";

import sharp from "sharp";

import { dirname } from "path";
const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
        );
      }
      console.log(`the thread ${worker.threadid} exited!`);
    });
  });
}

async function handler(request, response) {
  if (request.url.includes("joinImages")) {
    const {
      query: { background, img },
    } = parse(request.url, true);
    const imgBase64 = await joinImages({
      image: img,
      background: background,
    });
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end(
      `<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imgBase64} /">`
    );
    return;
  }

  return response.end("ok");
}

createServer(handler).listen(3000, () => console.log("running at 3000"));

//https://pngimg.com/uploads/wolverine/wolverine_PNG1.png
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZktEMwr96gNzLHisHR_ur9FB3kEzyEkMUKQ&usqp=CAU

//https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3a63e2a0-ae27-4403-8484-7d0831588195/dcpkanc-e35b92e7-a669-4f7f-a3a5-c425df4aecf9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNhNjNlMmEwLWFlMjctNDQwMy04NDg0LTdkMDgzMTU4ODE5NVwvZGNwa2FuYy1lMzViOTJlNy1hNjY5LTRmN2YtYTNhNS1jNDI1ZGY0YWVjZjkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.btrAQ77DBQZWB-7D5YZchh3d_uZnzgX4DiG0yqvwJNo
//https://cdn.marvel.com/content/2x/hfg_xmen_0.jpg
