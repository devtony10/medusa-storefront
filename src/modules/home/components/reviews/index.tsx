"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

const Reviews = () => {

    const swiperOptions: SwiperOptions = {
        modules: [Pagination],
        slidesPerView: "auto",
        spaceBetween: 30,
        pagination: {
            el: ".pagination-2",
            clickable: true,
        },
    };

    return (
        <div className="slider-wrap">
            <section className="css-tql7mc ecovu060">
                <Swiper
                    {...swiperOptions}
                    className="reviews-swiper">
                    <div className="swiper-wrapper">
                        <SwiperSlide style={{ marginRight: 40 }}>
                            <div className="css-seaxr5 epsaau80">
                                <div className="reviewItem_quote">
                                    What’s the Next Status Water Bottle? Three of our experts named
                                    the LARQ bottle as one to watch.
                                </div>
                                <div className="reviewItem_by">
                                    <img className="reviewItem_byLogo" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_150/v1685705206/v3-images/media-block/blue/strategist.png" alt="The Strategist" decoding="async" loading="lazy" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide style={{ marginRight: 40 }}>
                            <div className="css-seaxr5 epsaau80">
                                <div className="reviewItem_quote">
                                    The result is that every glass of water tastes crisp and fresh.
                                </div>
                                <div className="reviewItem_by">
                                    <img className="reviewItem_byLogo" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_150/v1685705206/v3-images/media-block/blue/oprah_Magazine.png" alt="The Oprah Magazine" decoding="async" loading="lazy" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide style={{ marginRight: 40 }}>
                            <div className="css-seaxr5 epsaau80">
                                <div className="reviewItem_quote">
                                    Easier to drink through the straw than other water filter bottles.
                                </div>
                                <div className="reviewItem_by">
                                    <img className="reviewItem_byLogo" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_150/v1704808606/v3-images/media-block/Good_Housekeeping.png" alt="Good Housekeeping" decoding="async" loading="lazy" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide style={{ marginRight: 40 }}>
                            <div className="css-seaxr5 epsaau80">
                                <div className="reviewItem_quote">
                                    You Should Ditch Your Old Water Dispenser For The High-Tech LARQ
                                    Pitcher PureVis™.
                                </div>
                                <div className="reviewItem_by">
                                    <img className="reviewItem_byLogo" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_150/v1689147058/v3-images/media-block/BP-logo-black.png" alt="Best" decoding="async" loading="lazy" />
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>
                <div className="swiper-pagination pagination-2"></div>
            </section>
        </div>
    )
}

export default Reviews
