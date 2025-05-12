import Header from "@/components/header"
import Banner from "@/components/banner"
import OrderStatus from "@/components/order-status"
import ProductMenu from "@/components/product-menu"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Banner />
      <OrderStatus />
      <ProductMenu />
    </main>
  )
}
