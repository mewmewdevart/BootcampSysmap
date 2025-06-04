// ====================== FIELD VALIDATION ======================
export const ERROR_REQUIRED_FIELDS = 'E1: Informe os campos obrigatórios corretamente.';
export const ERROR_NAME_EMPTY = 'E1: Informe os campos obrigatórios corretamente. O campo nome está vazio.';
export const ERROR_NAME_ONLY_NUMBERS = 'E1: Informe os campos obrigatórios corretamente. O campo nome não pode ser composto apenas por números.';
export const ERROR_NAME_CONTAINS_NUMBERS = 'E1: Informe os campos obrigatórios corretamente. O campo nome não pode conter números.';
export const ERROR_EMAIL_INVALID = 'E1: Informe os campos obrigatórios corretamente. O campo e-mail está inválido.';
export const ERROR_CPF_EMPTY = 'E1: Informe os campos obrigatórios corretamente. O campo CPF está vazio.';
export const ERROR_CPF_INVALID = 'E1: Informe os campos obrigatórios corretamente. O campo CPF deve conter 11 dígitos numéricos.';
export const ERROR_PASSWORD_EMPTY = 'E1: Informe os campos obrigatórios corretamente. O campo senha está vazio.';
export const ERROR_PASSWORD_MIN_LENGTH = 'E1: Informe os campos obrigatórios corretamente. O campo senha deve ter no mínimo 6 caracteres.';
export const ERROR_PASSWORD_UPPERCASE = 'E1: Informe os campos obrigatórios corretamente. O campo senha deve conter pelo menos uma letra maiúscula.';
export const ERROR_PASSWORD_LOWERCASE = 'E1: Informe os campos obrigatórios corretamente. O campo senha deve conter pelo menos uma letra minúscula.';
export const ERROR_PASSWORD_NUMBER = 'E1: Informe os campos obrigatórios corretamente. O campo senha deve conter pelo menos um número.';
export const ERROR_PASSWORD_SPECIAL_CHAR = 'E1: Informe os campos obrigatórios corretamente. O campo senha deve conter pelo menos um caractere especial.';
export const ERROR_PASSWORD_ONLY_NUMBERS = 'E1: Informe os campos obrigatórios corretamente. O campo senha não pode ser composta apenas por números.';
export const ERROR_CONFIRM_PASSWORD_EMPTY = 'E1: Informe os campos obrigatórios corretamente. O campo confirmação de senha está vazio.';
export const ERROR_CONFIRM_PASSWORD_MISMATCH = 'E1: Informe os campos obrigatórios corretamente. As senhas não coincidem.';
export const ERROR_EMAIL_REQUIRED = 'E1: Informe os campos obrigatórios corretamente. O campo e-mail é obrigatório.';
export const ERROR_PASSWORD_REQUIRED = 'E1: Informe os campos obrigatórios corretamente. O campo senha é obrigatório.';
export const ERROR_INVALID_FIELDS = 'E1: Informe os campos obrigatórios corretamente. Campos inválidos ou não permitidos.';
export const ERROR_IMAGE_FORMAT = 'E2: A imagem deve ser um arquivo PNG ou JPG.';
export const ERROR_INVALID_URL = 'E2: A imagem deve ser uma URL válida.';

// ====================== USER MANAGEMENT ======================
export const ERROR_USER_ALREADY_EXISTS = 'E3: O e-mail ou CPF informado já pertence a outro usuário.';
export const ERROR_USER_NOT_FOUND = 'E4: Usuário não encontrado.';
export const ERROR_INCORRECT_PASSWORD = 'E5: Senha incorreta.';
export const ERROR_ACCOUNT_DEACTIVATED = 'E6: Esta conta foi desativada e não pode ser utilizada.';
export const ERROR_CPF_INVALID_CUSTOM = 'E7: O CPF não pode ser alterado.';
export const ERROR_ACCOUNT_ALREADY_DEACTIVATED = 'E7: Esta conta já está desativada.';
export const ERROR_ACHIEVEMENT_NOT_FOUND = 'E7: Conquista não encontrada.';

// ====================== ACTIVITIES ======================
export const ERROR_ALREADY_REGISTERED = 'E8: Você já se registrou nesta atividade.';
export const ERROR_CREATOR_CANNOT_REGISTER = 'E9: O criador da atividade não pode se inscrever como participante.';
export const ERROR_CHECKIN_NOT_ALLOWED = 'E10: Apenas participantes aprovados na atividade podem fazer check-in.';
export const ERROR_INVALID_CONFIRMATION_CODE = 'E11: Código de confirmação incorreto.';
export const ERROR_ALREADY_CONFIRMED = 'E12: Você já confirmou sua participação nesta atividade.';
export const ERROR_ACTIVITY_COMPLETED_REGISTRATION = 'E13: Não é possível se inscrever em uma atividade concluída.';
export const ERROR_ACTIVITY_COMPLETED_CONFIRMATION = 'E14: Não é possível confirmar presença em uma atividade concluída.';
export const ERROR_ONLY_CREATOR_CAN_EDIT = 'E15: Apenas o criador da atividade pode editá-la.';
export const ERROR_ONLY_CREATOR_CAN_DELETE = 'E16: Apenas o criador da atividade pode excluí-la.';
export const ERROR_ONLY_CREATOR_CAN_APPROVE = 'E17: Apenas o criador da atividade pode aprovar participantes.';
export const ERROR_ONLY_CREATOR_CAN_COMPLETE = 'E18: Apenas o criador da atividade pode concluí-la.';
export const ERROR_CANNOT_CANCEL_CONFIRMED = 'E19: Não é possível cancelar inscrição com presença confirmada.';
export const ERROR_ACTIVITY_NOT_FOUND = 'E20: Atividade não encontrada.';
export const ERROR_PREFERENCES_INVALID = 'E20: Preferências inválidas.';
export const ERROR_ACHIEVEMENT_ALREADY_ADDED = 'E20: Conquista já adicionada.';

// ====================== AUTHENTICATION ======================
export const ERROR_AUTH_REQUIRED = 'E21: Autenticação necessária.';
export const ERROR_INVALID_TOKEN = 'E22: Token inválido ou expirado.';

// ====================== SYSTEM ======================
export const ERROR_UNKNOWN = 'E23: Erro inesperado.';
export const ERROR_SEED_FAILED = 'E24: Falha na população de dados iniciais.';
export const ERROR_ENV_VARIABLE_MISSING = 'E24: Variável de ambiente ausente.';


export const ERROR_FORBIDDEN = 'E25: Acesso negado.';
export const ERROR_ONLY_CREATOR_CAN_VIEW_CONFIRMATION = 'E26: Apenas o criador da atividade pode visualizar a confirmação de presença.';
export const ERROR_INVALID_UUID = 'E27: UUID inválido.';
