import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Tutor } from "@shared/schema";
import { Star, Heart, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface TutorCardProps {
  tutor: Tutor;
  onClick?: () => void;
}

export default function TutorCard({ tutor, onClick }: TutorCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);



  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // TODO: Implement favorite functionality
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500 text-white">ONLINE</Badge>;
      case 'busy':
        return <Badge className="bg-red-500 text-white">BẬN</Badge>;
      default:
        return null;
    }
  };

  const getStatusButton = () => {
    if (tutor.status === 'busy') {
      return (
        <Button variant="secondary" disabled className="w-full text-sm">
          {tutor.status === 'busy' ? 'Đang bận' : 'Chờ phản hồi'}
        </Button>
      );
    }
    return (
      <Button 
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick();
          }
        }} 
        className="w-full text-sm bg-primary hover:bg-primary/90"
      >
        Xem thêm
      </Button>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden tutor-card-hover cursor-pointer"
      >
      <div className="relative">
        <img
          src={tutor.profileImage || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop`}
          alt={tutor.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge(tutor.status)}
        </div>
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className="text-white hover:text-red-400 transition-colors"
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-400 text-red-400' : ''}`} />
          </Button>
        </div>
        {tutor.isTopRated && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-yellow-500 text-white">TOP RATED</Badge>
          </div>
        )}
        {tutor.isVerified && !tutor.isTopRated && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-blue-600 text-white flex items-center gap-2 px-3 py-1 rounded-full">
              <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="w-2.5 h-2.5 fill-current text-white" />
              </div>
              VERIFIED
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900">{tutor.name}</h3>
          <p className="text-sm text-gray-600">
            {tutor.subjects.join(', ')} • {tutor.grades.join(', ')} • {tutor.education}
          </p>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(parseFloat(tutor.rating || "0"))
                    ? 'fill-current'
                    : ''
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {tutor.rating} ({tutor.reviewCount} đánh giá)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(tutor.pricePerHour)}₫
            </span>
            <span className="text-sm text-gray-600">/giờ</span>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {getStatusButton()}
          </div>
        </div>
      </div>
    </div>
  );
}
