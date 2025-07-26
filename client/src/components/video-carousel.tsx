import { useQuery } from "@tanstack/react-query";
import { type Video } from "@shared/schema";
import { Play } from "lucide-react";

export default function VideoCarousel() {
  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  const handleVideoClick = (video: Video) => {
    console.log('Video clicked:', video.title);
    // TODO: Implement video playback modal
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Video từ gia sư</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-story"
            style={{ backgroundColor: video.thumbnailColor }}
            onClick={() => handleVideoClick(video)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs font-medium text-center">
                {video.subject}
              </p>
              <p className="text-white text-xs opacity-80 text-center">
                {video.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
