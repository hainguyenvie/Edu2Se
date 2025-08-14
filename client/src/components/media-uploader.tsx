import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Video, 
  Image, 
  Play, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  Calendar,
  Clock
} from "lucide-react";

interface MediaItem {
  id: string;
  type: "video" | "image";
  title: string;
  url?: string;
  thumbnail: string;
  duration?: string;
  description?: string;
  uploadDate: string;
  size?: string;
}

interface MediaUploaderProps {
  mediaItems: MediaItem[];
  onMediaUpdate: (items: MediaItem[]) => void;
  isEditMode?: boolean;
}

export default function MediaUploader({ mediaItems, onMediaUpdate, isEditMode = false }: MediaUploaderProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newMedia, setNewMedia] = useState<Partial<MediaItem>>({
    type: "image",
    title: "",
    description: "",
  });

  const handleAddMedia = () => {
    if (!newMedia.title) return;
    
    const mediaItem: MediaItem = {
      id: Date.now().toString(),
      type: newMedia.type || "image",
      title: newMedia.title,
      description: newMedia.description,
      thumbnail: newMedia.type === "video" 
        ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
        : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      uploadDate: new Date().toLocaleDateString("vi-VN"),
      duration: newMedia.type === "video" ? "02:30" : undefined,
      size: newMedia.type === "image" ? "2.3 MB" : "15.7 MB"
    };

    onMediaUpdate([...mediaItems, mediaItem]);
    setNewMedia({ type: "image", title: "", description: "" });
    setIsUploadModalOpen(false);
  };

  const handleDeleteMedia = (id: string) => {
    onMediaUpdate(mediaItems.filter(item => item.id !== id));
  };

  const handleViewMedia = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsViewModalOpen(true);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Video className="w-6 h-6 mr-3" />
            My Biography - Videos & Ảnh
          </CardTitle>
          {isEditMode && (
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm media
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Thêm Video/Ảnh mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Loại media</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={newMedia.type === "image" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewMedia(prev => ({ ...prev, type: "image" }))}
                      >
                        <Image className="w-4 h-4 mr-2" />
                        Ảnh
                      </Button>
                      <Button
                        variant={newMedia.type === "video" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewMedia(prev => ({ ...prev, type: "video" }))}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Tiêu đề</Label>
                    <Input
                      value={newMedia.title}
                      onChange={(e) => setNewMedia(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Nhập tiêu đề..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Mô tả (tùy chọn)</Label>
                    <Input
                      value={newMedia.description}
                      onChange={(e) => setNewMedia(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Mô tả ngắn gọn..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Kéo thả file hoặc <span className="text-blue-600 cursor-pointer">chọn file</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {newMedia.type === "video" ? "MP4, AVI, MOV (tối đa 100MB)" : "JPG, PNG, GIF (tối đa 10MB)"}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleAddMedia}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={!newMedia.title}
                    >
                      Thêm
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsUploadModalOpen(false)}
                      className="flex-1"
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Chia sẻ những khoảnh khắc học tập, video giới thiệu và thành tích của bạn
        </p>
      </CardHeader>
      <CardContent>
        {mediaItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có media nào</h3>
            <p className="text-gray-600 mb-4">Hãy thêm video hoặc ảnh để làm phong phú hồ sơ của bạn</p>
            {isEditMode && (
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm media đầu tiên
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 border-gray-200">
                <div className="relative aspect-video">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-t-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 
                        item.type === "video" 
                          ? "https://via.placeholder.com/400x225/f3f4f6/9ca3af?text=Video"
                          : "https://via.placeholder.com/400x225/f3f4f6/9ca3af?text=Image";
                    }}
                  />
                  
                  {/* Type indicator */}
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        item.type === "video" 
                          ? "bg-red-500 text-white" 
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {item.type === "video" ? (
                        <>
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </>
                      ) : (
                        <>
                          <Image className="w-3 h-3 mr-1" />
                          Ảnh
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Duration for videos */}
                  {item.type === "video" && item.duration && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-black bg-opacity-70 text-white text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.duration}
                      </Badge>
                    </div>
                  )}

                  {/* Play button for videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => handleViewMedia(item)}
                        className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200"
                      >
                        <Play className="w-6 h-6 text-gray-700 ml-1" />
                      </button>
                    </div>
                  )}

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-t-lg">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewMedia(item)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {isEditMode && (
                          <>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteMedia(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.uploadDate}
                    </div>
                    {item.size && (
                      <span>{item.size}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View Media Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMedia?.title}</DialogTitle>
            </DialogHeader>
            {selectedMedia && (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {selectedMedia.type === "video" ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">Video player sẽ được tích hợp</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={selectedMedia.thumbnail}
                      alt={selectedMedia.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {selectedMedia.description && (
                  <div>
                    <Label className="text-sm font-semibold">Mô tả</Label>
                    <p className="text-sm text-gray-600 mt-1">{selectedMedia.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs font-semibold text-gray-500">Ngày tải lên</Label>
                    <p className="text-gray-700">{selectedMedia.uploadDate}</p>
                  </div>
                  {selectedMedia.size && (
                    <div>
                      <Label className="text-xs font-semibold text-gray-500">Kích thước</Label>
                      <p className="text-gray-700">{selectedMedia.size}</p>
                    </div>
                  )}
                  {selectedMedia.duration && (
                    <div>
                      <Label className="text-xs font-semibold text-gray-500">Thời lượng</Label>
                      <p className="text-gray-700">{selectedMedia.duration}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
