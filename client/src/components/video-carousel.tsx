import { useQuery } from "@tanstack/react-query";
import { type Video } from "@shared/schema";
import { Play, Clock, User } from "lucide-react";
import { SUBJECT_COLORS } from "@/config/constants";

// Demo video data to fill the carousel
const demoVideos = [
  { subject: 'Toán', duration: '5:30', tutor: 'Thầy Minh', color: SUBJECT_COLORS.Calculator },
  { subject: 'Văn', duration: '3:20', tutor: 'Cô Lan', color: SUBJECT_COLORS.Book },
  { subject: 'Anh', duration: '7:15', tutor: 'Ms. Sarah', color: SUBJECT_COLORS.Languages },
  { subject: 'Lý', duration: '4:45', tutor: 'Thầy Đức', color: SUBJECT_COLORS.Zap },
  { subject: 'Hóa', duration: '6:20', tutor: 'Cô Mai', color: SUBJECT_COLORS.Beaker },
  { subject: 'Sinh', duration: '5:50', tutor: 'Thầy Nam', color: SUBJECT_COLORS.Leaf },
];

export default function VideoCarousel() {
  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  const handleVideoClick = (video: any) => {
    console.log('Video clicked:', video.subject);
    // TODO: Implement video playback modal
  };

  // Combine real videos with demo videos
  const allVideos = [
    ...videos.map(video => ({
      id: video.id,
      subject: video.subject,
      duration: video.duration,
      tutor: 'Gia sư',
      color: video.thumbnailColor
    })),
    ...demoVideos.map((demo, index) => ({
      id: `demo-${index}`,
      subject: demo.subject,
      duration: demo.duration,
      tutor: demo.tutor,
      color: demo.color
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
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 rounded-xl"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            
            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white text-xs font-semibold text-center leading-tight">
                {video.subject}
              </p>
              <div className="flex items-center justify-center mt-1 space-x-1">
                <Clock className="w-2.5 h-2.5 text-white/80" />
                <p className="text-white/80 text-[10px]">
                  {video.duration}
                </p>
              </div>
            </div>
            
            {/* Tutor Badge */}
            <div className="absolute top-1 right-1">
              <div className="bg-black/30 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                <p className="text-white text-[9px] font-medium">
                  {video.tutor}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
