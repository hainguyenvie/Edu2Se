import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Clock,
  Target,
  GraduationCap,
  FileText,
  Video,
  Download,
  Eye,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  Copy,
  Star
} from "lucide-react";
import type { Curriculum, CurriculumTopicData } from "@shared/types";

interface CurriculumManagerProps {
  tutorId: string;
  onCurriculumUpdate?: () => void;
}

export default function CurriculumManager({ tutorId, onCurriculumUpdate }: CurriculumManagerProps) {
  const { toast } = useToast();
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
  const [editingCurriculum, setEditingCurriculum] = useState<Curriculum | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());

  // Mock data for demonstration
  useEffect(() => {
    const mockCurriculums: Curriculum[] = [
      {
        id: "1",
        tutorId,
        subjectName: "Toán",
        grade: "Lớp 12",
        title: "Toán Cấp Tốc - Ôn Thi Đại Học",
        description: "Khóa học tổng hợp toàn bộ kiến thức Toán 12 cho kỳ thi Đại học",
        difficulty: "advanced",
        estimatedHours: 40,
        price: 800000,
        isActive: true,
        createdAt: new Date(),
        topics: [
          {
            title: "Hàm số và đồ thị",
            description: "Các dạng hàm số cơ bản và cách vẽ đồ thị",
            order: 1,
            estimatedMinutes: 120,
            objectives: ["Hiểu khái niệm hàm số", "Vẽ được đồ thị cơ bản", "Phân tích tính chất hàm"],
            resources: {
              videos: ["video1.mp4", "video2.mp4"],
              documents: ["bai-tap-ham-so.pdf"],
              exercises: ["50 bài tập hàm số"]
            }
          },
          {
            title: "Đạo hàm và ứng dụng",
            description: "Quy tắc tính đạo hàm và các ứng dụng thực tế",
            order: 2,
            estimatedMinutes: 150,
            objectives: ["Tính đạo hàm thành thạo", "Ứng dụng trong bài toán thực tế", "Giải phương trình đạo hàm"],
            resources: {
              videos: ["dao-ham-co-ban.mp4"],
              documents: ["ly-thuyet-dao-ham.pdf", "bai-tap-dao-ham.pdf"],
              exercises: ["100 bài tập đạo hàm"]
            }
          }
        ]
      },
      {
        id: "2",
        tutorId,
        subjectName: "Lý",
        grade: "Lớp 11",
        title: "Vật Lý Cơ Bản - Nền Tảng Vững Chắc",
        description: "Xây dựng nền tảng vật lý từ cơ bản đến nâng cao",
        difficulty: "intermediate",
        estimatedHours: 30,
        price: 600000,
        isActive: true,
        createdAt: new Date(),
        topics: [
          {
            title: "Động học chất điểm",
            description: "Nghiên cứu chuyển động của các vật thể",
            order: 1,
            estimatedMinutes: 90,
            objectives: ["Hiểu các loại chuyển động", "Tính toán vận tốc, gia tốc", "Giải bài tập chuyển động"],
            resources: {
              videos: ["dong-hoc-co-ban.mp4"],
              documents: ["dong-hoc-ly-thuyet.pdf"],
              exercises: ["Bài tập động học"]
            }
          }
        ]
      }
    ];
    setCurriculums(mockCurriculums);
  }, [tutorId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Cơ bản';
      case 'intermediate': return 'Trung bình';
      case 'advanced': return 'Nâng cao';
      default: return 'Không xác định';
    }
  };

  const toggleTopicExpansion = (index: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const handleCreateCurriculum = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditCurriculum = (curriculum: Curriculum) => {
    setEditingCurriculum(curriculum);
    setIsEditModalOpen(true);
  };

  const handleDeleteCurriculum = (curriculumId: string) => {
    setCurriculums(prev => prev.filter(c => c.id !== curriculumId));
    toast({
      title: "Đã xóa chương trình học",
      description: "Chương trình học đã được xóa thành công"
    });
  };

  const handleDuplicateCurriculum = (curriculum: Curriculum) => {
    const newCurriculum: Curriculum = {
      ...curriculum,
      id: Date.now().toString(),
      title: `${curriculum.title} (Bản sao)`,
      createdAt: new Date()
    };
    setCurriculums(prev => [...prev, newCurriculum]);
    toast({
      title: "Đã sao chép chương trình học",
      description: "Chương trình học đã được sao chép thành công"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            Quản lý Chương trình học
          </h2>
          <p className="text-gray-600 mt-1">
            Tạo và quản lý các chương trình học cho học sinh của bạn
          </p>
        </div>
        <Button onClick={handleCreateCurriculum} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Tạo chương trình mới
        </Button>
      </div>

      {/* Curriculum List */}
      <div className="grid gap-6">
        {curriculums.map((curriculum) => (
          <Card key={curriculum.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{curriculum.title}</CardTitle>
                    <Badge className={getDifficultyColor(curriculum.difficulty)}>
                      {getDifficultyLabel(curriculum.difficulty)}
                    </Badge>
                    {!curriculum.isActive && (
                      <Badge variant="secondary">Đã tắt</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {curriculum.subjectName} - {curriculum.grade}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {curriculum.estimatedHours}h
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {curriculum.topics.length} chủ đề
                    </span>
                    {curriculum.price && (
                      <span className="font-semibold text-green-600">
                        {formatCurrency(curriculum.price)}
                      </span>
                    )}
                  </div>
                  {curriculum.description && (
                    <p className="text-gray-700 text-sm">{curriculum.description}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleDuplicateCurriculum(curriculum)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEditCurriculum(curriculum)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedCurriculum(curriculum)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteCurriculum(curriculum.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tiến độ hoàn thành</span>
                  <span className="font-medium">0/{curriculum.topics.length}</span>
                </div>
                <Progress value={0} className="h-2" />
                
                <div className="space-y-2">
                  {curriculum.topics.slice(0, 3).map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{topic.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {formatTime(topic.estimatedMinutes || 60)}
                      </Badge>
                    </div>
                  ))}
                  {curriculum.topics.length > 3 && (
                    <div className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedCurriculum(curriculum)}
                      >
                        Xem thêm {curriculum.topics.length - 3} chủ đề khác
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {curriculums.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Chưa có chương trình học nào
            </h3>
            <p className="text-gray-500 mb-4">
              Hãy tạo chương trình học đầu tiên để bắt đầu dạy học
            </p>
            <Button onClick={handleCreateCurriculum} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Tạo chương trình đầu tiên
            </Button>
          </Card>
        )}
      </div>

      {/* Curriculum Detail Modal */}
      {selectedCurriculum && (
        <CurriculumDetailModal
          curriculum={selectedCurriculum}
          isOpen={!!selectedCurriculum}
          onClose={() => setSelectedCurriculum(null)}
        />
      )}

      {/* Create/Edit Modals would be implemented here */}
    </div>
  );
}

// Curriculum Detail Modal Component
function CurriculumDetailModal({ 
  curriculum, 
  isOpen, 
  onClose 
}: { 
  curriculum: Curriculum; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());

  const toggleTopicExpansion = (index: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{curriculum.title}</DialogTitle>
          <p className="text-gray-600">{curriculum.description}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Curriculum Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <GraduationCap className="w-6 h-6 mx-auto text-blue-600 mb-1" />
              <div className="text-sm font-medium">{curriculum.subjectName}</div>
              <div className="text-xs text-gray-600">{curriculum.grade}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto text-green-600 mb-1" />
              <div className="text-sm font-medium">{curriculum.estimatedHours}h</div>
              <div className="text-xs text-gray-600">Tổng thời gian</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Target className="w-6 h-6 mx-auto text-yellow-600 mb-1" />
              <div className="text-sm font-medium">{curriculum.topics.length}</div>
              <div className="text-xs text-gray-600">Chủ đề</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Star className="w-6 h-6 mx-auto text-purple-600 mb-1" />
              <div className="text-sm font-medium">
                {curriculum.difficulty === 'beginner' ? 'Cơ bản' : 
                 curriculum.difficulty === 'intermediate' ? 'Trung bình' : 'Nâng cao'}
              </div>
              <div className="text-xs text-gray-600">Độ khó</div>
            </div>
          </div>

          {/* Topics List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nội dung chương trình</h3>
            <div className="space-y-3">
              {curriculum.topics.map((topic, index) => (
                <Card key={index} className="overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleTopicExpansion(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {topic.order}
                          </div>
                          <div>
                            <h4 className="font-medium">{topic.title}</h4>
                            <p className="text-sm text-gray-600">{topic.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {formatTime(topic.estimatedMinutes || 60)}
                        </Badge>
                        {expandedTopics.has(index) ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedTopics.has(index) && (
                    <div className="border-t bg-gray-50 p-4">
                      <div className="space-y-4">
                        {/* Objectives */}
                        {topic.objectives && topic.objectives.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2 flex items-center">
                              <Target className="w-4 h-4 mr-2" />
                              Mục tiêu học tập
                            </h5>
                            <ul className="space-y-1">
                              {topic.objectives.map((objective, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {objective}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Resources */}
                        {topic.resources && (
                          <div>
                            <h5 className="font-medium mb-2 flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              Tài liệu học tập
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {topic.resources.videos && topic.resources.videos.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-600 mb-1">Video bài giảng</p>
                                  {topic.resources.videos.map((video: string, idx: number) => (
                                    <div key={idx} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                      <Video className="w-3 h-3 mr-1" />
                                      {video}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {topic.resources.documents && topic.resources.documents.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-600 mb-1">Tài liệu</p>
                                  {topic.resources.documents.map((doc: string, idx: number) => (
                                    <div key={idx} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                      <FileText className="w-3 h-3 mr-1" />
                                      {doc}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {topic.resources.exercises && topic.resources.exercises.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-600 mb-1">Bài tập</p>
                                  {topic.resources.exercises.map((exercise: string, idx: number) => (
                                    <div key={idx} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                                      <FileText className="w-3 h-3 mr-1" />
                                      {exercise}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Đóng</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Chỉnh sửa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
