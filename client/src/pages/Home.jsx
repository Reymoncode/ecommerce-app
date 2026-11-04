import Hero from '../components/home/Hero';
import CategoryTiles from '../components/home/CategoryTiles';
import BestSellers from '../components/home/BestSellers';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <BestSellers />
    </>
  );
}