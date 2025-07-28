import { useState, useEffect } from "react";
import { BANNER_CONFIG } from "@/config/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AutoRotatingBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = BANNER_CONFIG.BANNERS;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, BANNER_CONFIG.AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentBanner(index);
  };

  const banner = banners[currentBanner];

  return (
    <div className="relative mx-4 mt-4 rounded-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${banner.gradient} ${banner.textColor} p-6 transition-all duration-500`}>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{banner.title}</h2>
          <p className={banner.subtitleColor}>
            {banner.subtitle}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentBanner 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}