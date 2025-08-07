import { useQuery } from "@tanstack/react-query";
import { type Video } from "@shared/schema";
import { Play, Clock, User } from "lucide-react";
import { SUBJECT_COLORS } from "@/config/constants";
import { useState } from "react";
import VideoPlayerModal from "./video-player-modal";

// Demo video data to fill the carousel
const demoVideos = [
  { 
    subject: 'Toán', 
    duration: '5:30', 
    tutor: 'Thầy Minh', 
    color: SUBJECT_COLORS.Calculator,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=300&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  { 
    subject: 'Văn', 
    duration: '3:20', 
    tutor: 'Cô Lan', 
    color: SUBJECT_COLORS.Book,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  { 
    subject: 'Anh', 
    duration: '7:15', 
    tutor: 'Ms. Sarah', 
    color: SUBJECT_COLORS.Languages,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=300&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  { 
    subject: 'Lý', 
    duration: '4:45', 
    tutor: 'Thầy Đức', 
    color: SUBJECT_COLORS.Zap,
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=200&h=300&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  { 
    subject: 'Hóa', 
    duration: '6:20', 
    tutor: 'Cô Mai', 
    color: SUBJECT_COLORS.Beaker,
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=300&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  { 
    subject: 'Sinh', 
    duration: '5:50', 
    tutor: 'Thầy Nam', 
    color: SUBJECT_COLORS.Leaf,
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=300&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  },
];

export default function VideoCarousel() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Combine real videos with demo videos
  const allVideos = [
    ...videos.map(video => ({
      id: video.id,
      subject: video.subject,
      duration: video.duration,
      tutor: 'Gia sư',
      color: video.thumbnailColor,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=300&fit=crop&crop=center',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    })),
    ...demoVideos.map((demo, index) => ({
      id: `demo-${index}`,
      subject: demo.subject,
      duration: demo.duration,
      tutor: demo.tutor,
      color: demo.color,
      thumbnail: demo.thumbnail,
      videoUrl: demo.videoUrl
    }))
  ];

  return (
    <div className="p-4">
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {allVideos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-24 h-32 rounded-xl relative cursor-pointer transition-transform hover:scale-105 shadow-md"
            style={{ backgroundColor: video.color }}
            onClick={() => handleVideoClick(video)}
          >
            {/* Thumbnail Image */}
            <img 
              src={video.thumbnail} 
              alt={`${video.tutor} video`}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            
            {/* Tutor Info at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 backdrop-blur-sm rounded-b-xl">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">
                    {video.tutor.charAt(0)}
                  </span>
                </div>
                <p className="text-white text-[10px] font-medium truncate">
                  {video.tutor}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
