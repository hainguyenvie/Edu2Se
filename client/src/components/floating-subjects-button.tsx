import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import SubjectsOverlay from "@/components/subjects-overlay";

interface FloatingSubjectsButtonProps {
  onSubjectSelect: (subject: string) => void;
  className?: string;
}

export default function FloatingSubjectsButton({ onSubjectSelect, className }: FloatingSubjectsButtonProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSubjectSelect = (subject: string) => {
    onSubjectSelect(subject);
    setShowOverlay(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowOverlay(true)}
        className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Môn học
      </Button>

      <SubjectsOverlay
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        onSubjectSelect={handleSubjectSelect}
      />
    </>
  );
}