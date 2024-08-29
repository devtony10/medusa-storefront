import { Suspense } from "react"

import { listRegions } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <section className="css-130va89 eehlgbv0">
      <div className="header-wrap">
        <div className="head-skinny-wrap">
          <section className="relative css-1iu2kf2 epn6cc50">
            <div className="navigation-head-skinny-wrap">
              <div className="navigation-head">

                <SideMenu regions={regions} />

                <div className="main-navigation-wrap hidden">
                  <nav className="main-navigation-links main-navigation-links-left" role="navigation" aria-label="main navigation">
                    <ul className="">
                      <li><button className="" aria-label="Shop all" tabIndex={0} role="button">Shop all</button></li>
                      <li><button className="" aria-label="Purification" tabIndex={0} role="button">Purification</button></li>
                      <li><button className="" aria-label="Home" tabIndex={0} role="button">Home</button></li>
                      <li><button className="" aria-label="Drinkware" tabIndex={0} role="button">Drinkware</button></li>
                    </ul>
                  </nav>
                </div>

                <div className="navigation-logo w-[4.53333rem] leading-4 mx-12 [@media(min-width:780px)]:w-[5.6rem]">
                  <LocalizedClientLink href="/" className="flex" data-testid="nav-store-link" aria-label="LARQ Homepage">
                    <svg width="85" height="20" viewBox="0 0 85 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                      <path fillRule="evenodd" clipRule="evenodd" d="M74.7998 16.9523C71.0144 16.9523 67.8164 13.6743 67.8164 9.79426C67.8164 5.91404 71.0144 2.63602 74.7998 2.63602C78.5852 2.63602 81.7831 5.91404 81.7831 9.79426C81.7831 11.2661 81.3218 12.6507 80.5439 13.8033L78.4165 11.642L76.6477 13.4391L78.7948 15.6206C77.654 16.4549 76.272 16.9523 74.7998 16.9523ZM84.7023 18.0283L82.5766 15.8685C83.9015 14.2143 84.6865 12.1116 84.6865 9.79426C84.6865 4.33536 80.3436 0.0597534 74.7998 0.0597534C69.2556 0.0597534 64.9127 4.33536 64.9127 9.79426C64.9127 15.2529 69.2556 19.5288 74.7998 19.5288C77.0548 19.5288 79.1111 18.8211 80.7572 17.6143L82.9335 19.8255L84.7023 18.0283Z" fill="#153A5B"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.669189 19.1244V0.462435H3.3895V16.5479H14.4834V19.1244H0.669189Z" fill="#153A5B"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M46.914 10.3998H52.6442C55.633 10.3998 56.6933 8.41762 56.6933 6.7196C56.6933 5.0218 55.633 3.0396 52.6442 3.0396H46.914V10.3998ZM55.8915 19.1244L51.8878 12.977H46.914V19.1244H44.1937V0.462457H52.9192C56.8037 0.462457 59.4137 2.97674 59.4137 6.7196C59.4137 9.23828 57.7643 11.3851 55.2114 12.188L54.6711 12.3583L59.339 19.1244H55.8915Z" fill="#153A5B"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M23.5083 19.1244L29.222 4.86485L34.8847 19.1244H37.9185L30.7063 1.82419C30.3621 0.998699 29.5655 0.462435 28.6831 0.462435H22.8782V0.945072C22.8782 1.99892 23.719 2.8532 24.7565 2.8532H27.4969L20.4986 19.1244H23.5083Z" fill="#153A5B"></path>
                    </svg>
                  </LocalizedClientLink>
                </div>

                <div className="navigation-mobile-account-cart">
                  <a className="navigation-account" href="/user/sign-in">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                      <path opacity="0.64" d="M22.5 16C22.5 15.125 22 14.3125 21.25 13.8438C20.4688 13.4062 19.5 13.4062 18.75 13.8438C17.9688 14.3125 17.5 15.125 17.5 16C17.5 16.9062 17.9688 17.7188 18.75 18.1875C19.5 18.625 20.4688 18.625 21.25 18.1875C22 17.7188 22.5 16.9062 22.5 16ZM16 16C16 14.5938 16.75 13.2812 18 12.5625C19.2188 11.8438 20.75 11.8438 22 12.5625C23.2188 13.2812 24 14.5938 24 16C24 17.4375 23.2188 18.75 22 19.4688C20.75 20.1875 19.2188 20.1875 18 19.4688C16.75 18.75 16 17.4375 16 16ZM14.5312 26.5H25.4375C25.1562 24.5312 23.4688 23 21.4062 23H18.5625C16.5 23 14.8125 24.5312 14.5312 26.5ZM13 27.0938C13 24 15.4688 21.5 18.5625 21.5H21.4062C24.5 21.5 27 24 27 27.0938C27 27.5938 26.5625 28 26.0625 28H13.9062C13.4062 28 13 27.5938 13 27.0938Z" fill="#153A5B"></path>
                    </svg>
                  </a>
                  <CartButton />
                  {/* create cart button for mobile - sidebar logic */}
                </div>

                <div className="main-navigation-wrap main-navigation-wrap-right">
                  <nav className="main-navigation-links main-navigation-links-right">
                    <ul className="">
                      <li className=""><a className="" href="/technology">Technology</a></li>
                      <li className=""><a className="" href="/support">FAQ</a></li>
                      <li className="icon-item account-item">
                        <a className="navigation-account" href="/user/sign-in">
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                            <path opacity="0.64" d="M22.5 16C22.5 15.125 22 14.3125 21.25 13.8438C20.4688 13.4062 19.5 13.4062 18.75 13.8438C17.9688 14.3125 17.5 15.125 17.5 16C17.5 16.9062 17.9688 17.7188 18.75 18.1875C19.5 18.625 20.4688 18.625 21.25 18.1875C22 17.7188 22.5 16.9062 22.5 16ZM16 16C16 14.5938 16.75 13.2812 18 12.5625C19.2188 11.8438 20.75 11.8438 22 12.5625C23.2188 13.2812 24 14.5938 24 16C24 17.4375 23.2188 18.75 22 19.4688C20.75 20.1875 19.2188 20.1875 18 19.4688C16.75 18.75 16 17.4375 16 16ZM14.5312 26.5H25.4375C25.1562 24.5312 23.4688 23 21.4062 23H18.5625C16.5 23 14.8125 24.5312 14.5312 26.5ZM13 27.0938C13 24 15.4688 21.5 18.5625 21.5H21.4062C24.5 21.5 27 24 27 27.0938C27 27.5938 26.5625 28 26.0625 28H13.9062C13.4062 28 13 27.5938 13 27.0938Z" fill="#153A5B"></path>
                          </svg>
                        </a>
                      </li>
                      <li className="icon-item">
                        <Suspense
                          fallback={
                            <div className="z-50">
                              <button className="navigation-cart" aria-label="Open cart slide out">
                                <LocalizedClientLink
                                  className=""
                                  href="/cart"
                                  data-testid="nav-cart-link">
                                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                                    <path opacity="0.64" d="M11.75 12H13.1562C13.8438 12 14.4688 12.4062 14.75 13H27.5938C28.4062 13 29 13.7812 28.7812 14.5938L27.5 19.3438C27.25 20.3438 26.3438 21 25.3438 21H16.3125L16.5 21.9062C16.5625 22.25 16.875 22.5 17.2188 22.5H26.25C26.6562 22.5 27 22.8438 27 23.25C27 23.6875 26.6562 24 26.25 24H17.2188C16.1562 24 15.2188 23.25 15.0312 22.1875L13.4062 13.7188C13.375 13.5938 13.2812 13.5 13.1562 13.5H11.75C11.3125 13.5 11 13.1875 11 12.75C11 12.3438 11.3125 12 11.75 12ZM15.0938 14.5L16.0312 19.5H25.3438C25.6875 19.5 25.9688 19.2812 26.0625 18.9688L27.25 14.5H15.0938ZM16.5 28C15.9375 28 15.4688 27.7188 15.1875 27.25C14.9062 26.8125 14.9062 26.2188 15.1875 25.75C15.4688 25.3125 15.9375 25 16.5 25C17.0312 25 17.5 25.3125 17.7812 25.75C18.0625 26.2188 18.0625 26.8125 17.7812 27.25C17.5 27.7188 17.0312 28 16.5 28ZM27 26.5C27 27.0625 26.6875 27.5312 26.25 27.8125C25.7812 28.0938 25.1875 28.0938 24.75 27.8125C24.2812 27.5312 24 27.0625 24 26.5C24 25.9688 24.2812 25.5 24.75 25.2188C25.1875 24.9375 25.7812 24.9375 26.25 25.2188C26.6875 25.5 27 25.9688 27 26.5Z" fill="#153A5B"></path>
                                  </svg>
                                  <span className="cart-indicator is-mobile">0</span>
                                </LocalizedClientLink>
                              </button>
                            </div>
                          }
                        >
                          <CartButton />
                        </Suspense>
                      </li>
                    </ul>
                  </nav>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
