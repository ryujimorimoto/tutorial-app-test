import { Page, Layout, EmptyState, TextStyle } from "@shopify/polaris";
import { useState } from 'react';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ResourceListWithProducts from "./components/ResourceList";
import store from 'store-js';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

export default function Index() {
  const [open, setOpen] = useState(false);
  const [emptyState, setEmptyState] = useState(!store.get('ids'));
  function handleSelection(resources) {
    setEmptyState(true);
    setOpen(false);
    console.log(resources);
    store.set('ids', resources.selection.map(({ id }) => id));
    setEmptyState(false);
  }
  return (
    <Page>
      <TitleBar
        title="Polaris"
        primaryAction={{
          content: 'Open Resource Picker',
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />
        {emptyState ?
          <Layout>
            <EmptyState
              heading="Welcome to your new Shopify store!"
              action={{
                content: "Select products",
                onAction: () => setOpen(true),
              }}
              image={img}
            >

            </EmptyState>
          </Layout>
        :
          <ResourceListWithProducts />
        }
    </Page>
  );
}
