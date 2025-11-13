import { Card } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskCardProps {
  level: "high" | "medium" | "low";
  recommendation: string;
  className?: string;
}

const RiskCard = ({ level, recommendation, className }: RiskCardProps) => {
  const configs = {
    high: {
      icon: AlertCircle,
      bgColor: "bg-risk-high/10",
      borderColor: "border-risk-high",
      textColor: "text-risk-high",
      title: "High Risk",
    },
    medium: {
      icon: AlertTriangle,
      bgColor: "bg-risk-medium/10",
      borderColor: "border-risk-medium",
      textColor: "text-risk-medium",
      title: "Medium Risk",
    },
    low: {
      icon: CheckCircle,
      bgColor: "bg-risk-low/10",
      borderColor: "border-risk-low",
      textColor: "text-risk-low",
      title: "Low Risk",
    },
  };

  const config = configs[level];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "border-2 p-6",
      config.bgColor,
      config.borderColor,
      className
    )}>
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-full", config.bgColor)}>
          <Icon className={cn("w-6 h-6", config.textColor)} />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className={cn("text-xl font-semibold", config.textColor)}>
            {config.title}
          </h3>
          <p className="text-foreground leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RiskCard;
