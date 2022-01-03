import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Layout, Button, Banner, Toast, Stack, Frame, Spinner, TextStyle } from '@shopify/polaris';

import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: `${process.env.HOST}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const UPDATE_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;


export default function ApplyRandomPrices({selectedItems = [], onUpdate = f => f, setSelectedItems = f => f}) {
  const [hasResults, setHasResults] = useState(false);
  const [newPriceList, setNewPriceList] = useState([]);

  useEffect(() => {
    getPrice();
  }, []);

  function postPrice(price){
    axios.post("/post-price", {price})
      .then(res => {
        console.log(res.data);
      });
  }
  function getPrice(){
    axios.get("/get-price")
      .then(res => {
        console.log(res.data);
        setNewPriceList(res.data);
      });
  }
  function variantUpdate({ handleSubmit = f => f, setHasResults = f => f }) {
    console.log("selectedItems", selectedItems);
    selectedItems.forEach( variantId => {
      console.log("variantId", variantId);
      const price = Math.random().toPrecision(3) * 10000;
      Promise.resolve( handleSubmit({
        variables: { input: { id: variantId, price, }},
      }));
      Promise.resolve(postPrice(price));
    })
    Promise.resolve(onUpdate().then(() => setHasResults(true) ));
    Promise.resolve(getPrice());
    setSelectedItems([]);
  }
  return (
    <>
    {newPriceList.map(({new_price, id}) => <TextStyle key={id} variation="subdued">{new_price} <br /></TextStyle>)}
    <Mutation mutation={UPDATE_PRICE}>
      {(handleSubmit, { loading, error, data }) => {
        if (loading) return <Spinner size="large" />;
        if (error) return <>Error :({error.message})</>;

        const showToast = hasResults && (
          <Toast
            content="Successfully updated"
            onDismiss={() => setHasResults(false)}
          />
        );
        return (
          <Frame>
            {showToast}
            <Layout.Section>
              <Stack distribution={"center"}>
                <Button
                  primary
                  textAlign={"center"}
                  onClick={() => variantUpdate({ handleSubmit, setHasResults })}
                >
                  Randomize prices
                </Button>
              </Stack>
            </Layout.Section>
          </Frame>
        );
      }}
    </Mutation>
      </>
  );

}
