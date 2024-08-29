"use client"

import { useParams } from "next/navigation";

import { addToCart } from "@modules/cart/actions"
import { onlyUnique } from "@lib/util/only-unique";

import { useEffect, useMemo, useRef, useState } from "react"

import { Region } from "@medusajs/medusa";
import { PricedProduct, PricedVariant } from "@medusajs/medusa/dist/types/pricing"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { SwiperOptions } from "swiper/types";

import isEqual from 'lodash/isEqual';

interface PricedProductProps {
    pricedProducts: (PricedProduct | null)[];
    region: Region;
}

const ProductSwiper: React.FC<PricedProductProps> = ({ pricedProducts, region }) => {

    const [options, setOptions] = useState<Record<string, Record<string, string>>>({});
    const [productId, setProduct] = useState<string>(pricedProducts[0]?.id!);
    const [isAdding, setIsAdding] = useState(false);

    const countryCode = useParams().countryCode as string;

    // initialize the option state
    useEffect(() => {
        const optionsObj: Record<string, Record<string, string>> = {}

        for (const product of pricedProducts) {
            for (const option of product?.options!) {
                Object.assign(optionsObj, { [product?.id!]: { [option.id]: undefined } })
            }
        }

        setOptions(optionsObj)
    }, [pricedProducts])

    // memoized record of the products' variants
    const variantRecords = useMemo(() => {
        const map: Record<string, Record<string, Record<string, string>>> = {};

        for (const product of pricedProducts) {
            const productVariants = product?.variants;
            map[product?.id!] = {};

            for (const variant of productVariants!) {
                if (!variant.options || !variant.id) continue;

                const temp: Record<string, string> = {};

                for (const option of variant.options) {
                    temp[option.option_id] = option.value;
                }

                map[product?.id!][variant.id] = temp;
            }
        }

        return map;
    }, [pricedProducts]);

    // todo: create memo for invalid variants/invariants

    // memoized function to check if the current options are a valid variant
    const variants = useMemo(() => {

        const result: Record<string, PricedVariant | undefined> = {};

        let variantId: string | undefined = undefined;

        for (const key of Object.keys(variantRecords[productId])) {

            if (isEqual(variantRecords[productId][key], options[productId])) {
                variantId = key
            }
        }

        if (variantId) {
            result[productId] = pricedProducts.find((p) => p?.id === productId)?.variants?.find((v) => v.id === variantId);
        }
        // else update invalid variants memo

        return result;
    }, [options, variantRecords, pricedProducts]);

    // if a product only has one variant, then select it
    useEffect(() => {
        const newOptions = { ...options }

        for (const product of pricedProducts) {
            if (product?.variants.length === 1 && product.variants[0].id) {
                newOptions[product?.id!] = variantRecords[product?.id!][product.variants[0].id]
            }
        }

        setOptions(newOptions)
    }, [pricedProducts, variantRecords])

    // update the options when a variant is selected for a product
    const updateOptions = (productId: string, update: Record<string, string>) => {
        setOptions({ ...options, [productId]: { ...options[productId], ...update } });
        setProduct(productId)
    };

    const inStock = useMemo(() => {
        const result: Record<string, boolean> = {}

        for (const product of pricedProducts) {
            const variant = variants[product?.id!]

            // If we don't manage inventory, we can always add to cart
            if (variant && !variant.manage_inventory) {
                result[product?.id!] = true
                continue
            }

            // If we allow back orders on the variant, we can add to cart
            if (variant && variant.allow_backorder) {
                result[product?.id!] = true
                continue
            }

            // If there is inventory available, we can add to cart
            if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
                result[product?.id!] = true
                continue
            }

            // Otherwise, we can't add to cart
            result[product?.id!] = false
        }

        return result
    }, [variants, pricedProducts])

    // add the selected variant to the cart
    const handleAddToCart = async () => {
        const variant = variants[productId];

        if (!variant?.id) return null

        setIsAdding(true)

        await addToCart({
            variantId: variant.id,
            quantity: 1,
            countryCode,
        })

        setIsAdding(false)

    }

    const swiperOptions: SwiperOptions = {
        slidesPerView: "auto",
        modules: [Navigation, Pagination],
        pagination: {
            el: `.pagination-1`,
            type: "bullets",
            clickable: true
        },
        navigation: {
            prevEl: `.prev-1`,
            nextEl: `.next-1`
        }
    };

    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) return null;

    return (
        <>
            <Swiper
                {...swiperOptions}
                className="product-swiper">
                <div className='swiper-wrapper'>
                    {pricedProducts?.map((product) => {

                        if (!product) {
                            return null;
                        }

                        const selectedVariant = variants[product?.id!];

                        return (
                            <SwiperSlide className="product-swiper-slide mr-10" key={product.id}>
                                <div aria-label="Pure Vibes product" className="css-1j3jdfy e18j06yf0">
                                    <div className="css-1f4xxd6 e19031790" />

                                    <div className="css-1iu2kf">
                                        <div className="css-utyoyz e13efj2t0">
                                            <div className="pill">Save $20.85 on Hydration Set</div>
                                        </div>

                                        <div className="css-1iu2k">
                                            <button className="cart"
                                            onClick={handleAddToCart}>
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                                                    <path opacity="0.64" d="M11.75 12H13.1562C13.8438 12 14.4688 12.4062 14.75 13H27.5938C28.4062 13 29 13.7812 28.7812 14.5938L27.5 19.3438C27.25 20.3438 26.3438 21 25.3438 21H16.3125L16.5 21.9062C16.5625 22.25 16.875 22.5 17.2188 22.5H26.25C26.6562 22.5 27 22.8438 27 23.25C27 23.6875 26.6562 24 26.25 24H17.2188C16.1562 24 15.2188 23.25 15.0312 22.1875L13.4062 13.7188C13.375 13.5938 13.2812 13.5 13.1562 13.5H11.75C11.3125 13.5 11 13.1875 11 12.75C11 12.3438 11.3125 12 11.75 12ZM15.0938 14.5L16.0312 19.5H25.3438C25.6875 19.5 25.9688 19.2812 26.0625 18.9688L27.25 14.5H15.0938ZM16.5 28C15.9375 28 15.4688 27.7188 15.1875 27.25C14.9062 26.8125 14.9062 26.2188 15.1875 25.75C15.4688 25.3125 15.9375 25 16.5 25C17.0312 25 17.5 25.3125 17.7812 25.75C18.0625 26.2188 18.0625 26.8125 17.7812 27.25C17.5 27.7188 17.0312 28 16.5 28ZM27 26.5C27 27.0625 26.6875 27.5312 26.25 27.8125C25.7812 28.0938 25.1875 28.0938 24.75 27.8125C24.2812 27.5312 24 27.0625 24 26.5C24 25.9688 24.2812 25.5 24.75 25.2188C25.1875 24.9375 25.7812 24.9375 26.25 25.2188C26.6875 25.5 27 25.9688 27 26.5Z" fill="#153A5B"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div> 

                                    <div className="css-s7o3q1 e188n9bq0">
                                        <ul className="quick-info-list undefined" />
                                    </div>

                                    <div className="css-mjq8oa e1o8l0yq0">
                                        <a className="productMedia_wrap" href="/sets/pure-vibes?sku=SET-FLIP-UVC-STRAW-M-GW">
                                            <div className="productMedia">
                                                <div className="productMedia_asset">
                                                    <img className="productMedia_assetImage" src={product?.thumbnail!} />
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="shopCard_content">
                                        <div className="css-16pmvc5 e1jrto4r0">
                                            <h2 className="productTitle">{product.title}</h2>
                                        </div>

                                        <div className="shopCard_variantsInfo">
                                            <div className="css-9crody eiwce720">
                                                <span>{selectedVariant?.title}</span>
                                            </div>

                                            <div className="css-gf1xq e1c3loyr0" aria-label="Select Pure Vibes size">
                                                {
                                                    product.options?.map((option) => option.values.map((v) => v.value).filter(onlyUnique).map((v, i) => {
                                                        if (option.title === "Size") {
                                                            const current = options[product?.id!] && options[product?.id!][option.id] !== undefined ? options[product?.id!][option.id] : "";

                                                            return (
                                                                <button
                                                                    key={option.values[i].id}
                                                                    onClick={() => { updateOptions(product?.id!, { [option.id]: v }) }}
                                                                    className={v === current ? "css-1bnu34p" : "css-1iz7lom"} type="button" aria-label="Select 17 oz size">
                                                                    {v}
                                                                </button>
                                                            );
                                                        }
                                                        return null;
                                                    }))
                                                }
                                            </div>
                                        </div>

                                        <div className="shopCard_variants">
                                            <div className="css-1jqderz er3v0pv0">
                                                <Swiper
                                                    className='variantsSwiper_swiper'
                                                    modules={[Navigation]}
                                                    navigation={{
                                                        prevEl: `.prev-${product.id}`,
                                                        nextEl: `.next-${product.id}`,
                                                    }}
                                                    spaceBetween={0}
                                                    slidesPerView={"auto"}>
                                                    <div className="swiper-wrapper variantsSwiper_swiper_inner">
                                                        {product.options?.map((option) => option.values.map((v) => v.value).filter(onlyUnique).map((v, i) => {
                                                            if (option.title === "Color") {
                                                                const current = options[product?.id!] && options[product?.id!][option.id] !== undefined ? options[product?.id!][option.id] : "";
                                                                return (
                                                                    <SwiperSlide className="variantsSwiper_swiper_item" key={option.values[i].id}>
                                                                        <button className={v === current ? "css-mcdfu2" : "css-1lv8ax9"}
                                                                            onClick={() => { updateOptions(product?.id!, { [option.id]: v }) }}>
                                                                            <span>{v}</span>
                                                                        </button>
                                                                    </SwiperSlide>
                                                                );
                                                            }
                                                            return null;
                                                        }))}
                                                    </div>
                                                </Swiper>
                                                <div className="variantsSwiper_navigation">
                                                    <div className="variantsSwiper_navigationInner">
                                                        <button
                                                            title="Previous LARQ Bottle PureVis™ variant"
                                                            type="button"
                                                            className={`prev-${product.id} variantsSwiper_navigation_arrow`}>
                                                            <span color="text.default" className="css-11qxqh7 e18bqli0">
                                                                <svg className="css-82n8sf expsv8r0" focusable="false" viewBox="0 0 16 10" color="text.default" aria-hidden="true">
                                                                    <path d="m4.625 9.86-4.5-4.5C.031 5.265 0 5.14 0 4.983a.47.47 0 0 1 .125-.343l4.5-4.5a.53.53 0 0 1 .719 0 .53.53 0 0 1 0 .718L1.687 4.484H15.5c.25 0 .5.25.5.5 0 .282-.25.5-.5.5H1.687l3.657 3.657a.53.53 0 0 1 0 .718.53.53 0 0 1-.719 0Z" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                        <button
                                                            title="Next LARQ Bottle PureVis™ variant"
                                                            type="button"
                                                            className={`next-${product.id} variantsSwiper_navigation_arrow`}>
                                                            <span color="text.default" className="css-11qxqh7 e18bqli0">
                                                                <svg className="css-82n8sf expsv8r0" focusable="false" viewBox="0 0 16 10" color="text.default" aria-hidden="true">
                                                                    <path d="m11.375.14 4.5 4.5c.094.094.125.22.125.376a.47.47 0 0 1-.125.343l-4.5 4.5a.53.53 0 0 1-.719 0 .53.53 0 0 1 0-.718l3.656-3.625H.5c-.25 0-.5-.25-.5-.5 0-.282.25-.5.5-.5h13.813L10.655.859a.53.53 0 0 1 0-.718.53.53 0 0 1 .719 0Z" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </div>
                
                <button className={`prev-1 swiper-button-prev`} tabIndex={-1}>
                    <span>
                        <svg viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                            <path opacity="0.6" d="M4.33594 9.94531L0.117188 5.72656C0.0292969 5.63867 0 5.52148 0 5.375C0 5.25781 0.0292969 5.14062 0.117188 5.05273L4.33594 0.833984C4.51172 0.658203 4.83398 0.658203 5.00977 0.833984C5.18555 1.00977 5.18555 1.33203 5.00977 1.50781L1.58203 4.90625H14.5312C14.7656 4.90625 15 5.14062 15 5.375C15 5.63867 14.7656 5.84375 14.5312 5.84375H1.58203L5.00977 9.27148C5.18555 9.44727 5.18555 9.76953 5.00977 9.94531C4.83398 10.1211 4.51172 10.1211 4.33594 9.94531Z" fill="#153A5B" />
                        </svg>
                    </span>
                </button>
                <button className={`next-1 swiper-button-next`} tabIndex={-1}>
                    <span>
                        <svg viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                            <path opacity="0.6" d="M10.4688 10.7812C10.3125 10.6562 10.25 10.4688 10.25 10.25C10.25 10.0625 10.3125 9.875 10.4688 9.75L13.4375 6.75H0.75C0.3125 6.75 0 6.4375 0 6C0 5.59375 0.3125 5.25 0.75 5.25H13.4375L10.4688 2.28125C10.1562 2 10.1562 1.53125 10.4688 1.25C10.75 0.9375 11.2188 0.9375 11.5312 1.25L15.7812 5.5C16.0625 5.78125 16.0625 6.25 15.7812 6.53125L11.5312 10.7812C11.2188 11.0938 10.75 11.0938 10.4688 10.7812Z" fill="#153A5B" />
                        </svg>
                    </span>
                </button>
            </Swiper>
            <div className={`swiper-pagination pagination-1`}></div>
        </>
    )
}

export default ProductSwiper;