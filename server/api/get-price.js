import { client } from "../db-server";

export default async function getPrice(ctx) {
  console.log("======= GET api/get-price =======");
  try {
    const query = {
      text: "SELECT * FROM histories",
    };
    const res = await Promise.resolve(client.query(query))
    ctx.body = res.rows;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
}
