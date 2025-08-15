import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  BookOpen, 
  Link, 
  Award, 
  Plus,
  Edit, 
  Trash2, 
  Calendar,
  ExternalLink,
  Quote,
  Target,
  Trophy,
  Lightbulb
} from "lucide-react";

interface ContentItem {
  id: string;
  type: "article" | "achievement" | "link" | "quote" | "goal" | "tip";
  title: string;
  content: string;
  url?: string;
  date: string;
  category?: string;
  featured?: boolean;
}

interface ContentManagerProps {
  contentItems: ContentItem[];
  onContentUpdate: (items: ContentItem[]) => void;
  isEditMode?: boolean;
}

const contentTypeConfig = {
  article: {
    icon: FileText,
    label: "Bài viết",
    color: "bg-blue-100 text-blue-800",
    placeholder: "Chia sẻ kinh nghiệm học tập, phương pháp học hiệu quả..."
  },
  achievement: {
    icon: Trophy,
    label: "Thành tích",
    color: "bg-yellow-100 text-yellow-800",
    placeholder: "Mô tả thành tích, giải thưởng, chứng chỉ..."
  },
  link: {
    icon: Link,
    label: "Liên kết",
    color: "bg-green-100 text-green-800",
    placeholder: "Chia sẻ các tài liệu, website hữu ích..."
  },
  quote: {
    icon: Quote,
    label: "Câu nói",
    color: "bg-purple-100 text-purple-800",
    placeholder: "Câu nói truyền cảm hứng, motto học tập..."
  },
  goal: {
    icon: Target,
    label: "Mục tiêu",
    color: "bg-red-100 text-red-800",
    placeholder: "Mục tiêu học tập, kế hoạch phát triển..."
  },
  tip: {
    icon: Lightbulb,
    label: "Mẹo hay",
    color: "bg-orange-100 text-orange-800",
    placeholder: "Chia sẻ mẹo học tập, kinh nghiệm hay..."
  }
};

