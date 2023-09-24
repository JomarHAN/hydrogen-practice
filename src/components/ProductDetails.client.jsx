import {
  AddToCartButton,
  Image,
  ProductOptionsProvider,
  ProductPrice,
  useProductOptions,
} from "@shopify/hydrogen";

export default function ProductDetails({ product }) {
  return (
    <ProductOptionsProvider data={product}>
      <Image
        data={product.media.nodes[0].image}
        className="product-page-image"
      />
      <ProductForm product={product} />
    </ProductOptionsProvider>
  );
}

function ProductForm({ product }) {
  const { options, selectedOptions, selectedVariant, setSelectedOption } =
    useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  return (
    <div>
      <h1>{product.title}</h1>
      <ProductPrice
        className="product-page-price"
        data={product}
        withoutTrailingZeros
        variantId={selectedVariant.id}
      />

      <div className="product-options">
        {options.map(({ name, values }) => {
          if (values.length === 1) {
            return null;
          }
          return (
            <div key={name} className="product-option-group">
              <legend className="product-option-name">{name}</legend>
              {values.map((value) => {
                const id = `option-${name}-${value}`;
                const checked = selectedOptions[name] === value;
                return (
                  <div key={value} className="product-option-value">
                    <input
                      id={id}
                      type="radio"
                      checked={checked}
                      name={name}
                      value={value}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    <label htmlFor={id}>{value}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <AddToCartButton disabled={isOutOfStock} className="add-to-cart">
        {isOutOfStock ? "Out of stock" : "Add to cart"}
      </AddToCartButton>

      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>
    </div>
  );
}
