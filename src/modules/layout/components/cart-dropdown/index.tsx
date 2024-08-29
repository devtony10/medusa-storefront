"use client"

import { Popover, Transition } from "@headlessui/react"
import { Cart } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

import { formatAmount } from "@lib/util/prices"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: Omit<Cart, "beforeInsert" | "afterLoad"> | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const { countryCode } = useParams()

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button className="navigation-cart" aria-label="Open cart slide out"
        >
          <LocalizedClientLink
            href="/cart"
            data-testid="nav-cart-link"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
              <path opacity="0.64" d="M11.75 12H13.1562C13.8438 12 14.4688 12.4062 14.75 13H27.5938C28.4062 13 29 13.7812 28.7812 14.5938L27.5 19.3438C27.25 20.3438 26.3438 21 25.3438 21H16.3125L16.5 21.9062C16.5625 22.25 16.875 22.5 17.2188 22.5H26.25C26.6562 22.5 27 22.8438 27 23.25C27 23.6875 26.6562 24 26.25 24H17.2188C16.1562 24 15.2188 23.25 15.0312 22.1875L13.4062 13.7188C13.375 13.5938 13.2812 13.5 13.1562 13.5H11.75C11.3125 13.5 11 13.1875 11 12.75C11 12.3438 11.3125 12 11.75 12ZM15.0938 14.5L16.0312 19.5H25.3438C25.6875 19.5 25.9688 19.2812 26.0625 18.9688L27.25 14.5H15.0938ZM16.5 28C15.9375 28 15.4688 27.7188 15.1875 27.25C14.9062 26.8125 14.9062 26.2188 15.1875 25.75C15.4688 25.3125 15.9375 25 16.5 25C17.0312 25 17.5 25.3125 17.7812 25.75C18.0625 26.2188 18.0625 26.8125 17.7812 27.25C17.5 27.7188 17.0312 28 16.5 28ZM27 26.5C27 27.0625 26.6875 27.5312 26.25 27.8125C25.7812 28.0938 25.1875 28.0938 24.75 27.8125C24.2812 27.5312 24 27.0625 24 26.5C24 25.9688 24.2812 25.5 24.75 25.2188C25.1875 24.9375 25.7812 24.9375 26.25 25.2188C26.6875 25.5 27 25.9688 27 26.5Z" fill="#153A5B"></path>
            </svg>
            <span className="cart-indicator is-mobile">{totalItems}</span>
          </LocalizedClientLink>
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            // className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-[rgba(21,_58,_91,_0.32)] w-[420px] text-ui-fg-base"
            className="css-18toqm3 hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-[rgba(21,_58,_91,_0.32)] w-[420px] max-w-[32rem] text-[rgba(21,_58,_91,_0.32)]"
            data-testid="nav-cart-dropdown"
          >
            {/* <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi">Cart</h3>
            </div> */}
            <div className="css-wzi54b e1qhdclf0">
              <div className="cartHeaderInfo">Your cart</div>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                {/* <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px"> */}
                <div className="cartContainer_main max-h-[402px] overflow-y-scroll no-scrollbar">
                  <div className="css-ium302">

                    <div className="cartContentWrap">
                      {cartState.items
                        .sort((a, b) => {
                          return a.created_at > b.created_at ? -1 : 1
                        })
                        .map((item) => (
                          <div key={item.id} className="css-0 eyqdb580">
                            <div className="css-1trejv0 ewci2ap0">
                              <div className="cartItemInner">
                                <div className="cartItemImage">
                                  <a title="Pure Vibes" href="/sets/pure-vibes?sku=SET-FLIP-UVC-STRAW-L-OB">
                                    <img src="https://cdn11.bigcommerce.com/s-b0j8iiyjpx/product_images/attribute_rule_images/737_thumb_1700569688.png" alt="Pure Vibes - product image" decoding="async" loading="lazy" />
                                  </a>
                                </div>
                                <div className="cartItemInfo">

                                  <div className="cartItemDescription">
                                    <span className="cartItemName">
                                      <a title="Pure Vibes" href="/sets/pure-vibes?sku=SET-FLIP-UVC-STRAW-L-OB">Pure Vibes</a>
                                    </span>
                                    <div className="cartItemOptions">
                                      <span>Obsidian Black</span>
                                      <span>25 oz</span>
                                    </div>
                                    <button title="Delete Item" className="cartItemDelete" type="button">
                                      <svg viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" role="img">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1h3a1 1 0 1 1 0 2h-.544l-.37 8.136A3 3 0 0 1 10.089 16H4.91a3 3 0 0 1-2.997-2.864L1.544 5H1a1 1 0 0 1 0-2h3V2Zm2 1h3V2H6v1ZM3.546 5l.366 8.045a1 1 0 0 0 1 .955h5.177a1 1 0 0 0 .999-.955L11.454 5H3.545Z"></path>
                                      </svg>
                                    </button>
                                  </div>

                                  <div className="cartItemQuantityPriceWrap">
                                    <div className="cartItemQuantityWrap">
                                      <div className="css-1si7uj3 e12z4cbb0">
                                        <button className="cartItemQuantityButton isMinus" type="button" aria-label="Remove from Cart">
                                          <svg viewBox="0 0 10 2" xmlns="http://www.w3.org/2000/svg" role="img">
                                            <path d="M9.286 0H.714C.313 0 0 .313 0 .667v.667C0 1.709.313 2 .714 2h8.572c.38 0 .714-.292.714-.667V.667C10 .313 9.666 0 9.286 0z"></path>
                                          </svg>
                                        </button>
                                        <div className="cartItemQuantityInput">
                                          <input id="cartItemQuantity-SET-FLIP-UVC-STRAW-L-OB-ce2ec65c-712c-45c4-9dbf-5bef5e85df6d" className="cartItemQuantityInput_input" type="text" name="Quantity" aria-label="Quantity" value="1" />
                                        </div>
                                        <button className="cartItemQuantityButton isPlus" type="button" aria-label="Add to Cart">
                                          <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img">
                                            <path d="M9.286 3.929H6.072V.714A.734.734 0 005.357 0h-.714a.72.72 0 00-.714.714V3.93H.714A.72.72 0 000 4.643v.714c0 .402.313.715.714.715H3.93v3.214c0 .402.312.714.714.714h.714a.72.72 0 00.715-.714V6.072h3.214A.72.72 0 0010 5.357v-.714a.734.734 0 00-.714-.714z"></path>
                                          </svg>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="cartItemPrice">
                                      <span className="cartItemPriceOld">$139.85</span>
                                      <span>$115</span>
                                    </div>

                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="css-1ilpbhf ew1ym4f0">
                        <ul className="cartContentSummaryList">
                          <li className="cartContentSummaryItem isLarge">
                            <div className="summaryLabel">You saved</div>
                            <div className="summaryValue">$24.85</div>
                          </li>
                          <li className="cartContentSummaryItem isTotal">
                            <div className="summaryLabel">Subtotal</div>
                            <div className="summaryValue">$115</div>
                          </li>
                        </ul>
                      </div>

                      {/* <div className="cartContentActionsWrap">
                        <div className="css-ajj3l0 ec60on0">
                          <div className="cartContentCoupon_toggle">
                            <button id="cartCouponShowInput" className="cartContentCoupon_toggleBtn" type="button">
                              <span color="text.default" className="css-11qxqh7 e1evajc90">
                                <svg className="cartContentCoupon_toggleBtn_icon css-82n8sf eks92ln0" focusable="false" viewBox="0 0 18 18" color="text.default" aria-hidden="true">
                                  <path d="M17.464 7.941 10.05.527C9.734.211 9.312 0 8.855 0H1.687C.737 0 0 .773 0 1.687V8.89c0 .457.176.879.492 1.195l7.414 7.414c.668.668 1.757.668 2.39 0l7.168-7.168c.668-.633.668-1.722 0-2.39Zm-8.363 8.364L1.687 8.89V1.687h7.168l7.45 7.45L9.1 16.304ZM6.747 5.06A1.71 1.71 0 0 0 5.06 3.373c-.949 0-1.687.773-1.687 1.687 0 .949.738 1.687 1.687 1.687.914 0 1.687-.738 1.687-1.687Z"></path>
                                </svg>
                              </span>
                              <span>Apply coupon code</span>
                            </button>
                          </div>
                        </div>
                      </div> */}

                      <div className="css-b7b9ix eufklsc0">
                        <button type="button" className="css-tt7648 encln6v0" data-category="Cart Preview" data-action="Check Out Now" data-test="cta-check-out-now">Check out now</button>
                        <div className="cartContentCtaNotice">Shipping and taxes calculated at checkout.</div>
                      </div>

                    </div>

                    <div className="cartContentCrossSellWrap">
                      <div className="css-1msh384 e15afbn60"></div>
                    </div>

                  </div>
                </div>
              </>
            ) : (
              <div className="cartContainer_main overflow-y-scroll no-scrollbar">
                <div className="css-ium302">
                  <div className="cartContentWrap">
                    <div className="css-2i0pva evue7mt0">
                      <div className="cartEmptyTitle">
                        Oh, it appears your cart is empty
                      </div>
                      <div className="cartEmptyCta css-b7b9ix eufklsc0">
                        <button
                          type="button"
                          className="css-tt7648 encln6v0"
                          data-category="Cart Preview"
                          data-action="Check Out Now"
                          data-test="cta-check-out-now"
                        >
                          SHOP LARQ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
// todo: create cart view for mobile, use product swiper -> product options logic
export default CartDropdown
