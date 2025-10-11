import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ChevronLeft, CheckCircle, AlertCircle, User, MapPin, Lock, Activity, Heart } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { StepIndicator } from "./StepIndicator";

interface RegistrationFlowProps {
  onComplete: (userData: any) => void;
  onBack: () => void;
}

export function RegistrationFlow({ onComplete, onBack }: RegistrationFlowProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // Dados do formulário
  const [formData, setFormData] = useState({
    // Etapa 1: Dados Pessoais
    fullName: "",
    cpf: "",
    birthDate: "",
    phone: "",
    
    // Etapa 2: Endereço
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    
    // Etapa 3: Senha
    password: "",
    confirmPassword: "",
    
    // Etapa 4: Histórico de Saúde
    isSmoker: "",
    hasDiabetes: false,
    hasHypertension: false,
    hasHeartDisease: false,
    hasObesity: false,
    otherConditions: "",
    
    // Etapa 5: Histórico Familiar
    familyHistory: {
      breastCancer: false,
      colonCancer: false,
      prostateCancer: false,
      lungCancer: false,
      skinCancer: false,
      other: false,
      otherDescription: "",
    },
  });

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

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const validateStep = (currentStep: number) => {
    setError("");

    switch (currentStep) {
      case 1:
        if (!formData.fullName || !formData.cpf || !formData.birthDate || !formData.phone) {
          setError("Por favor, preencha todos os campos obrigatórios");
          return false;
        }
        if (formData.cpf.replace(/\D/g, "").length !== 11) {
          setError("CPF inválido. Digite os 11 dígitos");
          return false;
        }
        if (formData.phone.replace(/\D/g, "").length < 10) {
          setError("Telefone inválido");
          return false;
        }
        break;

      case 2:
        if (!formData.zipCode || !formData.street || !formData.number || 
            !formData.neighborhood || !formData.city || !formData.state) {
          setError("Por favor, preencha todos os campos obrigatórios do endereço");
          return false;
        }
        break;

      case 3:
        if (!formData.password || !formData.confirmPassword) {
          setError("Por favor, preencha a senha e confirmação");
          return false;
        }
        if (formData.password.length < 6) {
          setError("A senha deve ter no mínimo 6 caracteres");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("As senhas não coincidem");
          return false;
        }
        break;

      case 4:
        if (!formData.isSmoker) {
          setError("Por favor, informe se você é fumante");
          return false;
        }
        break;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 6) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const stepLabels = [
    "Dados Pessoais",
    "Endereço",
    "Senha",
    "Saúde",
    "Histórico Familiar",
    "Confirmação"
  ];

  const stepIcons = [User, MapPin, Lock, Activity, Heart, CheckCircle];
  const StepIcon = stepIcons[step - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 p-4 py-8">
      <div className="container mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <StepIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1>Criar Nova Conta</h1>
              <p className="text-muted-foreground mt-1">
                Passo {step} de 6: {stepLabels[step - 1]}
              </p>
            </div>
          </div>

          {/* Indicador de Progresso */}
          <StepIndicator 
            currentStep={step} 
            totalSteps={6}
            stepLabels={stepLabels}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Etapa 1: Dados Pessoais */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>
                Preencha suas informações básicas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo *</Label>
                <Input
                  id="fullName"
                  placeholder="Digite seu nome completo"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                  maxLength={14}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="h-12"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                  maxLength={15}
                  className="h-12"
                />
              </div>

              <Button className="w-full h-12" onClick={handleNext}>
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Etapa 2: Endereço */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>
                Informe seu endereço completo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP *</Label>
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: formatZipCode(e.target.value) })}
                  maxLength={9}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Rua *</Label>
                <Input
                  id="street"
                  placeholder="Nome da rua"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="number">Número *</Label>
                  <Input
                    id="number"
                    placeholder="Nº"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    placeholder="Apto, bloco..."
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  placeholder="Nome do bairro"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    placeholder="Cidade"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado *</Label>
                  <Input
                    id="state"
                    placeholder="UF"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                    maxLength={2}
                    className="h-12"
                  />
                </div>
              </div>

              <Button className="w-full h-12" onClick={handleNext}>
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Etapa 3: Senha */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Criar Senha</CardTitle>
              <CardDescription>
                Escolha uma senha segura para sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12"
                  autoComplete="new-password"
                />
                <p className="text-sm text-muted-foreground">
                  Use no mínimo 6 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-12"
                  autoComplete="new-password"
                />
              </div>

              <div className="rounded-lg bg-primary/10 p-4">
                <h4 className="mb-2">Dicas para uma senha segura:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use letras e números</li>
                  <li>• Evite informações pessoais óbvias</li>
                  <li>• Não compartilhe sua senha</li>
                </ul>
              </div>

              <Button className="w-full h-12" onClick={handleNext}>
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Etapa 4: Histórico de Saúde */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Saúde</CardTitle>
              <CardDescription>
                Essas informações nos ajudam a personalizar seus alertas preventivos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Você é fumante? *</Label>
                <RadioGroup
                  value={formData.isSmoker}
                  onValueChange={(value) => setFormData({ ...formData, isSmoker: value })}
                >
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="never" id="never" />
                    <Label htmlFor="never" className="flex-1 cursor-pointer">
                      Nunca fumei
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="former" id="former" />
                    <Label htmlFor="former" className="flex-1 cursor-pointer">
                      Ex-fumante
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="current" id="current" />
                    <Label htmlFor="current" className="flex-1 cursor-pointer">
                      Fumante atual
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Você tem alguma dessas condições?</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="diabetes"
                      checked={formData.hasDiabetes}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, hasDiabetes: checked as boolean })
                      }
                    />
                    <Label htmlFor="diabetes" className="flex-1 cursor-pointer">
                      Diabetes
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="hypertension"
                      checked={formData.hasHypertension}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, hasHypertension: checked as boolean })
                      }
                    />
                    <Label htmlFor="hypertension" className="flex-1 cursor-pointer">
                      Pressão Alta (Hipertensão)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="heartDisease"
                      checked={formData.hasHeartDisease}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, hasHeartDisease: checked as boolean })
                      }
                    />
                    <Label htmlFor="heartDisease" className="flex-1 cursor-pointer">
                      Doença Cardíaca
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="obesity"
                      checked={formData.hasObesity}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, hasObesity: checked as boolean })
                      }
                    />
                    <Label htmlFor="obesity" className="flex-1 cursor-pointer">
                      Obesidade
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherConditions">Outras condições (opcional)</Label>
                <Input
                  id="otherConditions"
                  placeholder="Descreva outras condições se houver"
                  value={formData.otherConditions}
                  onChange={(e) => setFormData({ ...formData, otherConditions: e.target.value })}
                  className="h-12"
                />
              </div>

              <Button className="w-full h-12" onClick={handleNext}>
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Etapa 5: Histórico Familiar */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico Familiar de Câncer</CardTitle>
              <CardDescription>
                Alguém na sua família teve algum tipo de câncer? Isso nos ajuda a recomendar exames preventivos adequados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Marque se algum familiar teve:</Label>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="breastCancer"
                      checked={formData.familyHistory.breastCancer}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          familyHistory: { ...formData.familyHistory, breastCancer: checked as boolean }
                        })
                      }
                    />
                    <Label htmlFor="breastCancer" className="flex-1 cursor-pointer">
                      Câncer de Mama
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="colonCancer"
                      checked={formData.familyHistory.colonCancer}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          familyHistory: { ...formData.familyHistory, colonCancer: checked as boolean }
                        })
                      }
                    />
                    <Label htmlFor="colonCancer" className="flex-1 cursor-pointer">
                      Câncer de Intestino (Colorretal)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="prostateCancer"
                      checked={formData.familyHistory.prostateCancer}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          familyHistory: { ...formData.familyHistory, prostateCancer: checked as boolean }
                        })
                      }
                    />
                    <Label htmlFor="prostateCancer" className="flex-1 cursor-pointer">
                      Câncer de Próstata
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="lungCancer"
                      checked={formData.familyHistory.lungCancer}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          familyHistory: { ...formData.familyHistory, lungCancer: checked as boolean }
                        })
                      }
                    />
                    <Label htmlFor="lungCancer" className="flex-1 cursor-pointer">
                      Câncer de Pulmão
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="skinCancer"
                      checked={formData.familyHistory.skinCancer}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          familyHistory: { ...formData.familyHistory, skinCancer: checked as boolean }
                        })
                      }
                    />
                    <Label htmlFor="skinCancer" className="flex-1 cursor-pointer">
                      Câncer de Pele
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <Checkbox
                      id="otherCancer"
                      checked={formData.familyHistory.other}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          familyHistory: { ...formData.familyHistory, other: checked as boolean }
                        })
                      }
                    />
                    <Label htmlFor="otherCancer" className="flex-1 cursor-pointer">
                      Outro tipo de câncer
                    </Label>
                  </div>
                </div>
              </div>

              {formData.familyHistory.other && (
                <div className="space-y-2">
                  <Label htmlFor="otherCancerDesc">Especifique o tipo de câncer</Label>
                  <Input
                    id="otherCancerDesc"
                    placeholder="Descreva o tipo de câncer"
                    value={formData.familyHistory.otherDescription}
                    onChange={(e) => 
                      setFormData({
                        ...formData,
                        familyHistory: { ...formData.familyHistory, otherDescription: e.target.value }
                      })
                    }
                    className="h-12"
                  />
                </div>
              )}

              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Por que perguntamos?</strong><br />
                  O histórico familiar é importante para identificar riscos e recomendar exames preventivos específicos para você.
                </p>
              </div>

              <Button className="w-full h-12" onClick={handleNext}>
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Etapa 6: Confirmação */}
        {step === 6 && (
          <Card>
            <CardContent className="pt-6 text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>

              <div>
                <h2>Cadastro Completo!</h2>
                <p className="text-muted-foreground mt-2">
                  Sua conta foi criada com sucesso
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4 text-left space-y-2">
                <h4>Suas informações:</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Nome:</strong> {formData.fullName}</p>
                  <p><strong>CPF:</strong> {formData.cpf}</p>
                  <p><strong>Telefone:</strong> {formData.phone}</p>
                </div>
              </div>

              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-sm">
                  Com base nas suas informações de saúde e histórico familiar, vamos personalizar seus alertas preventivos e recomendar os exames mais adequados para você.
                </p>
              </div>

              <Button className="w-full h-14" onClick={handleComplete}>
                Acessar Minha Conta
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
