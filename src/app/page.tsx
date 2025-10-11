"use client";

import { useState } from "react";
import { Header } from "./components/layout/Header";
import { MobileNav } from "./components/layout/MobileNav";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./components/home/Dashboard";
import { ProactiveAlerts } from "./components/alerts/ProactiveAlerts";
import { MyPreventiveHealth } from "./components/health/MyPreventiveHealth";
import { EducationalModule } from "./components/education/EducationalModule";
import { SchedulingFlow } from "./components/scheduling/SchedulingFlow";
import { NotificationsList } from "./components/notifications/NotificationsList";
import { ExamHistory } from "./components/history/ExamHistory";
import { ProfilePage } from "./components/profile/ProfilePage";
import { LongitudinalTracking } from "./components/tracking/LongitudinalTracking";
import { CheckIn } from "./components/checkin/CheckIn";
import { VirtualQueue } from "./components/queue/VirtualQueue";
import { LoginPage } from "./components/auth/LoginPage";
import { RegistrationFlow } from "./components/auth/RegistrationFlow";
import { PersonalizedWelcome } from "./components/auth/PersonalizedWelcome";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [schedulingData, setSchedulingData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = (cpf: string) => {
    setIsAuthenticated(true);
    // Dados mock do usuário baseados no CPF
    setUserData({
      name: "Maria Silva",
      cpf: cpf,
    });
    toast.success("Login realizado com sucesso!", {
      description: "Bem-vindo de volta!",
    });
  };

  const handleRegistrationComplete = (data: any) => {
    setUserData(data);
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setIsAuthenticated(true);
    toast.success("Bem-vindo ao Saúde Preventiva!", {
      description: "Vamos cuidar juntos da sua saúde!",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setCurrentPage("home");
    toast.info("Você saiu da sua conta");
  };

  const handleNavigate = (page: string, data?: any) => {
    if (page === "logout") {
      handleLogout();
      return;
    }

    setCurrentPage(page);
    if (data) {
      setSchedulingData(data);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mostrar tela de boas-vindas personalizada após cadastro
  if (showWelcome && userData) {
    return (
      <>
        <PersonalizedWelcome
          userData={userData}
          onComplete={handleWelcomeComplete}
        />
        <Toaster />
      </>
    );
  }

  // Se não estiver autenticado, mostrar telas de login/registro
  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <>
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => setAuthView("register")}
          />
          <Toaster />
        </>
      );
    } else {
      return (
        <>
          <RegistrationFlow
            onComplete={handleRegistrationComplete}
            onBack={() => setAuthView("login")}
          />
          <Toaster />
        </>
      );
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Dashboard onNavigate={handleNavigate} />;
      case "alerts":
        return <ProactiveAlerts onNavigate={handleNavigate} />;
      case "health":
        return <MyPreventiveHealth onNavigate={handleNavigate} />;
      case "education":
        return <EducationalModule />;
      case "scheduling":
      case "exam-details":
        return (
          <SchedulingFlow
            onNavigate={handleNavigate}
            initialExamType={schedulingData?.examType}
          />
        );
      case "notifications":
        return <NotificationsList onNavigate={handleNavigate} />;
      case "exams":
        return <ExamHistory onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />;
      case "tracking":
        return <LongitudinalTracking />;
      case "checkin":
        return <CheckIn onCheckInComplete={() => handleNavigate("queue")} />;
      case "queue":
        return <VirtualQueue onCancel={() => handleNavigate("home")} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  // Mapear páginas do mobile nav para as páginas corretas
  const handleMobileNavigate = (page: string) => {
    const pageMap: Record<string, string> = {
      home: "home",
      exams: "exams",
      alerts: "alerts",
      profile: "profile",
    };
    handleNavigate(pageMap[page] || page);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar para desktop */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          userName={userData?.fullName || userData?.name || "Usuário"}
          notificationCount={2}
          onNotificationClick={() => handleNavigate("notifications")}
        />

        {/* Page Content */}
        <main className="container mx-auto max-w-4xl px-4 py-6">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        currentPage={
          currentPage === "home" ? "home" :
          currentPage === "alerts" ? "alerts" :
          currentPage === "health" || currentPage === "exams" ? "exams" :
          currentPage === "profile" ? "profile" :
          "home"
        }
        onNavigate={handleMobileNavigate}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default Home;
