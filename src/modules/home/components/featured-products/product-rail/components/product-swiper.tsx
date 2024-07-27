"use client"

import React, { useRef, useEffect, useState } from 'react';
import { Region, ProductVariant } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { onlyUnique } from "@lib/util/only-unique";
import Swiper from 'swiper';
import { Navigation, Pagination, } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

import "swiper/css";

interface PricedProductProps {
    pricedProducts: (PricedProduct | null)[];
    isFeatured?: boolean;
    region: Region;
}

const ProductSwiper: React.FC<PricedProductProps> = ({ pricedProducts, isFeatured, region }) => {
    const swiperRef = useRef<HTMLDivElement>(null);
    const variantsSwiperRef = useRef<HTMLDivElement>(null);

    const [swiper, setSwiper] = useState<Swiper | null>(null);
    const [variantsSwiper, setVariantsSwiper] = useState<Swiper | null>(null);

    const swiperOptions: SwiperOptions = {
        modules: [Pagination],
        slidesPerView: "auto",
        spaceBetween: 1,
        pagination: {
            el: ".pagination-2",
            clickable: true,
        }
    };

    const variantsSwiperOptions: SwiperOptions = {
        modules: [Navigation],
        spaceBetween: 1,
        slidesPerView: "auto",
    };

    useEffect(() => {
        if (swiperRef.current && !swiper) {
            const newSwiper = new Swiper(swiperRef.current, swiperOptions);
            setSwiper(newSwiper);
        }

        if (variantsSwiperRef.current && !variantsSwiper) {
            const newVariantsSwiper = new Swiper(variantsSwiperRef.current, variantsSwiperOptions);
            setVariantsSwiper(newVariantsSwiper);
        }

        return () => {
            if (swiper) swiper.destroy(true, true);
            if (variantsSwiper) variantsSwiper.destroy(true, true);
        };
    }, [swiperRef, variantsSwiperRef, swiper, variantsSwiper]);

    useEffect(() => {
        if (swiper) {
            swiper.update();
        }
    }, [swiper]);

    useEffect(() => {
        if (variantsSwiper) {
            variantsSwiper.update();
        }
    }, [variantsSwiper]);

    const resolvedProducts = React.useMemo(() => pricedProducts, [pricedProducts]);

    return (
        <div className="css-1k4mxx6 exi01cl0">
            <div className="css-0 e1qwyqus0">
                <section className="css-20k3s6 ecovu060">
                    <div ref={swiperRef} className="swiper product-swiper">
                        <div className="swiper-wrapper">
                            {resolvedProducts?.map((product) => {
                                if (!product) {
                                    return null; // Skip this iteration if product is undefined
                                }

                                return (
                                    <div key={product.id}
                                        className="swiper-slide product-swiper-slide"
                                        style={{ marginRight: 40 }}
                                    >
                                        <div
                                            aria-label="Pure Vibes product"
                                            className="css-1j3jdfy e18j06yf0"
                                        >
                                            <div className="css-1f4xxd6 e19031790" />
                                            <div className="css-utyoyz e13efj2t0">
                                                <div className="pill">Save $20.85 on Hydration Set</div>
                                            </div>
                                            <div className="css-s7o3q1 e188n9bq0">
                                                <ul className="quick-info-list undefined" />
                                            </div>
                                            <div className="css-mjq8oa e1o8l0yq0">
                                                <a
                                                    className="productMedia_wrap"
                                                    href="/sets/pure-vibes?sku=SET-FLIP-UVC-STRAW-M-GW"
                                                >
                                                    <div className="productMedia">
                                                        <div className="productMedia_asset">
                                                            <img
                                                                className="productMedia_assetImage"
                                                                src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1710408035/SKU/SPA/v3/SET-FLIP-UVC-STRAW-M-GW.png"
                                                                alt="Pure Vibes Granite White"
                                                                decoding="async"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="shopCard_content">
                                                <div className="css-16pmvc5 e1jrto4r0">
                                                    <h2 className="productTitle">Pure Vibes</h2>
                                                </div>
                                                <div className="shopCard_variantsInfo">
                                                    <div className="css-9crody eiwce720">
                                                        <span>Granite White</span>
                                                    </div>

                                                    <div
                                                        className="css-gf1xq e1c3loyr0"
                                                        aria-label="Select Pure Vibes size"
                                                    >
                                                        {product.options?.map((option) => option.values.map((v) => v.value).filter(onlyUnique).map((v) => {
                                                            if (option.title === "Size") {
                                                                return (
                                                                    <button
                                                                        key={option.id}
                                                                        // onClick={() => { updateOptions(product?.id!, { [option.id]: v }) }}
                                                                        className="inline-flex text-center opacity-100 duration-300 ease-in-out [transition-property:opacity,_text-decoration-color] cursor-pointer p-0 m-0 [font:inherit]" type="button" aria-label="Select 17 oz size">
                                                                        {v}
                                                                    </button>
                                                                );
                                                            }
                                                            return null;
                                                        }))}
                                                    </div>
                                                </div>

                                                <div className="shopCard_variants">
                                                    <div className="css-1jqderz er3v0pv0">
                                                        <div ref={variantsSwiperRef} className="swiper variantsSwiper_swiper">
                                                            <div
                                                                className="swiper-wrapper variantsSwiper_swiper_inner"
                                                                aria-label="Select Pure Vibes variant"
                                                            >
                                                                {product.options?.map((option) => option.values.map((v) => v.value).filter(onlyUnique).map((v) => {
                                                                    if (option.title === "Color") {
                                                                        return (
                                                                            <div className="swiper-slide variantsSwiper_swiper_item" key={option.id}>
                                                                                <button className="css-1lv8ax9 e1l9gps50">
                                                                                    {v}
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="css-wn1ko eyw4hvx0">
                                                    Starting at $109.00 instead of $129.85
                                                </div>
                                                <div className="css-1cbyy8q e7ln9so0" aria-hidden="true">
                                                    {" "}
                                                    <span className="priceOld" aria-hidden="true">
                                                        $129.85
                                                    </span>{" "}
                                                    <span className="priceCurrent" aria-hidden="true">
                                                        $109
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div className="swiper-pagination pagination-4"></div>
                </section>
            </div>
        </div>

    );
};

export default ProductSwiper;
