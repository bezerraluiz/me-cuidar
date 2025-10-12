/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Mail, Phone, Calendar, CreditCard, Edit, LogOut, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

export interface ProfilePageProps {
  onLogout: () => void;
  userData: any;
  onNavigate: (page: string, data?: any) => void;
}

export function ProfilePage({ onLogout, userData: propUserData, onNavigate }: ProfilePageProps) {
  // Se não houver dados do usuário, a lógica de autenticação do page.tsx irá redirecionar para login
  if (!propUserData) {
    return null;
  }

  // Função para formatar data e calcular idade
  const formatBirthDateWithAge = (birthDateStr: string | undefined): string => {
    if (!birthDateStr) {
      return "Não informado";
    }

    const [year, month, day] = birthDateStr.split('-');
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return `${day}/${month}/${year} (${age} anos)`;
  };

  const userData = {
    name: propUserData.fullName || propUserData.name,
    email: propUserData.email,
    phone: propUserData.phone,
    cpf: propUserData.cpf,
    birthDate: propUserData.birthDate,
    birthDateFormatted: formatBirthDateWithAge(propUserData.birthDate),
    age: propUserData.age,
    address: propUserData.address || {
      street: "Não informado",
      number: "Não informado",
      complement: "Não informado",
      neighborhood: "Não informado",
      city: "Não informado",
      state: "Não informado",
      zipCode: "Não informado",
    },
    insurance: propUserData.insurance || {
      name: "Não informado",
      number: "Não informado",
      plan: "Não informado",
    },
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Cabeçalho do Perfil */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {userData.name.split(' ').map((n: any[]) => n[0]).join('')}
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
                <p>{userData.birthDateFormatted}</p>
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

      {/* Endereço */}
      <Card>
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
          <CardDescription>Seu endereço cadastrado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Rua</p>
                <p>{userData.address.street}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Número</p>
                <p>{userData.address.number}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Complemento</p>
                <p>{userData.address.complement}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Bairro</p>
                <p>{userData.address.neighborhood}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Cidade</p>
                <p>{userData.address.city}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Estado</p>
                <p>{userData.address.state}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">CEP</p>
                <p>{userData.address.zipCode}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="cursor-pointer w-full h-12 gap-2">
            <Edit className="h-5 w-5" />
            Editar Endereço
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
