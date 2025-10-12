# Sistema de Armazenamento de Autenticação

## Visão Geral

O sistema de armazenamento de autenticação foi implementado para manter o usuário logado mesmo após atualizar a página, com uma expiração automática de 30 dias.

## Arquivos Criados/Modificados

### 1. `src/app/utils/authStorage.ts`
Utilitário responsável por gerenciar o armazenamento local da autenticação.

#### Funções Disponíveis:

- **`saveAuthData(userData: any): void`**
  - Salva os dados do usuário no localStorage com timestamp de expiração de 30 dias
  - Armazena automaticamente a data de criação e expiração

- **`getAuthData(): any | null`**
  - Recupera os dados do usuário do localStorage
  - Verifica automaticamente se a sessão expirou
  - Retorna `null` se não houver dados ou se estiverem expirados
  - Remove automaticamente dados expirados ou corrompidos

- **`clearAuthData(): void`**
  - Remove os dados de autenticação do localStorage
  - Usado ao fazer logout

- **`hasValidSession(): boolean`**
  - Verifica se existe uma sessão válida (não expirada)

- **`getSessionExpirationDays(): number | null`**
  - Retorna quantos dias faltam até a sessão expirar
  - Útil para exibir avisos ao usuário

- **`renewSession(): boolean`**
  - Renova a sessão atual por mais 30 dias
  - Retorna `true` se a renovação foi bem-sucedida

### 2. `src/app/page.tsx` (Modificado)
Componente principal integrado com o sistema de storage.

#### Modificações Realizadas:

1. **Import do utilitário**:
   ```typescript
   import { saveAuthData, getAuthData, clearAuthData } from "./utils/authStorage";
   ```

2. **useEffect para restaurar sessão**:
   - Executa ao carregar a página
   - Verifica se existe uma sessão salva
   - Restaura automaticamente o usuário logado
   - Exibe toast de "Sessão restaurada"

3. **handleLogin atualizado**:
   - Salva os dados do usuário no storage após login bem-sucedido
   - Usa `saveAuthData(userData)`

4. **handleRegistrationComplete atualizado**:
   - Salva os dados do usuário após registro completo
   - Mantém o usuário logado após o cadastro

5. **handleLogout atualizado**:
   - Limpa os dados do storage ao fazer logout
   - Usa `clearAuthData()`

## Como Funciona

### Fluxo de Login:
1. Usuário faz login com CPF e senha
2. Sistema valida as credenciais
3. `saveAuthData()` é chamado, salvando:
   - Dados do usuário
   - Timestamp atual
   - Data de expiração (30 dias no futuro)
4. Usuário é redirecionado para o dashboard

### Fluxo de Restauração de Sessão:
1. Usuário atualiza a página (F5)
2. `useEffect` é executado automaticamente
3. `getAuthData()` verifica se existe sessão salva
4. Se existe e não expirou:
   - Restaura os dados do usuário
   - Define `isAuthenticated = true`
   - Usuário permanece logado
5. Se expirou ou não existe:
   - Retorna para tela de login

### Fluxo de Logout:
1. Usuário clica em "Sair"
2. `clearAuthData()` remove dados do localStorage
3. Estados são resetados
4. Usuário volta para tela de login

## Segurança

- Os dados são armazenados apenas no localStorage do navegador
- A expiração é verificada automaticamente a cada acesso
- Dados corrompidos são removidos automaticamente
- Não armazena senhas, apenas dados de perfil do usuário

## Configuração

Para alterar o tempo de expiração, edite a constante em `authStorage.ts`:

```typescript
const EXPIRATION_DAYS = 30; // Alterar para o número de dias desejado
```

## Testando

Para testar o sistema:

1. Faça login no sistema (CPF: 123.456.789-00, Senha: regina123)
2. Atualize a página (F5) - você deve permanecer logado
3. Abra o DevTools do navegador (F12)
4. Vá em Application > Local Storage
5. Procure pela chave `bem_cuidar_auth`
6. Você verá um objeto JSON com:
   - `userData`: dados do usuário
   - `timestamp`: quando foi salvo
   - `expiresAt`: quando vai expirar

## Limpando a Sessão Manualmente

Para limpar a sessão manualmente (útil durante desenvolvimento):

```javascript
// No console do navegador (F12):
localStorage.removeItem('bem_cuidar_auth');
// Depois atualize a página
```

## Próximas Melhorias Possíveis

- Adicionar criptografia dos dados armazenados
- Implementar refresh token para renovação automática
- Adicionar notificação ao usuário quando a sessão estiver próxima de expirar
- Sincronizar sessão entre múltiplas abas
- Adicionar opção "Lembrar-me" no login para controlar a expiração
