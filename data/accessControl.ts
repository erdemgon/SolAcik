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
  buildLabel: 'Build 0.3 gözlem kapalı',
  warning:
    'Sol Açık geçici olarak dış beta ve editör erişimine kapatılmıştır. Bu sürüm yalnızca kurucu klinik editör/admin tarafından gözden geçirilecektir. Bu basit davet kodu sistemi gerçek kimlik doğrulama değildir; açık kaynak geliştirme sürecinde geçici erişim ayrımı amacı taşır.',
};

export const inviteCodes: InviteCodeRecord[] = [
  {
    code: '3112443',
    role: 'admin',
    roleLabel: 'Admin / klinik editör sorumlusu',
    inviteLabel: 'Kurucu klinik editör kısa kod',
  },
  {
    code: 'SOL-ADMIN-ERDEM',
    role: 'admin',
    roleLabel: 'Admin / klinik editör sorumlusu',
    inviteLabel: 'Kurucu klinik editör',
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
