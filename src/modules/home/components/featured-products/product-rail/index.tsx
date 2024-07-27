import { retrievePricedProductById } from "@lib/data"
import { Region } from "@medusajs/medusa"

import ProductSwiper from "./components/product-swiper";

import InteractiveLink from "@modules/common/components/interactive-link"
import { ProductPreviewType, ProductCollectionWithPreviews } from "types/global"

interface ProductRail {
  collection: ProductCollectionWithPreviews;
  region: Region;
}

const fetchPricedProducts = async (products: ProductPreviewType[], region: Region) => {
  return await Promise.all(
    products.map(async (product) => {
      const pricedProduct = await retrievePricedProductById({
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
    <div className="flex flex-col px-[clamp(1.6rem,calc(1.6rem+(56)*((100vw-428px)/(1920-428))),5.33333rem)] my-[40px] bg-[#ffffff]
        [@media(min-width:780px)]:mt-[80px] [@media(min-width:780px)]:mb-[80px]">
      <div className="section-layout-heading flex justify-between">
        <div className='section-layout-heading-text'>
          <h1 className="section_title">{collection.title}</h1>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>

      <div>
        <section className="mx-[clamp(-5.33333rem,16.0643px-1.6rem-3.75335vw,-1.6rem)]">
          <ProductSwiper pricedProducts={pricedProducts} region={region} />
        </section>
      </div>
    </div>
  )
}
