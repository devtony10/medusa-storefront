"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

const Magazine = () => {

    const swiperOptions: SwiperOptions = {
        modules: [Pagination],
        slidesPerView: "auto",
        spaceBetween: 30,
        pagination: {
            el: ".pagination-3",
            clickable: true,
        },
    };

    return (
        <div className="css-15j3bw1 exi01cl0">
            <div className="section-layout-heading">
                <div className="section-layout-heading-text">
                    <h1 className="section_title">basq magazine</h1>
                    <span className="section_description">
                        Take a peek at our online magazine where we cover everything from water
                        to travel and wellness.
                    </span>
                </div>
                <a href="https://basq.livelarq.com/" target="_blank" rel="noopener noreferrer" className="section-layout-button css-1ezy16c edhpqag0" tabIndex={0}>
                    Explore basq{/* */}{" "}
                    <span>
                        <svg viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                            <path opacity="0.6" d="M10.4688 10.7812C10.3125 10.6562 10.25 10.4688 10.25 10.25C10.25 10.0625 10.3125 9.875 10.4688 9.75L13.4375 6.75H0.75C0.3125 6.75 0 6.4375 0 6C0 5.59375 0.3125 5.25 0.75 5.25H13.4375L10.4688 2.28125C10.1562 2 10.1562 1.53125 10.4688 1.25C10.75 0.9375 11.2188 0.9375 11.5312 1.25L15.7812 5.5C16.0625 5.78125 16.0625 6.25 15.7812 6.53125L11.5312 10.7812C11.2188 11.0938 10.75 11.0938 10.4688 10.7812Z" fill="#153A5B" />
                        </svg>
                    </span>
                </a>
            </div>
            <section className="css-q8b9zb e1jjicym0">
                <section className="css-1jjsc69 ecovu060">
                    <Swiper
                        {...swiperOptions}
                        className="magazine-swiper">
                        <div className="swiper-wrapper">
                            <SwiperSlide style={{ marginRight: 40 }}>
                                <article className="css-nqeqz3 e19d4k9l0">
                                    <a href="https://basq.livelarq.com/wellness/im-a-nutritionist-and-i-only-use-filtered-water-heres-why/" className="magazine-card_linkWrapper" rel="noopener noreferrer" target="_blank" aria-label="I’m a nutritionist, and I only use filtered water. Here’s why.. Read more">
                                        <img className="magazine-card_image" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/v1684876841/Homepage-v3/larq_pitcher_on_table.png" alt="I’m a nutritionist, and I only use filtered water. Here’s why." />
                                        <h4 className="magazine-card_title">
                                            I’m a nutritionist, and I only use filtered water. Here’s why.
                                        </h4>
                                        <span className="magazine-card_link">Read more</span>
                                    </a>
                                </article>
                            </SwiperSlide>
                            <SwiperSlide style={{ marginRight: 40 }}>
                                <article className="css-nqeqz3 e19d4k9l0">
                                    <a href="https://basq.livelarq.com/wellness/how-clean-is-new-york-tap-water/" className="magazine-card_linkWrapper" rel="noopener noreferrer" target="_blank" aria-label="How clean is New York Tap Water?. Read more">
                                        <img className="magazine-card_image" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/v1684876924/Homepage-v3/New_york_view.png" alt="How clean is New York Tap Water?" />
                                        <h4 className="magazine-card_title">
                                            How clean is New York Tap Water?
                                        </h4>
                                        <span className="magazine-card_link">Read more</span>
                                    </a>
                                </article>
                            </SwiperSlide>
                            <SwiperSlide style={{ marginRight: 40 }}>
                                <article className="css-nqeqz3 e19d4k9l0">
                                    <a href="https://basq.livelarq.com/wellness/dangers-of-pfas/" className="magazine-card_linkWrapper" rel="noopener noreferrer" target="_blank" aria-label="How to remove PFAS, PFOA, PFOS from tap water. Read more">
                                        <img className="magazine-card_image" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/v1684876988/Homepage-v3/dished_with_food.png" alt="How to remove PFAS, PFOA, PFOS from tap water" />
                                        <h4 className="magazine-card_title"> How to remove PFAS, PFOA, PFOS from tap water</h4>
                                        <span className="magazine-card_link">Read more</span>
                                    </a>
                                </article>
                            </SwiperSlide>
                            <SwiperSlide style={{ marginRight: 40 }}>
                                <article className="css-nqeqz3 e19d4k9l0">
                                    <a href="https://basq.livelarq.com/wellness/how-clean-is-london-tap-water/" className="magazine-card_linkWrapper" rel="noopener noreferrer" target="_blank" aria-label="How clean is London tap water?. Read more">
                                        <img className="magazine-card_image" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/v1685304669/Homepage-v3/london_bridge.jpg" alt="How clean is London tap water?" />
                                        <h4 className="magazine-card_title">
                                            How clean is London tap water?
                                        </h4>
                                        <span className="magazine-card_link">Read more</span>
                                    </a>
                                </article>
                            </SwiperSlide>
                            <SwiperSlide style={{ marginRight: 40 }}>
                                <article className="css-nqeqz3 e19d4k9l0">
                                    <a href="https://basq.livelarq.com/wellness/how-to-clean-your-reusable-water-bottle/" className="magazine-card_linkWrapper" rel="noopener noreferrer" target="_blank" aria-label="How to clean your reusable water bottle (if you don’t have a self-cleaning one). Read more">
                                        <img className="magazine-card_image" src="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/v1685304702/Homepage-v3/larq_bottle_on_the_water.jpg" alt="How to clean your reusable water bottle (if you don’t have a self-cleaning one)" />
                                        <h4 className="magazine-card_title">
                                            How to clean your reusable water bottle (if you don’t have a
                                            self-cleaning one)
                                        </h4>
                                        <span className="magazine-card_link">Read more</span>
                                    </a>
                                </article>
                            </SwiperSlide>
                            <SwiperSlide style={{ marginRight: 40 }}>
                                <article className="css-nqeqz3 e19d4k9l0">
                                    <a href="https://basq.livelarq.com/wellness/common-contaminants-in-tap-water/" className="magazine-card_linkWrapper" rel="noopener noreferrer" target="_blank" aria-label="What contaminants are lurking in your water?. Read more">
                                        <img className="magazine-card_image" src="https://res.cloudinary.com/larq/image/upload/w_410,h_510,c_fill/q_auto,f_auto/v1711018381/Homepage-v3/tap-water-sprinkling.jpg" alt="What contaminants are lurking in your water?" />
                                        <h4 className="magazine-card_title">
                                            What contaminants are lurking in your water?
                                        </h4>
                                        <span className="magazine-card_link">Read more</span>
                                    </a>
                                </article>
                            </SwiperSlide>
                        </div>
                    </Swiper>
                    <div className="swiper-pagination pagination-3"></div>
                </section>
            </section>
        </div>
    )
}

export default Magazine
