import { User, Mail, Phone, Calendar, CreditCard, Edit, LogOut, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

interface UserData {
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  cpf: string;
  age: number;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  userData: UserData;
}

export function ProfilePage({ userData, onLogout }: ProfilePageProps) {
  const displayName = userData.fullName || userData.name || "Usuário";
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // Formatar data de nascimento a partir da idade (estimativa)
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - userData.age;
  const birthDate = `${birthYear}`;

  // Formatar endereço completo
  const fullAddress = userData.address
    ? `${userData.address.street}, ${userData.address.number}${userData.address.complement ? ` - ${userData.address.complement}` : ''} - ${userData.address.neighborhood}, ${userData.address.city}/${userData.address.state}`
    : null;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Cabeçalho do Perfil */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h2>{displayName}</h2>
            <p className="text-muted-foreground mt-1">{userData.age} anos</p>
            <Button variant="outline" className="mt-4 gap-2" size="sm">
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
                <p>{displayName}</p>
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
                <p className="text-sm text-muted-foreground">Idade</p>
                <p>{userData.age} anos (nascido em {birthDate})</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">CPF</p>
                <p>{userData.cpf}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 gap-2">
            <Edit className="h-5 w-5" />
            Editar Dados Pessoais
          </Button>
        </CardContent>
      </Card>

      {/* Endereço */}
      {fullAddress && (
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>Seu endereço cadastrado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Endereço Completo</p>
                  <p className="break-words">{fullAddress}</p>
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

            <Button variant="outline" className="w-full h-12 gap-2">
              <Edit className="h-5 w-5" />
              Editar Endereço
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Ações */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Button variant="outline" className="w-full h-12 justify-start gap-2">
            <User className="h-5 w-5" />
            Configurações de Conta
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 justify-start gap-2 text-destructive hover:text-destructive"
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
