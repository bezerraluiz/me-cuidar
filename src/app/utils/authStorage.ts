/**
 * Utilitário para gerenciar o armazenamento de autenticação com expiração
 */

interface StoredAuthData {
  userData: any;
  timestamp: number;
  expiresAt: number;
}

const AUTH_STORAGE_KEY = "me_cuidar_auth";
const EXPIRATION_DAYS = 30;

/**
 * Salva os dados de autenticação no localStorage com data de expiração
 */
export function saveAuthData(userData: any): void {
  try {
    const now = Date.now();
    const expiresAt = now + EXPIRATION_DAYS * 24 * 60 * 60 * 1000; // 30 dias em milissegundos

    const dataToStore: StoredAuthData = {
      userData,
      timestamp: now,
      expiresAt,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.error("Erro ao salvar dados de autenticação:", error);
  }
}

/**
 * Valida se os dados do usuário têm todos os campos necessários
 */
function validateUserData(userData: any): boolean {
  // Campos obrigatórios
  const requiredFields = ['id', 'fullName', 'cpf', 'age', 'birthDate', 'gender', 'email', 'phone'];

  for (const field of requiredFields) {
    if (!userData[field]) {
      console.warn(`Campo obrigatório ausente: ${field}`);
      return false;
    }
  }

  return true;
}

/**
 * Recupera os dados de autenticação do localStorage
 * Retorna null se não existir, estiver expirado, corrompido ou incompleto
 */
export function getAuthData(): any | null {
  try {
    const storedData = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedData) {
      return null;
    }

    const parsedData: StoredAuthData = JSON.parse(storedData);
    const now = Date.now();

    // Verificar se os dados expiraram
    if (now > parsedData.expiresAt) {
      // Dados expirados, remover do storage
      clearAuthData();
      return null;
    }

    // Validar se os dados têm todos os campos necessários
    if (!validateUserData(parsedData.userData)) {
      console.warn("Dados do usuário incompletos no storage. Limpando e requerendo novo login.");
      clearAuthData();
      return null;
    }

    return parsedData.userData;
  } catch (error) {
    console.error("Erro ao recuperar dados de autenticação:", error);
    // Se houver erro ao parsear, limpar o storage
    clearAuthData();
    return null;
  }
}

/**
 * Remove os dados de autenticação do localStorage
 */
export function clearAuthData(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar dados de autenticação:", error);
  }
}

/**
 * Verifica se existe uma sessão válida (não expirada)
 */
export function hasValidSession(): boolean {
  return getAuthData() !== null;
}

/**
 * Obtém o tempo restante até a expiração em dias
 */
export function getSessionExpirationDays(): number | null {
  try {
    const storedData = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedData) {
      return null;
    }

    const parsedData: StoredAuthData = JSON.parse(storedData);
    const now = Date.now();
    const timeRemaining = parsedData.expiresAt - now;

    if (timeRemaining <= 0) {
      return 0;
    }

    return Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));
  } catch (error) {
    console.error("Erro ao calcular expiração:", error);
    return null;
  }
}

/**
 * Renova a sessão, estendendo a expiração por mais 30 dias
 */
export function renewSession(): boolean {
  try {
    const userData = getAuthData();

    if (!userData) {
      return false;
    }

    // Salvar novamente para renovar a expiração
    saveAuthData(userData);
    return true;
  } catch (error) {
    console.error("Erro ao renovar sessão:", error);
    return false;
  }
}
