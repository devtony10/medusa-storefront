import { retrievePricedProductById } from "@lib/data"
import { Region } from "@medusajs/medusa"

import ProductSwiper from "./components/product-swiper";

import InteractiveLink from "@modules/common/components/interactive-link"
import { ProductPreviewType, ProductCollectionWithPreviews } from "types/global"

interface ProductRail {
  collection: ProductCollectionWithPreviews;
  region: Region;
}

const fetchPricedProducts = (products: ProductPreviewType[], region: Region) => {
  return Promise.all(
    products.map(async (product) => {
      const pricedProduct = retrievePricedProductById({
        id: product.id,
        regionId: region.id,
      });
      return pricedProduct;
    })
  );
};

export default async function ProductRail({ collection, region }: ProductRail) {

  const { products } = collection

  if (!products) {
    return null
  }

  const pricedProducts = await fetchPricedProducts(products, region);

  if (!pricedProducts) {
    return null
  }

  return (
  <div className="css-1k4mxx6 exi01cl0">
    <div className="section-layout-heading flex justify-between">
      <div className='section-layout-heading-text'>
        <h1 className="section_title">{collection.title}</h1>
      </div>
      <InteractiveLink href={`/collections/${collection.handle}`}>
        View all
      </InteractiveLink>
    </div>

    <div>
      <section className="css-20k3s6 ecovu060">
        <ProductSwiper pricedProducts={pricedProducts} region={region} />
      </section>
    </div>
  </div>
  )
}
