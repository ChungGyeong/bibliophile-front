import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  isThin: boolean;
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isThin, percent }) => {
  return <Progress value={percent} isThin={isThin} />;
};

export default ProgressBar;
