import Http from "http";

// curl -i -X POST -d '{}' localhost:3000
async function handler(req, res) {
  try {
    for await (const data of req) {
      await Promise.reject("error dentro do for!");
      res.end();
    }
  } catch (error) {
    console.log("has server error has happened");
    res.writeHead(500);
    res.write(JSON.stringify({ message: "internal server error!" }));
    res.end();
  }
}

Http.createServer(handler).listen(3000, () => console.log("running at 3000"));
