/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, Calendar, FileText, AlertCircle, CheckCircle, LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Notification {
  id: number;
  type: string;
  icon?: LucideIcon;
  color?: string;
  bgColor?: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  action: string | null;
}

interface NotificationsListProps {
  onNavigate: (page: string, data?: any) => void;
  notifications?: Notification[];
  onMarkAsRead?: (notificationId: number) => void;
  onMarkAllAsRead?: () => void;
}

const defaultNotifications = [
  {
    id: 1,
    type: "reminder",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
    title: "Lembrete: Exame Amanhã",
    message: "Sua mamografia está agendada para amanhã, 18/10/2025 às 14:30",
    date: "Hoje, 10:30",
    read: false,
    action: "Ver Detalhes",
  },
  {
    id: 2,
    type: "result",
    icon: FileText,
    color: "text-success",
    bgColor: "bg-success/10",
    title: "Resultado Disponível",
    message: "O resultado do seu exame de sangue está pronto para visualização",
    date: "Ontem, 15:20",
    read: false,
    action: "Ver Resultado",
  },
  {
    id: 3,
    type: "alert",
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    title: "Exame Preventivo Necessário",
    message: "É hora de fazer sua colonoscopia anual. Agende agora!",
    date: "10/10/2025",
    read: true,
    action: "Agendar",
  },
  {
    id: 4,
    type: "confirmation",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    title: "Agendamento Confirmado",
    message: "Seu exame foi confirmado para 18/10/2025 às 14:30 na Clínica São Lucas",
    date: "05/10/2025",
    read: true,
    action: null,
  },
  {
    id: 5,
    type: "reminder",
    icon: Bell,
    color: "text-primary",
    bgColor: "bg-primary/10",
    title: "Lembrete de Check-up Anual",
    message: "Está na hora do seu check-up anual. Que tal agendar?",
    date: "01/10/2025",
    read: true,
    action: "Agendar",
  },
];

export function NotificationsList({
  onNavigate,
  notifications = defaultNotifications,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationsListProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleAction = (notification: any) => {
    if (notification.action === "Ver Resultado") {
      onNavigate('exams');
    } else if (notification.action === "Agendar" || notification.action === "Ver Detalhes") {
      onNavigate('scheduling');
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
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
        {unreadCount > 0 && onMarkAllAsRead && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="cursor-pointer"
          >
            Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          // Mapear tipo de notificação para ícone se não tiver ícone definido
          const getIconByType = (type: string) => {
            switch (type) {
              case 'reminder':
                return Calendar;
              case 'result':
                return FileText;
              case 'alert':
                return AlertCircle;
              case 'confirmation':
                return CheckCircle;
              default:
                return Bell;
            }
          };

          // Mapear tipo de notificação para cores se não tiver cores definidas
          const getColorsByType = (type: string) => {
            switch (type) {
              case 'reminder':
                return { color: 'text-primary', bgColor: 'bg-primary/10' };
              case 'result':
                return { color: 'text-success', bgColor: 'bg-success/10' };
              case 'alert':
                return { color: 'text-warning', bgColor: 'bg-warning/10' };
              case 'confirmation':
                return { color: 'text-success', bgColor: 'bg-success/10' };
              default:
                return { color: 'text-primary', bgColor: 'bg-primary/10' };
            }
          };

          const Icon = notification.icon || getIconByType(notification.type);
          const colors = {
            color: notification.color || getColorsByType(notification.type).color,
            bgColor: notification.bgColor || getColorsByType(notification.type).bgColor
          };

          return (
            <Card
              key={notification.id}
              className={`${notification.read ? "" : "border-primary/20"} ${!notification.read ? "cursor-pointer hover:bg-accent/50 transition-colors" : ""}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${colors.bgColor}`}>
                    <Icon className={`h-5 w-5 ${colors.color}`} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3>{notification.title}</h3>
                      {!notification.read && (
                        <Badge className="bg-primary flex-shrink-0">Nova</Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-xs text-muted-foreground">
                        {notification.date}
                      </span>

                      {notification.action && (
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(notification);
                          }}
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
