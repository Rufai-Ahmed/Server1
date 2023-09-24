import http, { IncomingMessage, ServerResponse } from "http";

const port: number = 4000;

interface iMessage {
  message: string;
  data: {}[] | null | [];
  success: boolean;
}

interface iData {
  id: number | null;
  class: number | null;
  name: string | null;
}

let intel: iData[] = [
  {
    id: 1,
    name: "Sylvia",
    class: 6,
  },
  {
    id: 2,
    name: "Godwin",
    class: 6,
  },
  {
    id: 3,
    name: "Victor",
    class: 6,
  },
  {
    id: 4,
    name: "Isaac",
    class: 6,
  },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("content-type", "Application/JSON");

    const { url, method } = req;

    const Container: any = [];
    let status = 404;

    const Response: iMessage = {
      message: "Failed to compile",
      data: null,
      success: false,
    };

    req
      .on("data", (chunk: any) => {
        Container.push(chunk);
      })
      .on("end", () => {
        if (url === "/" && method === "GET") {
          status = 200;
          Response.message = "Successful";
          Response.success = true;
          Response.data = intel;
          res.write(JSON.stringify({ Response, status }));
          res.end();
        }

        if (url === "/" && method === "POST") {
          status = 201;
          Response.success = true;
          Response.message = "Successfully updated";
          Response.data = intel;
          const body = JSON.parse(Container);
          intel.push(body);
          res.write(JSON.stringify({ Response, status }));
          res.end();
        }

        if (method === "PATCH") {
          const detail: any = url?.split("/")[1];
          let newData = JSON.parse(Container);
          let numbered = parseInt(detail);

          const check = intel.some((el) => {
            return el.id === numbered;
          });

          if (check === false) {
            status = 404;
            Response.message = "Failed to patch";
            Response.success = false;
            Response.data = null;
            res.write(JSON.stringify({ Response, status }));
            res.end();
          } else {
            let update = newData.name;
            let updateclass = newData.class;

            intel = intel.map((el: any) => {
              if (el.id === numbered) {
                return {
                  id: el.id,
                  name: update,
                  class: updateclass,
                };
              }
              return el;
            });

            status = 200;
            Response.data = intel;
            Response.message = "Patched";
            res.write(JSON.stringify({ Response, status }));
            res.end();
          }
        }

        if (method === "DELETE") {
          let rl: any = url?.split("/")[1];
          let parsed = parseInt(rl);

          let check = intel.some((el) => {
            return el?.id === parsed;
          });

          if (check === false) {
          } else {
            intel = intel.map((el: any) => {
              if (el?.id === parsed) {
                el = null;
              }
              return el;
            });
          }
          Response.data = intel;
          Response.message = "deleted successfully";
          Response.success = true;
          res.write(JSON.stringify({ Response, status }));
          res.end();
        }
      });
  }
);

server.listen(4000, () => {
  console.log("up!");
});
