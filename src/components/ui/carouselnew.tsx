"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2500 }),
  ]);

  const slides = [
    "/images/book1.jpg",
    "/images/book2.jpg",
    "/images/book3.jpg",
    "/images/book4.jpg",
  ];

  return (
    <div
      className="embla w-full rounded-xl overflow-hidden shadow-lg"
      ref={emblaRef}
    >
      <div className="embla__container flex">
        {slides.map((src, index) => (
          <div
            className="embla__slide min-w-full relative h-[350px]"
            key={index}
          >
            <Image
              src={src}
              alt="Carousel Image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
