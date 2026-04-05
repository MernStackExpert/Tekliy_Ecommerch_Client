import BrandShowcase from '@/components/customer/BrandShowcase/BrandShowcase'
import Collection from '@/components/customer/Collection/Collection'
import FaqSection from '@/components/customer/FaqSection/FaqSection'
import Hero from '@/components/customer/Hero/Hero'
import NewArrival from '@/components/customer/NewArrival/NewArrival'
import TopCategories from '@/components/customer/TopCategories/TopCategories'
import TrendingProducts from '@/components/customer/TrendingProducts/TrendingProducts'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero/>
      <Collection/>
      <TrendingProducts/>
      <NewArrival/>
      <BrandShowcase/>
      <TopCategories/>
      <FaqSection/>
    </div>
  )
}
