import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  isThin: boolean;
  readingPercent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isThin, readingPercent }) => {
  return <Progress value={readingPercent} isThin={isThin} />;
};

export default ProgressBar;
