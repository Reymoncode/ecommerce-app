import Hero from '../components/home/Hero';
import CategoryTiles from '../components/home/CategoryTiles';
import BestSellers from '../components/home/BestSellers';
import PromoBanner from '../components/home/PromoBanner';
import HowItWorks from '../components/home/HowItWorks';
import TrustStrip from '../components/home/TrustStrip';
import { useScrollToHash } from '../hooks/useScrollToHash';

export default function Home() {
  useScrollToHash();

  return (
    <>
      <Hero />
      <CategoryTiles />
      <BestSellers />
      <PromoBanner />
      <HowItWorks />
      <TrustStrip />
    </>
  );
}