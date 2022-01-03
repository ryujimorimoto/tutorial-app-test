import koaBody from "koa-body";
import getPrice from "./api/get-price";
import postPrice from "./api/post-price";

export default function appRouter(router) {
  router.get("/api/get-price", async (ctx) => getPrice(ctx));
  router.post("/api/post-price", koaBody(), async (ctx) => postPrice(ctx));
}