export default function ContentManager({ contentItems, onContentUpdate, isEditMode = false }: ContentManagerProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({
    type: "article",
    title: "",
    content: "",
    url: "",
    category: "",
    featured: false
  });

  const handleAddContent = () => {
    if (!newContent.title || !newContent.content) return;
    
    const contentItem: ContentItem = {
      id: Date.now().toString(),
      type: newContent.type as ContentItem["type"],
      title: newContent.title,
      content: newContent.content,
      url: newContent.url,
      date: new Date().toLocaleDateString("vi-VN"),
      category: newContent.category || "Khác",
      featured: newContent.featured || false
    };

    onContentUpdate([...contentItems, contentItem]);
    setNewContent({ type: "article", title: "", content: "", url: "", category: "", featured: false });
    setIsCreateModalOpen(false);
  };

  const handleUpdateContent = () => {
    if (!editingItem || !newContent.title || !newContent.content) return;
    
    const updatedItems = contentItems.map(item => 
      item.id === editingItem.id 
        ? { ...item, ...newContent, date: item.date } // Keep original date
        : item
    );
    
    onContentUpdate(updatedItems);
    setEditingItem(null);
    setNewContent({ type: "article", title: "", content: "", url: "", category: "", featured: false });
  };

  const handleDeleteContent = (id: string) => {
    onContentUpdate(contentItems.filter(item => item.id !== id));
  };

  const handleEditContent = (item: ContentItem) => {
    setEditingItem(item);
    setNewContent({
      type: item.type,
      title: item.title,
      content: item.content,
      url: item.url,
      category: item.category,
      featured: item.featured
    });
  };

  const groupedContent = contentItems.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const ContentDialog = ({ isEdit = false }: { isEdit?: boolean }) => (
    <Dialog 
      open={isEdit ? !!editingItem : isCreateModalOpen} 
      onOpenChange={isEdit ? (open) => !open && setEditingItem(null) : setIsCreateModalOpen}
    >
      {!isEdit && (
        <DialogTrigger asChild>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Thêm nội dung
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa nội dung" : "Thêm nội dung mới"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Loại nội dung</Label>
            <Select 
              value={newContent.type} 
              onValueChange={(value) => setNewContent(prev => ({ ...prev, type: value as ContentItem["type"] }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(contentTypeConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-2" />
                        {config.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Tiêu đề</Label>
            <Input
              value={newContent.title}
              onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Nhập tiêu đề..."
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Nội dung</Label>
            <Textarea
              value={newContent.content}
              onChange={(e) => setNewContent(prev => ({ ...prev, content: e.target.value }))}
              placeholder={contentTypeConfig[newContent.type as keyof typeof contentTypeConfig]?.placeholder}
              className="mt-1 min-h-[120px]"
            />
          </div>
          
          {(newContent.type === "link" || newContent.type === "achievement") && (
            <div>
              <Label>Liên kết {newContent.type === "link" ? "(bắt buộc)" : "(tùy chọn)"}</Label>
              <Input
                value={newContent.url}
                onChange={(e) => setNewContent(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://..."
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <Label>Danh mục</Label>
            <Input
              value={newContent.category}
              onChange={(e) => setNewContent(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Ví dụ: Học tập, Thi cử, Kỹ năng..."
              className="mt-1"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={newContent.featured}
              onChange={(e) => setNewContent(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="featured" className="text-sm">Đánh dấu là nội dung nổi bật</Label>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={isEdit ? handleUpdateContent : handleAddContent}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!newContent.title || !newContent.content}
            >
              {isEdit ? "Cập nhật" : "Thêm"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                if (isEdit) {
                  setEditingItem(null);
                } else {
                  setIsCreateModalOpen(false);
                }
                setNewContent({ type: "article", title: "", content: "", url: "", category: "", featured: false });
              }}
              className="flex-1"
            >
              Hủy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <FileText className="w-6 h-6 mr-3" />
            My Biography - Nội dung khác
          </CardTitle>
          {isEditMode && <ContentDialog />}
        </div>
        <p className="text-sm text-gray-600">
          Chia sẻ bài viết, thành tích, mục tiêu và những nội dung khác về bản thân
        </p>
      </CardHeader>
      <CardContent>
        {contentItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có nội dung nào</h3>
            <p className="text-gray-600 mb-4">Hãy thêm bài viết, thành tích hoặc nội dung khác để làm phong phú hồ sơ</p>
            {isEditMode && (
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm nội dung đầu tiên
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured Content */}
            {contentItems.some(item => item.featured) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Nội dung nổi bật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {contentItems.filter(item => item.featured).map((item) => {
                    const config = contentTypeConfig[item.type];
                    const Icon = config.icon;
                    
                    return (
                      <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 border-yellow-200 bg-yellow-50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="p-1 bg-yellow-100 rounded">
                                <Icon className="w-4 h-4 text-yellow-600" />
                              </div>
                              <Badge className={config.color}>
                                {config.label}
                              </Badge>
                            </div>
                            {isEditMode && (
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEditContent(item)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteContent(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                            {item.title}
                          </h4>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                            {item.content}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.date}
                            </div>
                            {item.url && (
                              <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-700"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content by Type */}
            {Object.entries(groupedContent).map(([type, items]) => {
              const config = contentTypeConfig[type as keyof typeof contentTypeConfig];
              const Icon = config.icon;
              
              return (
                <div key={type}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Icon className="w-5 h-5 mr-2" />
                    {config.label} ({items.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {items.filter(item => !item.featured).map((item) => (
                      <Card key={item.id} className="group hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={config.color}>
                                {config.label}
                              </Badge>
                              {item.category && (
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                              )}
                            </div>
                            {isEditMode && (
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleEditContent(item)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteContent(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h4>
                          
                          <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">
                            {item.content}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.date}
                            </div>
                            {item.url && (
                              <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-700"
                              >
                                <span className="mr-1">Xem thêm</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Modal */}
        {editingItem && <ContentDialog isEdit />}
      </CardContent>
    </Card>
  );
}
