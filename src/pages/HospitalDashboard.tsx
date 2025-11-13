import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Activity, ArrowLeft, AlertTriangle, X } from "lucide-react";
import CaseCard from "@/components/CaseCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Case {
  id: string;
  patientName: string;
  age: number;
  location: string;
  symptoms: string;
  urgency: "high" | "medium" | "low";
  timeAgo: string;
}

const mockCases: Case[] = [
  {
    id: "1",
    patientName: "John Doe",
    age: 45,
    location: "Rural Clinic A",
    symptoms: "Severe chest pain, difficulty breathing, sweating",
    urgency: "high",
    timeAgo: "5 mins ago",
  },
  {
    id: "2",
    patientName: "Sarah Smith",
    age: 32,
    location: "Health Post B",
    symptoms: "High fever (103°F), persistent headache, body aches",
    urgency: "medium",
    timeAgo: "15 mins ago",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    age: 28,
    location: "Primary Care C",
    symptoms: "Mild cough, sore throat, low-grade fever",
    urgency: "low",
    timeAgo: "1 hour ago",
  },
];

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [cases] = useState<Case[]>(mockCases);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [showComplaintBanner, setShowComplaintBanner] = useState(true);
  const [complaintDetailsOpen, setComplaintDetailsOpen] = useState(false);

  const filteredCases = filter === "all" 
    ? cases 
    : cases.filter(c => c.urgency === filter);

  const stats = {
    active: cases.length,
    high: cases.filter(c => c.urgency === "high").length,
    medium: cases.filter(c => c.urgency === "medium").length,
    low: cases.filter(c => c.urgency === "low").length,
    resolved: 42,
  };

  const handleAccept = (caseId: string) => {
    toast.success("Case accepted successfully");
  };

  const handleRequestDetails = (caseId: string) => {
    toast.info("Details request sent to health worker");
  };

  const handleMarkTreated = (caseId: string) => {
    toast.success("Case marked as treated");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">HealthNet AI</span>
            </div>
            <Button variant="outline" onClick={() => navigate("/")} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Hospital Dashboard</h1>
            <p className="text-muted-foreground">Manage incoming patient referrals and cases</p>
          </div>

          {/* Complaint Notification Banner */}
          {showComplaintBanner && (
            <div className="bg-risk-high/10 border-l-4 border-risk-high rounded-lg p-4 flex items-start justify-between animate-in slide-in-from-top-2">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-risk-high mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">
                    ⚠️ Complaint received from Rural Clinic A – Case #1542 (Delayed Response)
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A health worker has raised a complaint regarding case handling
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 border-risk-high/30 text-risk-high hover:bg-risk-high/10"
                    onClick={() => setComplaintDetailsOpen(true)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowComplaintBanner(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardDescription>Active Cases</CardDescription>
                <CardTitle className="text-3xl text-primary">{stats.active}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="shadow-card border-l-4 border-l-risk-high">
              <CardHeader className="pb-3">
                <CardDescription>High Urgency</CardDescription>
                <CardTitle className="text-3xl text-risk-high">{stats.high}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="shadow-card border-l-4 border-l-risk-medium">
              <CardHeader className="pb-3">
                <CardDescription>Medium</CardDescription>
                <CardTitle className="text-3xl text-risk-medium">{stats.medium}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="shadow-card border-l-4 border-l-risk-low">
              <CardHeader className="pb-3">
                <CardDescription>Low</CardDescription>
                <CardTitle className="text-3xl text-risk-low">{stats.low}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardDescription>Resolved</CardDescription>
                <CardTitle className="text-3xl text-foreground">{stats.resolved}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Cases List */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Incoming Cases</CardTitle>
                  <CardDescription>Review and manage patient referrals</CardDescription>
                </div>
                <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="high">High</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="low">Low</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  patientName={caseItem.patientName}
                  age={caseItem.age}
                  location={caseItem.location}
                  symptoms={caseItem.symptoms}
                  urgency={caseItem.urgency}
                  timeAgo={caseItem.timeAgo}
                  onAccept={() => handleAccept(caseItem.id)}
                  onRequestDetails={() => handleRequestDetails(caseItem.id)}
                  onMarkTreated={() => handleMarkTreated(caseItem.id)}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Complaint Details Dialog */}
      <Dialog open={complaintDetailsOpen} onOpenChange={setComplaintDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>Review the complaint submitted by the health worker</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Complaint ID</p>
                <p className="font-medium text-foreground">CMP001</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Case ID</p>
                <p className="font-medium text-foreground">#1542</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Health Worker</p>
                <p className="font-medium text-foreground">Dr. Jane Smith</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clinic</p>
                <p className="font-medium text-foreground">Rural Clinic A</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reason</p>
              <p className="font-medium text-foreground">Delay in response</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Additional Notes</p>
              <p className="text-foreground">Patient waited for 6 hours without acknowledgment. Family is concerned about the delay.</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submitted</p>
              <p className="font-medium text-foreground">2 hours ago</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComplaintDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalDashboard;
