import { Menu, Bell } from "lucide-react";
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

export function Header({ onMenuClick, userName, notificationCount = 0, onNotificationClick, onProfileClick }: HeaderProps) {
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
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="currentColor"/>
                <path d="M2 12h4l2-4 2 6 2-4h4" stroke="#048995" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          <span className="hidden md:inline-block">Saúde Preventiva</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer relative"
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

          <button
            onClick={onProfileClick}
            className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            title="Acessar perfil"
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="hidden lg:inline-block">{userName}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
