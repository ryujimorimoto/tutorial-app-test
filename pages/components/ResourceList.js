import { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';
import {
  Card,
  ResourceList,
  Spinner,
  Stack,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris';
import ApplyRandomPrices from './ApplyRandomPrices';

const GET_PRODUCTS_BY_ID = gql`
  query getProductsById($ids: [ID!]!) {
    nodes(ids: $ids) {
      ...ProductListFragment
    }
  }
  fragment ProductListFragment on Product {
    title
    handle
    descriptionHtml
    id
    images(first: 1) {
      edges {
        node {
          originalSrc
          altText
        }
      }
    }
    variants(first: 1) {
      edges {
        node {
          id
          price
        }
      }
    }
  }
`
export default function ResourceListWithProducts() {
  const [selectedItems, setSelectedItems] = useState([]);
  return(
    <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get('ids') }}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <Spinner size="large" />;
        if (error) return <>Error :({error.message})</>;

        return (
          <>
          <Card>
          <ResourceList // Defines your resource list component
            showHeader
            resourceName={{ singular: 'Product', plural: 'Products' }}
            items={data.nodes}
            selectable
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            renderItem={item => {
              const media = (
                <Thumbnail
                  source={
                    item.images.edges[0]
                      ? item.images.edges[0].node.originalSrc
                      : ''
                  }
                  alt={
                    item.images.edges[0]
                      ? item.images.edges[0].node.altText
                      : ''
                  }
                />
              );
              const price = item.variants.edges[0].node.price;
              return (
                <ResourceList.Item
                  id={item.variants.edges[0].node.id}
                  media={media}
                  accessibilityLabel={`View details for ${item.title}`}
                  onClick={() => {
                    store.set('item', item);
                  }}
                >
                  <Stack>
                    <Stack.Item fill>
                      <h3>
                        <TextStyle variation="strong">
                          {item.title}
                        </TextStyle>
                      </h3>
                    </Stack.Item>
                    <Stack.Item>
                      ¥{price}
                    </Stack.Item>
                  </Stack>
                </ResourceList.Item>
              );
            }}
          />
          </Card>
          <ApplyRandomPrices selectedItems={selectedItems} setSelectedItems={setSelectedItems} onUpdate={refetch} />
        </>
      );
      }}
    </Query>
  )
}
