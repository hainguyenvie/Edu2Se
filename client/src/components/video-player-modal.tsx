import { useState, useEffect, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX, MoreVertical, Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerModalProps {
  video: {
    id: string;
    tutor: string;
    videoUrl: string;
    thumbnail: string;
    subject?: string;
    duration?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      setCurrentTime(currentTime);
      setDuration(duration);
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      const newTime = (newProgress / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Video Player Popup - Vertical/Portrait orientation */}
      <div 
        className="relative w-full max-w-sm h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
        onMouseMove={handleMouseMove}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 text-white hover:bg-white/20 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Video Player */}
        <div className="relative flex-1 flex items-center justify-center">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover"
            loop
            playsInline
            poster={video.thumbnail}
            style={{ aspectRatio: '9/16' }}
          />

          {/* Center Play/Pause Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className={`absolute inset-0 w-full h-full bg-transparent hover:bg-black/10 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {!isPlaying && (
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            )}
          </Button>


        </div>

        {/* Side Action Buttons (TikTok style) - Enhanced icons */}
        <div className="absolute right-3 bottom-20 flex flex-col space-y-4">
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 p-2"
            >
              <Heart className="w-7 h-7 fill-white" />
            </Button>
            <span className="text-white text-xs mt-1 font-medium">123</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 p-2"
            >
              <MessageCircle className="w-7 h-7" />
            </Button>
            <span className="text-white text-xs mt-1 font-medium">45</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 p-2"
            >
              <Bookmark className="w-7 h-7" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 p-2"
            >
              <Share className="w-7 h-7" />
            </Button>
          </div>
        </div>

        {/* Bottom Controls & Info - Full width gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-2xl">
          {/* Tutor Info - positioned lower */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {video.tutor.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold text-xs">{video.tutor}</p>
              <p className="text-white/70 text-[10px]">Gia sư • Bài giảng</p>
            </div>
          </div>

          {/* Volume Control and Progress Bar - properly aligned */}
          <div className="flex items-center space-x-3 pr-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-white hover:bg-white/20 w-8 h-8 flex-shrink-0 p-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            {/* Progress Bar next to speaker - same line alignment */}
            <div className="flex-1 flex items-center">
              <div 
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Time display on same line */}
            <div className="flex items-center space-x-2 text-white text-[10px] min-w-[60px]">
              <span>{formatTime(currentTime)}</span>
              <span>:</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}