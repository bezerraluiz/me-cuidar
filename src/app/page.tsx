"use client";

import { useState, useEffect } from "react";
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
import { MOCK_USER } from "./data/mockData";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [schedulingData, setSchedulingData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Carregar dados da Regina dos Santos
    setUserData({
      name: MOCK_USER.fullName,
      fullName: MOCK_USER.fullName,
      cpf: MOCK_USER.cpf,
      age: MOCK_USER.age,
      phone: MOCK_USER.phone,
      email: MOCK_USER.email,
      address: MOCK_USER.address,
    });
    // Inicializar notificações
    setNotifications([
      {
        id: 1,
        type: "reminder",
        title: "Lembrete: Exame Amanhã",
        message: "Sua mamografia está agendada para amanhã, 18/10/2025 às 14:30",
        date: "Hoje, 10:30",
        read: false,
        action: "Ver Detalhes",
      },
      {
        id: 2,
        type: "result",
        title: "Resultado Disponível",
        message: "O resultado do seu exame de sangue está pronto para visualização",
        date: "Ontem, 15:20",
        read: false,
        action: "Ver Resultado",
      },
      {
        id: 3,
        type: "alert",
        title: "Exame Preventivo Necessário",
        message: "É hora de fazer sua colonoscopia anual. Agende agora!",
        date: "10/10/2025",
        read: true,
        action: "Agendar",
      },
      {
        id: 4,
        type: "confirmation",
        title: "Agendamento Confirmado",
        message: "Seu exame foi confirmado para 18/10/2025 às 14:30 na Clínica São Lucas",
        date: "05/10/2025",
        read: true,
        action: null,
      },
      {
        id: 5,
        type: "reminder",
        title: "Lembrete de Check-up Anual",
        message: "Está na hora do seu check-up anual. Que tal agendar?",
        date: "01/10/2025",
        read: true,
        action: "Agendar",
      },
    ]);
    toast.success("Login realizado com sucesso!", {
      description: `Bem-vinda de volta, ${MOCK_USER.fullName.split(' ')[0]}!`,
    });
  };

  const handleRegistrationComplete = (data: any) => {
    setUserData(data);
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setIsAuthenticated(true);
    toast.success("Bem-vindo ao Bem Cuidar!", {
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

    // Adicionar à história de navegação
    const newHistory = navigationHistory.slice(0, historyIndex + 1);
    if (page !== currentPage) {
      newHistory.push(page);
      setNavigationHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }

    setCurrentPage(page);
    if (data) {
      setSchedulingData(data);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPage(navigationHistory[newIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPage(navigationHistory[newIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success("Todas as notificações foram marcadas como lidas");
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Listener para botões laterais do mouse (back/forward)
  useEffect(() => {
    const handleMouseButton = (event: MouseEvent) => {
      // Botão 3 = voltar, Botão 4 = avançar
      if (event.button === 3) {
        event.preventDefault();
        handleBack();
      } else if (event.button === 4) {
        event.preventDefault();
        handleForward();
      }
    };

    // Adicionar listener para o evento mouseup
    window.addEventListener('mouseup', handleMouseButton);

    // Cleanup ao desmontar o componente
    return () => {
      window.removeEventListener('mouseup', handleMouseButton);
    };
  }, [historyIndex, navigationHistory]);

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
        return (
          <NotificationsList
            onNavigate={handleNavigate}
            notifications={notifications}
            onMarkAsRead={markNotificationAsRead}
            onMarkAllAsRead={markAllNotificationsAsRead}
          />
        );
      case "exams":
        return <ExamHistory onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />;
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
          notificationCount={unreadNotificationsCount}
          onNotificationClick={() => handleNavigate("notifications")}
          onProfileClick={() => handleNavigate("profile")}
          onBack={handleBack}
          onForward={handleForward}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < navigationHistory.length - 1}
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
