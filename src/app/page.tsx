import HeroSlideshow from "@/components/HeroSlideshow";
import HomeSections from "@/components/HomeSections";
import { IMAGES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <HeroSlideshow images={IMAGES.hero} />
      <HomeSections />
    </>
  );
}
