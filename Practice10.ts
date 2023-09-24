// import http, { IncomingMessage, ServerResponse } from "http";
// interface iData {
//   id: number;
//   name: string;
// }

// interface iMessage {
//   message: string;
//   success: boolean;
//   data: null | {}[] | [];
// }

// let data: iData[] = [
//   {
//     name: "Tobi",
//     id: 1,
//   },
//   {
//     name: "Ayo",
//     id: 2,
//   },
//   {
//     name: "Ekene",
//     id: 3,
//   },
// ];

// const server = http.createServer(
//   (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
//     res.setHeader("content-type", "Application/JSON");
//     const Container: any = [];
//     let status = 404;

//     let response: iMessage = {
//       message: "Failed successfully",
//       success: false,
//       data: null,
//     };

//     req
//       .on("data", (chunk: any) => {
//         Container.push(chunk);
//       })
//       .on("end", () => {
//         const { method, url } = req;

//         if (method === "GET" && url === "/") {
//           status = 200;
//           response.message = "Successfully successful";
//           response.success = true;
//           response.data = data;
//           res.write(JSON.stringify({ response, status }));
//           res.end();
//         }
//         if (url === "/" && method === "POST") {
//           status = 201;
//           response.message = "Updated";
//           response.success = true;
//           response.data = data;

//           const input = JSON.parse(Container);
//           data.push(input);
//           res.write(JSON.stringify({ response, status }));
//           res.end();
//         }

//         if (method === "PATCH") {
//           const useless: any = url?.split("/")[1];
//           const useful = parseInt(useless);
//           const input = JSON.parse(Container);
//           const check = data.some((el) => el.id === useful);

//           if (check === false) {
//             res.write(JSON.stringify({ response, status }));
//             res.end();
//           } else {
//             data = data.map((el) => {
//               if (el.id === useful) {
//                 return {
//                   id: el.id,
//                   name: input.name,
//                 };
//               }
//               return el;
//             });

//             response.message = "patched";
//             response.data = data;
//             response.success = true;
//             res.write(JSON.stringify({ response, status }));
//             res.end();
//           }
//         }
//       });
//   }
// );

// server.listen(1000, () => {
//   console.log("1");
// });
import http, { IncomingMessage, ServerResponse } from "http";
interface iData {
  id: number;
  name: string;
}

interface iMessage {
  message: string;
  success: boolean;
  data: null | {}[] | [];
}

let data: iData[] = [
  {
    name: "Tobi",
    id: 1,
  },
  {
    name: "Ayo",
    id: 2,
  },
  {
    name: "Ekene",
    id: 3,
  },
];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("content-type", "Application/JSON");
    const Container: any = [];
    let status = 404;

    let response: iMessage = {
      message: "Failed successfully",
      success: false,
      data: null,
    };

    req
      .on("data", (chunk: any) => {
        Container.push(chunk);
      })
      .on("end", () => {
        const { method, url } = req;

        if (method === "GET" && url === "/") {
          status = 200;
          response.message = "Successfully successful";
          response.success = true;
          response.data = data;
          res.write(JSON.stringify({ response, status }));
          res.end();
        }
        if (url === "/" && method === "POST") {
          status = 201;
          response.message = "Updated";
          response.success = true;
          response.data = data;

          const input = JSON.parse(Container);
          data.push(input);
          res.write(JSON.stringify({ response, status }));
          res.end();
        }

        if (method === "PATCH") {
          const useless: any = url?.split("/")[1];
          const useful = parseInt(useless);
          const input = JSON.parse(Container);
          const check = data.some((el) => el.id === useful);

          if (check === false) {
            res.write(JSON.stringify({ response, status }));
            res.end();
          } else {
            data = data.map((el) => {
              if (el.id === useful) {
                return {
                  id: el.id,
                  name: input.name,
                };
              }
              return el;
            });

            response.message = "patched";
            response.data = data;
            response.success = true;
            res.write(JSON.stringify({ response, status }));
            res.end();
          }
        }
      });
  }
);

server.listen(1000, () => {
  console.log("1");
});
