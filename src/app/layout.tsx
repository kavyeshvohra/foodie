import Header from "@/components/Header/Header"
import './index.css'
import { Metadata } from "next"
import StoreContextProvider from '../context/StoreContext'
import Footer  from "../components/Footer/Footer"
export const metadata: Metadata = {
  title: {
    default: "Foodie - Order Food Online",
    template:"%s | Just For Fun",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreContextProvider>
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="icon" href="/favicon-32x32.png"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
      </head>
      <body>
        <div className="main-content">
        <Header/>
          {children}
        </div>
      <Footer/>
      </body>
    </html>
    </StoreContextProvider>
  )
}
