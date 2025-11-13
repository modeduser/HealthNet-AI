import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Clock, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  patientName: string;
  age: number;
  location: string;
  symptoms: string;
  urgency: "high" | "medium" | "low";
  timeAgo: string;
  onAccept: () => void;
  onRequestDetails: () => void;
  onMarkTreated: () => void;
}

const CaseCard = ({
  patientName,
  age,
  location,
  symptoms,
  urgency,
  timeAgo,
  onAccept,
  onRequestDetails,
  onMarkTreated,
}: CaseCardProps) => {
  const urgencyConfig = {
    high: {
      icon: AlertCircle,
      color: "text-risk-high",
      bgColor: "bg-risk-high/10",
      badgeVariant: "destructive" as const,
      label: "High Urgency",
    },
    medium: {
      icon: AlertTriangle,
      color: "text-risk-medium",
      bgColor: "bg-risk-medium/10",
      badgeVariant: "default" as const,
      label: "Medium Urgency",
    },
    low: {
      icon: CheckCircle,
      color: "text-risk-low",
      bgColor: "bg-risk-low/10",
      badgeVariant: "secondary" as const,
      label: "Low Urgency",
    },
  };

  const config = urgencyConfig[urgency];
  const Icon = config.icon;

  return (
    <Card className={cn("p-6 border-l-4 hover:shadow-card transition-shadow", 
      urgency === "high" && "border-l-risk-high",
      urgency === "medium" && "border-l-risk-medium",
      urgency === "low" && "border-l-risk-low"
    )}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={cn("p-2 rounded-full", config.bgColor)}>
              <Icon className={cn("w-5 h-5", config.color)} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-foreground">{patientName}</h3>
                <Badge variant={config.badgeVariant} className="text-xs">
                  {config.label}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {age} years
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {timeAgo}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Symptoms:</p>
          <p className="text-sm text-muted-foreground">{symptoms}</p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={onAccept}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            size="sm"
          >
            Accept Case
          </Button>
          <Button 
            onClick={onRequestDetails}
            variant="outline"
            size="sm"
          >
            Request Details
          </Button>
          <Button 
            onClick={onMarkTreated}
            variant="ghost"
            size="sm"
          >
            Mark Treated
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CaseCard;
