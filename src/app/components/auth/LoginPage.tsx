import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface LoginPageProps {
  onLogin: (cpf: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cpf || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    const cpfNumbers = cpf.replace(/\D/g, "");
    if (cpfNumbers.length !== 11) {
      setError("CPF inválido. Digite os 11 dígitos");
      return;
    }

    if (password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    setIsLoading(true);
    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      onLogin(cpf);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <h1>Saúde Preventiva</h1>
            <p className="text-muted-foreground mt-2">
              Acesse sua conta para continuar
            </p>
          </div>
        </div>

        {/* Card de Login */}
        <Card>
          <CardHeader>
            <CardTitle>Entrar na Conta</CardTitle>
            <CardDescription>
              Digite seu CPF e senha para acessar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCPFChange}
                  maxLength={14}
                  className="h-12"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="cursor-pointer w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="cursor-pointer text-sm"
                  onClick={() => {
                    setError("Funcionalidade de recuperação de senha em desenvolvimento");
                  }}
                >
                  Esqueci minha senha
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Link para Cadastro */}
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              Ainda não tem uma conta?
            </p>
            <Button
              variant="outline"
              className="cursor-pointer w-full h-12"
              onClick={onNavigateToRegister}
            >
              Criar Nova Conta
            </Button>
          </CardContent>
        </Card>

        {/* Informações de Segurança */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Seus dados estão protegidos e seguros</p>
        </div>
      </div>
    </div>
  );
}
