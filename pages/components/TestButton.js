import { Button } from "@shopify/polaris";
import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: `${process.env.HOST}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function TestButton() {
  function getApi(){
    axios.post("/post-price", {
      price: "33.00",
    }).then(res => {
      console.log(res.data);
    });
  }
  return (
    <>
      <Button onClick={() => getApi()}>POST API</Button>
    </>
  )
}
