import { useState, useEffect, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX, MoreVertical, Heart, MessageCircle, Share, Bookmark, Send } from "lucide-react";
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
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
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

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
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
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Video Player Popup - Extends width when comments are open */}
      <div 
        className={`relative w-full h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
          showComments ? 'max-w-4xl' : 'max-w-sm'
        }`}
        onMouseMove={handleMouseMove}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Always stays in video section */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 text-white hover:bg-white/20 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          } ${showComments ? 'right-[336px]' : 'right-4'}`}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Main Content Area */}
        <div className="flex h-full">
          {/* Video Player */}
          <div className={`relative flex-1 flex items-center justify-center ${showComments ? 'max-w-sm' : ''}`}>
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
              className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/10 transition-opacity duration-300"
            >
              {!isPlaying && (
                <div className="bg-white/30 backdrop-blur-sm rounded-full p-6 shadow-lg">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              )}
            </Button>

            {/* Side Action Buttons (TikTok style) - Enhanced icons */}
            <div className="absolute right-3 bottom-20 flex flex-col space-y-4">
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleLike}
                  className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 p-2"
                >
                  <Heart className={`w-7 h-7 ${isLiked ? 'fill-red-500 text-red-500' : 'fill-white text-white'}`} />
                </Button>
                <span className="text-white text-xs mt-1 font-medium">123</span>
              </div>
              
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleComments}
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-bl-2xl">
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
                
                {/* Progress Bar next to speaker - extended without time */}
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
              </div>
            </div>
          </div>

          {/* Comments Section - Extends popup to the right */}
          {showComments && (
            <div className="w-80 bg-black/95 backdrop-blur-md border-l border-white/20 flex flex-col">
              {/* Comments Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <h3 className="text-white font-semibold">Bình luận</h3>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Sample comments */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">H</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Học sinh</p>
                    <p className="text-white/80 text-sm">Bài giảng rất hay và dễ hiểu!</p>
                    <span className="text-white/60 text-xs">2 phút trước</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Mai Anh</p>
                    <p className="text-white/80 text-sm">Thầy giải thích rát chi tiết, em hiểu hết rồi ạ</p>
                    <span className="text-white/60 text-xs">5 phút trước</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Tuấn</p>
                    <p className="text-white/80 text-sm">Cảm ơn thầy về bài giảng hay này</p>
                    <span className="text-white/60 text-xs">10 phút trước</span>
                  </div>
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Thêm bình luận..."
                      className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pr-12 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-8 h-8"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}