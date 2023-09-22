import { Image, Money } from "@shopify/hydrogen";

export default function ProductCard({ product }) {
  const { price, compareAtPrice } = product.variants.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;
  return (
    <div className="product-grid-item">
      <div className="image-container">
        <Image
          alt={product.featuredImage.altText}
          data={product.featuredImage}
        />
      </div>
      <div className="product-grid-item-title">{product.title}</div>
      <div className="product-grid-prices">
        <Money withoutTrailingZeros data={price} />
        {isDiscounted && (
          <Money
            withoutTrailingZeros
            className="product-compare-at-price"
            data={compareAtPrice}
          />
        )}
      </div>
    </div>
  );
}
