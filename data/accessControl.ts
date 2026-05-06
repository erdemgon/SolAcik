export type AccessRole = 'admin' | 'editor' | 'beta';

export type AccessSession = {
  displayName: string;
  role: AccessRole;
  roleLabel: string;
  inviteLabel: string;
};

type InviteCodeRecord = {
  code: string;
  role: AccessRole;
  roleLabel: string;
  inviteLabel: string;
};

export const accessPolicy = {
  buildLabel: 'Build 0.3 kontrollü beta',
  warning:
    'Build 0.3 sonrası Sol Açık yalnızca beta kullanıcılar, editör adayları ve klinik editör kurulu için kontrollü değerlendirme sürümüdür. Bu basit davet kodu sistemi gerçek kimlik doğrulama değildir; açık kaynak beta ayrımı amacı taşır.',
};

export const inviteCodes: InviteCodeRecord[] = [
  {
    code: 'SOL-ADMIN-ERDEM',
    role: 'admin',
    roleLabel: 'Admin / klinik editör sorumlusu',
    inviteLabel: 'Kurucu klinik editör',
  },
  {
    code: 'SOL-EDITOR-2026',
    role: 'editor',
    roleLabel: 'Editör / editör adayı',
    inviteLabel: 'Genel klinik editör daveti',
  },
  {
    code: 'SOL-BETA-2026',
    role: 'beta',
    roleLabel: 'Beta kullanıcı',
    inviteLabel: 'Test drive beta daveti',
  },
];

export function normalizeInviteCode(value: string) {
  return value.trim().toLocaleUpperCase('tr-TR').replace(/\s+/g, '');
}

export function validateInviteCode({
  displayName,
  inviteCode,
}: {
  displayName: string;
  inviteCode: string;
}): { ok: true; session: AccessSession } | { ok: false; message: string } {
  const cleanName = displayName.trim();
  if (cleanName.length < 2) {
    return { ok: false, message: 'Lütfen en az 2 karakterlik bir kullanıcı adı yazın.' };
  }

  const normalized = normalizeInviteCode(inviteCode);
  const match = inviteCodes.find((item) => item.code === normalized);

  if (!match) {
    return {
      ok: false,
      message: 'Davet kodu tanınmadı. Kodu büyük/küçük harfe bakmadan, boşluksuz girin.',
    };
  }

  return {
    ok: true,
    session: {
      displayName: cleanName,
      role: match.role,
      roleLabel: match.roleLabel,
      inviteLabel: match.inviteLabel,
    },
  };
}
