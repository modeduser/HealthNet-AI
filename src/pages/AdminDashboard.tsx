import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowLeft, TrendingUp, Users, MapPin, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Complaint {
  id: string;
  caseId: string;
  healthWorkerName: string;
  hospitalName: string;
  reason: string;
  status: "pending" | "resolved";
  date: string;
}

const mockComplaints: Complaint[] = [
  {
    id: "CMP001",
    caseId: "#1542",
    healthWorkerName: "Dr. Jane Smith",
    hospitalName: "District Hospital A",
    reason: "Delay in response",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "CMP002",
    caseId: "#1398",
    healthWorkerName: "Nurse John Doe",
    hospitalName: "Regional Medical Center",
    reason: "Incorrect status",
    status: "pending",
    date: "5 hours ago",
  },
  {
    id: "CMP003",
    caseId: "#1276",
    healthWorkerName: "Dr. Sarah Lee",
    hospitalName: "District Hospital B",
    reason: "Other",
    status: "resolved",
    date: "1 day ago",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [activeTab, setActiveTab] = useState("analytics");

  const handleMarkResolved = (complaintId: string) => {
    setComplaints(complaints.map(c => 
      c.id === complaintId ? { ...c, status: "resolved" as const } : c
    ));
    toast.success("Complaint marked as resolved");
  };

  const handleWarnHospital = (hospitalName: string) => {
    toast.info(`Warning sent to ${hospitalName}`);
  };

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return <Badge variant="outline" className="bg-risk-high/10 text-risk-high border-risk-high/20">Pending</Badge>;
    }
    return <Badge variant="outline" className="bg-risk-low/10 text-risk-low border-risk-low/20">Resolved</Badge>;
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Analytics Dashboard</h1>
            <p className="text-muted-foreground">System-wide health metrics and performance insights</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="complaints">
                Complaints
                {complaints.filter(c => c.status === "pending").length > 0 && (
                  <Badge variant="outline" className="ml-2 bg-risk-high/10 text-risk-high border-risk-high/20">
                    {complaints.filter(c => c.status === "pending").length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-8 mt-6">

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Cases (30 days)
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">1,284</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-primary font-medium">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-secondary">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Health Workers
                </CardTitle>
                <Users className="w-4 h-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">456</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary font-medium">+8</span> new this week
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-risk-medium">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Connected Hospitals
                </CardTitle>
                <MapPin className="w-4 h-4 text-risk-medium" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">89</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across 12 districts
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-l-4 border-l-risk-low">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Referral Time
                </CardTitle>
                <Clock className="w-4 h-4 text-risk-low" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">24min</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-risk-low font-medium">-15%</span> improvement
                </p>
              </CardContent>
              </Card>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Disease Categories</CardTitle>
                <CardDescription>Distribution of cases by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Respiratory</span>
                      <span className="font-medium text-foreground">35%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-primary" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cardiovascular</span>
                      <span className="font-medium text-foreground">25%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Infectious</span>
                      <span className="font-medium text-foreground">20%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-risk-medium" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Gastrointestinal</span>
                      <span className="font-medium text-foreground">12%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-risk-low" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Other</span>
                      <span className="font-medium text-foreground">8%</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-muted-foreground" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Region-wise Case Count</CardTitle>
                <CardDescription>Cases distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <span className="font-medium text-foreground">Northern Region</span>
                    <span className="text-2xl font-bold text-primary">324</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <span className="font-medium text-foreground">Southern Region</span>
                    <span className="text-2xl font-bold text-primary">298</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <span className="font-medium text-foreground">Eastern Region</span>
                    <span className="text-2xl font-bold text-primary">387</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <span className="font-medium text-foreground">Western Region</span>
                    <span className="text-2xl font-bold text-primary">275</span>
                  </div>
                </div>
              </CardContent>
              </Card>
              </div>

              {/* Urgency Breakdown */}
              <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Urgency Level Trends</CardTitle>
              <CardDescription>Distribution of cases by urgency over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-risk-high/10 border-2 border-risk-high/20">
                  <div className="text-4xl font-bold text-risk-high mb-2">342</div>
                  <div className="text-sm font-medium text-muted-foreground">High Urgency Cases</div>
                  <div className="text-xs text-muted-foreground mt-1">26.6% of total</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-risk-medium/10 border-2 border-risk-medium/20">
                  <div className="text-4xl font-bold text-risk-medium mb-2">528</div>
                  <div className="text-sm font-medium text-muted-foreground">Medium Urgency Cases</div>
                  <div className="text-xs text-muted-foreground mt-1">41.1% of total</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-risk-low/10 border-2 border-risk-low/20">
                  <div className="text-4xl font-bold text-risk-low mb-2">414</div>
                  <div className="text-sm font-medium text-muted-foreground">Low Urgency Cases</div>
                  <div className="text-xs text-muted-foreground mt-1">32.3% of total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="complaints" className="space-y-6 mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    <CardTitle>Complaints Management</CardTitle>
                  </div>
                  <CardDescription>Review and manage complaints from health workers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                        <div className="grid grid-cols-6 gap-4 items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Complaint ID</p>
                            <p className="font-medium text-foreground">{complaint.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Case ID</p>
                            <p className="font-medium text-foreground">{complaint.caseId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Health Worker</p>
                            <p className="font-medium text-foreground">{complaint.healthWorkerName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Hospital</p>
                            <p className="font-medium text-foreground">{complaint.hospitalName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Reason</p>
                            <p className="font-medium text-foreground">{complaint.reason}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            {getStatusBadge(complaint.status)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground">{complaint.date}</p>
                          {complaint.status === "pending" && (
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleWarnHospital(complaint.hospitalName)}
                                className="border-risk-medium/30 text-risk-medium hover:bg-risk-medium/10"
                              >
                                Warn Hospital
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleMarkResolved(complaint.id)}
                                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                              >
                                Mark as Resolved
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
