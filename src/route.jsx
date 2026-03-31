import { RotateCcw } from "lucide-react"
import React from "react"
import { Route, Routes } from "react-router-dom"
import SafariDetails from "./pages/SafariDetails"

const HomePage = React.lazy(() => import("./pages/HomePage"))
const ContactPage = React.lazy(() => import("./pages/ContactPage"))
const AboutPage = React.lazy(() => import("./pages/AboutPage"))
const SafarisPage = React.lazy(() => import("./pages/SafarisPage"))
const DestinationPages = React.lazy(() => import("./pages/DestinationPages"))
const DestinationDetailPage = React.lazy(() => import("./pages/DestinationDetailPage"))
const BookPage = React.lazy(() => import("./pages/BookPage"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const CountryPage = React.lazy(() => import("./pages/CountryPage"))

const LazyLoader = ({ children }) => {
  return (
    <React.Suspense fallback={
      <div className="flex justify-center align-middle h-screen gap-4 text-gray-500">
        <RotateCcw />
        <div>Loading</div>
      </div>
    }>
      {children}
    </React.Suspense>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LazyLoader><HomePage /></LazyLoader>} />
      <Route path="/contact" element={<LazyLoader><ContactPage /></LazyLoader>} />
      <Route path="/about" element={<LazyLoader><AboutPage /></LazyLoader>} />
      <Route path="/safaris" element={<LazyLoader><SafarisPage /></LazyLoader>} />
      <Route path="/destinations" element={<LazyLoader><DestinationPages /></LazyLoader>} />
      <Route path="/destinations/:TAG" element={<LazyLoader><DestinationDetailPage /></LazyLoader>} />
      <Route path="/destinations/country/:country" element={<LazyLoader><CountryPage /></LazyLoader>} />
      <Route path="/safaris/:id" element={<LazyLoader><SafariDetails /></LazyLoader>} />
      <Route path="/bookings" element={<LazyLoader><BookPage /></LazyLoader>} />
      <Route path="*" element={<LazyLoader><ErrorPage /></LazyLoader>} />
    </Routes>
  )
}

export default App