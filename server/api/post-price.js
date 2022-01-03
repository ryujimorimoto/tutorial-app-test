import { client } from "../db-server"

export default function getPrice(ctx) {
  console.log("======= POST api/post-price =======");
  try {
    const { price } = ctx.request.body;
    const query = {
      text: "INSERT INTO histories(new_price) VALUES ($1)",
      values: [price]
    };
    Promise.resolve(client.query(query));
    ctx.body = "ok";
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
}
