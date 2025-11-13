import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Upload, Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import RiskCard from "@/components/RiskCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PatientData {
  name: string;
  age: string;
  symptoms: string;
  vitals: string;
  duration: string;
}

interface TriageResult {
  level: "high" | "medium" | "low";
  recommendation: string;
}

interface Referral {
  id: string;
  patientName: string;
  hospitalName: string;
  urgency: "high" | "medium" | "low";
  status: "pending" | "accepted" | "treated";
  lastUpdated: string;
}

const mockReferrals: Referral[] = [
  {
    id: "REF001",
    patientName: "Jaspreet Singh",
    hospitalName: "Manipal Hospital",
    urgency: "high",
    status: "accepted",
    lastUpdated: "2 hours ago",
  },
  {
    id: "REF002",
    patientName: "Shakuntala Devi",
    hospitalName: "Jaipur City Hospital",
    urgency: "medium",
    status: "pending",
    lastUpdated: "5 hours ago",
  },
  {
    id: "REF003",
    patientName: "Ritwik Choudhary",
    hospitalName: "Bagru Medical Centre",
    urgency: "low",
    status: "treated",
    lastUpdated: "1 day ago",
  },
];

const HealthWorkerDashboard = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    age: "",
    symptoms: "",
    vitals: "",
    duration: "",
  });
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [complaintDialogOpen, setComplaintDialogOpen] = useState(false);
  const assignHospital = (urgency: string) => {
  if (urgency === "high") return "City Hospital";
  if (urgency === "medium") return "Regional Hospital";
  return "Local Hospital";
  };
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [complaintReason, setComplaintReason] = useState("");
  const [complaintNotes, setComplaintNotes] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const runAITriage = async () => {
  if (!patientData.name || !patientData.age || !patientData.symptoms) {
    toast.error("Please fill in all required fields");
    return;
  }

  setIsAnalyzing(true);
  setTriageResult(null);

  try {
    const response = await fetch("https://healthnet-ai-backend.onrender.com/triage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symptoms: patientData.symptoms,
        bp: patientData.vitals,
        temperature: patientData.vitals.split(",")[1]?.trim() || "98",
        heart_rate: patientData.vitals.split(",")[2]?.replace("bpm", "").trim() || "70"
      }),
    });

    const data = await response.json();

    // Convert backend response to your UI model
    const result: TriageResult = {
      level: data.urgency.toLowerCase(), // "High" → "high"
      recommendation: data.recommended_action,
    };

    setTriageResult(result);
    toast.success("AI triage completed successfully");
    const newReferral: Referral = {
      id: "REF" + Math.floor(Math.random() * 9000 + 1000),
      patientName: patientData.name,
      hospitalName: assignHospital(result.level),
      urgency: result.level,
      status: "pending",
      lastUpdated: "Just now",
    };

    setReferrals([newReferral, ...referrals]);
  } catch (error) {
    console.error("Triage error:", error);
    toast.error("AI triage failed. Check backend server.");
  }

  setIsAnalyzing(false);
};


  const handleRaiseComplaint = (referral: Referral) => {
    setSelectedReferral(referral);
    setComplaintDialogOpen(true);
  };

  const handleSubmitComplaint = () => {
    if (!complaintReason) {
      toast.error("Please select a reason for complaint");
      return;
    }
    
    toast.success("Complaint Submitted. Admin will review shortly.");
    setComplaintDialogOpen(false);
    setComplaintReason("");
    setComplaintNotes("");
    setSelectedReferral(null);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-risk-high";
      case "medium": return "text-risk-medium";
      case "low": return "text-risk-low";
      default: return "text-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="bg-risk-medium/10 text-risk-medium border-risk-medium/20">Pending</Badge>;
      case "accepted": return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Accepted</Badge>;
      case "treated": return <Badge variant="outline" className="bg-risk-low/10 text-risk-low border-risk-low/20">Treated</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
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
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Health Worker Dashboard</h1>
            <p className="text-muted-foreground">Enter patient details for AI-powered triage assessment</p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Fill in the patient details below to run AI triage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Patient Name *</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Enter full name" 
                    value={patientData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input 
                    id="age" 
                    name="age"
                    type="number" 
                    placeholder="Enter age" 
                    value={patientData.age}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms *</Label>
                <Textarea 
                  id="symptoms" 
                  name="symptoms"
                  placeholder="Describe symptoms in detail..."
                  className="min-h-24"
                  value={patientData.symptoms}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vitals">Vitals (BP, Temp, HR)</Label>
                  <Input 
                    id="vitals" 
                    name="vitals"
                    placeholder="e.g., 120/80, 98.6°F, 72 bpm" 
                    value={patientData.vitals}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration of Illness</Label>
                  <Input 
                    id="duration" 
                    name="duration"
                    placeholder="e.g., 3 days" 
                    value={patientData.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="upload">Upload Report/Photo (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload medical reports or photos</p>
                </div>
              </div>

              <Button 
                onClick={runAITriage}
                disabled={isAnalyzing}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow text-lg h-12"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Running AI Triage...
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5 mr-2" />
                    Run AI Triage
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {triageResult && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-semibold text-foreground">AI Triage Result</h2>
              <RiskCard 
                level={triageResult.level}
                recommendation={triageResult.recommendation}
              />
            </div>
          )}

          {/* My Referrals Section */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>My Referrals</CardTitle>
              <CardDescription>Track the status of your referred patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="grid grid-cols-5 gap-4 flex-1">
                      <div>
                        <p className="text-sm text-muted-foreground">Patient Name</p>
                        <p className="font-medium text-foreground">{referral.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hospital Name</p>
                        <p className="font-medium text-foreground">{referral.hospitalName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Urgency</p>
                        <p className={`font-medium capitalize ${getUrgencyColor(referral.urgency)}`}>{referral.urgency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        {getStatusBadge(referral.status)}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="font-medium text-foreground">{referral.lastUpdated}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRaiseComplaint(referral)}
                      className="ml-4 border-risk-medium/30 text-risk-medium hover:bg-risk-medium/10"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Raise Complaint
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Complaint Dialog */}
      <Dialog open={complaintDialogOpen} onOpenChange={setComplaintDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Raise Complaint</DialogTitle>
            <DialogDescription>
              Submit a complaint for referral {selectedReferral?.id} - {selectedReferral?.patientName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Select Reason *</Label>
              <Select value={complaintReason} onValueChange={setComplaintReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delay">Delay in response</SelectItem>
                  <SelectItem value="incorrect">Incorrect status</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Provide additional details about your complaint..."
                value={complaintNotes}
                onChange={(e) => setComplaintNotes(e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComplaintDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitComplaint}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              Submit Complaint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HealthWorkerDashboard;
