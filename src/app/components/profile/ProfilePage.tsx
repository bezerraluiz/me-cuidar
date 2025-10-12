import { User, Mail, Phone, Calendar, CreditCard, Edit, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  userData?: any;
}

export function ProfilePage({ onNavigate, onLogout, userData: propUserData }: ProfilePageProps) {
  // Usar dados do usuário logado ou dados padrão
  const defaultData = {
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    birthDate: "15/03/1975",
    age: 50,
    insurance: {
      name: "Unimed",
      number: "123456789",
      plan: "Plus",
    },
  };

  const userData = {
    name: propUserData?.fullName || propUserData?.name || defaultData.name,
    email: propUserData?.email || defaultData.email,
    phone: propUserData?.phone || defaultData.phone,
    cpf: propUserData?.cpf || defaultData.cpf,
    birthDate: propUserData?.birthDate || defaultData.birthDate,
    age: propUserData?.age || defaultData.age,
    insurance: propUserData?.insurance || defaultData.insurance,
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Cabeçalho do Perfil */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2>{userData.name}</h2>
            <p className="text-muted-foreground mt-1">{userData.age} anos</p>
            <Button variant="outline" className="cursor-pointer mt-4 gap-2" size="sm">
              <Edit className="h-4 w-4" />
              Editar Foto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Seus dados cadastrais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Nome Completo</p>
                <p>{userData.name}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">E-mail</p>
                <p className="truncate">{userData.email}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p>{userData.phone}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                <p>{userData.birthDate}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">CPF</p>
                <p>{userData.cpf}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="cursor-pointer w-full h-12 gap-2">
            <Edit className="h-5 w-5" />
            Editar Dados Pessoais
          </Button>
        </CardContent>
      </Card>

      {/* Informações do Convênio */}
      <Card>
        <CardHeader>
          <CardTitle>Convênio Médico</CardTitle>
          <CardDescription>Informações do seu plano de saúde</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Convênio</p>
                <p>{userData.insurance.name}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Número da Carteirinha</p>
                <p>{userData.insurance.number}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Plano</p>
                <p>{userData.insurance.plan}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="cursor-pointer w-full h-12 gap-2">
            <Edit className="h-5 w-5" />
            Editar Convênio
          </Button>
        </CardContent>
      </Card>

      {/* Ações */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Button variant="outline" className="cursor-pointer w-full h-12 justify-start gap-2">
            <User className="h-5 w-5" />
            Configurações de Conta
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 justify-start cursor-pointer gap-2 border-red-500 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            onClick={() => onLogout?.()}
          >
            <LogOut className="h-5 w-5" />
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
