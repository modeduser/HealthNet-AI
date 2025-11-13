import { Button } from "@/components/ui/button";
import { Heart, Activity, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">HealthNet AI</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium">
              <Network className="w-4 h-4" />
              AI-Powered Healthcare Network
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              HealthNet AI: Bridging Rural Healthcare with Intelligence
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Connecting rural health workers, local clinics, and district hospitals through intelligent AI-powered patient triage and seamless referral systems.
            </p>

            {/* UPDATED LOGIN BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Login as Health Worker */}
              <Button
                size="lg"
                onClick={() => navigate("/login?role=health-worker")}
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow text-base font-medium"
              >
                <Heart className="w-5 h-5 mr-2" />
                Login as Health Worker
              </Button>

              {/* Login as Hospital */}
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login?role=hospital")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all text-base font-medium"
              >
                <Activity className="w-5 h-5 mr-2" />
                Login as Hospital
              </Button>

              {/* Login as Admin (Added Option) */}
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login?role=admin")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all text-base font-medium"
              >
                Admin Login
              </Button>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-accent mx-auto flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">AI Triage</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-accent mx-auto flex items-center justify-center">
                  <Network className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Connected Network</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-accent mx-auto flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Better Care</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-glow rounded-3xl blur-3xl opacity-50"></div>
            <img
              src={heroImage}
              alt="Healthcare network visualization"
              className="relative rounded-3xl shadow-card w-full"
            />
          </div>
        </div>
      </main>

      {/* Stats Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-card rounded-2xl p-8 shadow-card">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground mt-1">Health Workers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Connected Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground mt-1">Cases Triaged</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground mt-1">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
