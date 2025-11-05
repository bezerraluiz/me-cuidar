# Me Cuidar

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)

**Me Cuidar** é uma plataforma de saúde preventiva desenvolvida para facilitar o acesso e o acompanhamento de exames de rastreamento, com foco especial em mulheres que enfrentam barreiras no cuidado com a própria saúde.

## Sobre o Projeto

O Me Cuidar nasceu da necessidade de democratizar o acesso à saúde preventiva, ajudando pessoas como Regina - uma mulher de 50 anos que cuida da família mas esquece de cuidar de si mesma. A plataforma oferece:

- **Lembretes Inteligentes**: Notificações automáticas sobre exames preventivos atrasados ou próximos
- **Agendamento Simplificado**: Marque consultas e exames sem precisar enfrentar filas telefônicas
- **Educação em Saúde**: Conteúdo claro e acessível sobre exames e prevenção de doenças
- **Histórico Completo**: Acompanhamento longitudinal de toda sua jornada de saúde
- **Avaliação de Risco**: Sistema inteligente que identifica seus riscos de saúde baseado em dados pessoais e histórico familiar

## Funcionalidades Principais

- **Dashboard Personalizado**: Visão geral da sua saúde com exames pendentes e agendados
- **Check-in de Saúde**: Acompanhamento regular do seu estado de saúde
- **Módulos Educacionais**: Aprenda sobre prevenção e cuidados de forma simples
- **Chat de Emergência**: Canal direto para situações que necessitam atenção urgente
- **Fila Virtual**: Acompanhe sua posição em tempo real
- **Perfil Completo**: Gerencie seus dados, histórico familiar e preferências

## Tecnologias Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Ícones**: Lucide React
- **Notificações**: Sonner
- **Gráficos**: Recharts

## Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/me-cuidar.git
cd me-cuidar
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Dados de Teste

Para testar a aplicação, utilize as seguintes credenciais:

- **CPF**: 123.456.789-00
- **Senha**: regina123

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/       # Componentes React organizados por funcionalidade
│   │   ├── auth/        # Autenticação e registro
│   │   ├── checkin/     # Check-in de saúde
│   │   ├── education/   # Módulos educacionais
│   │   ├── emergency/   # Chat de emergência
│   │   ├── health/      # Saúde preventiva
│   │   ├── scheduling/  # Agendamento de exames
│   │   └── ui/          # Componentes de interface (shadcn/ui)
│   ├── data/            # Dados mock para desenvolvimento
│   ├── utils/           # Utilitários e helpers
│   └── page.tsx         # Página principal
```

## Deploy

A aplicação está disponível em produção:

**URL**: [https://me-cuidar-hackathon.vercel.app/](https://me-cuidar-hackathon.vercel.app/)

## Roadmap

- [ ] Integração com APIs do SUS
- [ ] Sistema de notificações por SMS/WhatsApp
- [ ] Integração com wearables (smartwatches)
- [ ] Telemedicina integrada
- [ ] Suporte multilíngue
- [ ] App mobile nativo (React Native)

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Recursos Adicionais

Para aprender mais sobre as tecnologias utilizadas:

- [Documentação do Next.js](https://nextjs.org/docs)
- [Tutorial Interativo do Next.js](https://nextjs.org/learn)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## Licença

Este projeto e todo o código-fonte são de propriedade de **Luiz Antônio Ponciano Costa Bezerra**.

Todos os direitos reservados © 2025 Luiz Antônio Ponciano Costa Bezerra.

O uso, cópia, modificação ou distribuição deste código requer autorização expressa do proprietário.

---
