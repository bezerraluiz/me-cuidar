import { Menu, Bell, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HeaderProps {
  onMenuClick: () => void;
  userName: string;
  notificationCount?: number;
  onNotificationClick: () => void;
  onProfileClick?: () => void;
  onBack?: () => void;
  onForward?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export function Header({
  onMenuClick,
  userName,
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
  onBack,
  onForward,
  canGoBack = false,
  canGoForward = false
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-primary-foreground">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
          </div>
          <span className="hidden md:inline-block">Bem Cuidar</span>
        </div>

        {/* Botões de navegação (voltar/avançar) */}
        {(onBack || onForward) && (
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              disabled={!canGoBack}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onForward}
              disabled={!canGoForward}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Avançar</span>
            </Button>
          </div>
        )}

        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onNotificationClick}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-[10px]">
                {notificationCount > 9 ? '9+' : notificationCount}
              </Badge>
            )}
            <span className="sr-only">Notificações</span>
          </Button>

          <div
            className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onProfileClick}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="hidden lg:inline-block">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
