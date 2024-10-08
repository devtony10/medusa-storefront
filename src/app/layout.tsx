import { Metadata } from "next"

import 'swiper/css';
import "styles/globals.css"
import "styles/styles.barrel"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8001"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Nav />
        <main className="relative">{props.children}</main>
        <Footer />
      </body>
    </html>
  )
}
