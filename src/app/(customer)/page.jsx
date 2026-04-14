import React from 'react';
import BrandShowcase from '@/components/customer/BrandShowcase/BrandShowcase';
import Collection from '@/components/customer/Collection/Collection';
import FaqSection from '@/components/customer/FaqSection/FaqSection';
import Hero from '@/components/customer/Hero/Hero';
import NewArrival from '@/components/customer/NewArrival/NewArrival';
import TopCategories from '@/components/customer/TopCategories/TopCategories';
import TrendingProducts from '@/components/customer/TrendingProducts/TrendingProducts';
import FeaturedProducts from '@/components/customer/FeaturedProducts/FeaturedProducts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function page() {
  return (
    <div className="space-y-0">
      <Hero />
      <Collection />
      <TrendingProducts />
      <NewArrival />
      <FeaturedProducts/>
      <BrandShowcase />
      <TopCategories />
      <FaqSection />
    </div>
  );
}