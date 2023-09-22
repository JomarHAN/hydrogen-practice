import { Suspense } from "react";
import Layout from "../components/Layout.server";
import { CacheLong, gql, useShopQuery } from "@shopify/hydrogen";
import ProductCard from "../components/ProductGriditem.server";

export default function Catalog() {
  const data = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
  });

  const {
    data: {
      products: { nodes },
    },
  } = data;

  return (
    <Layout>
      <Suspense>
        <div className="catalog-page container">
          <div className="product-grid">
            {nodes.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

const QUERY = gql`
  query products {
    products(first: 9) {
      nodes {
        title
        handle
        featuredImage {
          url
          altText
          height
          width
        }
        variants(first: 1) {
          nodes {
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
