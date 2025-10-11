import { Bell, Calendar, FileText, AlertCircle, CheckCircle, Check } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  action?: string | null;
}

interface NotificationsListProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationsList({ onNavigate, notifications, onMarkAsRead, onMarkAllAsRead }: NotificationsListProps) {
  // Mapear os tipos de notificação para ícones e cores
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "reminder":
        return {
          icon: Calendar,
          color: "text-primary",
          bgColor: "bg-primary/10",
        };
      case "result":
        return {
          icon: FileText,
          color: "text-success",
          bgColor: "bg-success/10",
        };
      case "alert":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bgColor: "bg-warning/10",
        };
      case "confirmation":
        return {
          icon: CheckCircle,
          color: "text-success",
          bgColor: "bg-success/10",
        };
      default:
        return {
          icon: Bell,
          color: "text-primary",
          bgColor: "bg-primary/10",
        };
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleAction = (notification: Notification) => {
    // Marcar como lida ao clicar em uma ação
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }

    if (notification.action === "Ver Resultado") {
      onNavigate('exams');
    } else if (notification.action === "Agendar" || notification.action === "Ver Detalhes") {
      onNavigate('scheduling');
    }
  };

  const handleMarkAsRead = (notificationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    onMarkAsRead(notificationId);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1>Notificações</h1>
          <p className="text-muted-foreground mt-2">
            {unreadCount > 0 ? (
              <>Você tem {unreadCount} notificação{unreadCount > 1 ? 'ões' : ''} não lida{unreadCount > 1 ? 's' : ''}</>
            ) : (
              <>Todas as notificações foram lidas</>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const style = getNotificationStyle(notification.type);
          const Icon = style.icon;

          return (
            <Card key={notification.id} className={notification.read ? "" : "border-primary/20"}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${style.bgColor}`}>
                    <Icon className={`h-5 w-5 ${style.color}`} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="flex-1">{notification.title}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <Badge className="bg-primary">Nova</Badge>
                        )}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => handleMarkAsRead(notification.id, e)}
                            title="Marcar como lida"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        {notification.date}
                      </span>

                      {notification.action && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(notification)}
                        >
                          {notification.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3>Nenhuma notificação</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Você não tem notificações no momento
          </p>
        </div>
      )}
    </div>
  );
}
