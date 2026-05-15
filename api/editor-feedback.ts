type VercelRequest = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[]>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  send: (body: string) => void;
};

const allowedStatuses = ['pending', 'accepted', 'rejected', 'done'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res
        .status(503)
        .json({ error: 'Supabase backend yapılandırılmamış. SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.' });
    }

    if (req.method === 'GET') return handleGet(res);
    if (req.method === 'POST') return handlePost(req, res);
    if (req.method === 'PATCH') return handlePatch(req, res);

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected server error',
    });
  }
}

async function handleGet(res: VercelResponse) {
  const rows = await supabaseFetch(
    '/rest/v1/editor_feedback?select=*&order=created_at.desc&limit=100',
    { method: 'GET' },
  );
  return res.status(200).json({ feedback: rows });
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  const body = parseBody(req.body);
  const required = [
    'moduleTitle',
    'userName',
    'appRole',
    'clinicalRole',
    'contributionArea',
    'editIntent',
    'feedback',
    'suggestedEdit',
    'sourceNote',
    'commandText',
  ];
  const missing = required.filter((key) => typeof body[key] !== 'string');
  if (missing.length > 0) {
    return res.status(400).json({ error: `Eksik alan: ${missing.join(', ')}` });
  }

  const row = {
    app_role: body.appRole,
    clinical_role: body.clinicalRole,
    command_text: body.commandText,
    contribution_area: body.contributionArea,
    edit_intent: body.editIntent,
    feedback: body.feedback,
    module_title: body.moduleTitle,
    source_note: body.sourceNote,
    status: 'pending',
    suggested_edit: body.suggestedEdit,
    user_name: body.userName,
  };

  const rows = await supabaseFetch('/rest/v1/editor_feedback', {
    body: JSON.stringify(row),
    headers: { Prefer: 'return=representation' },
    method: 'POST',
  });

  return res.status(201).json({ feedback: rows[0] });
}

async function handlePatch(req: VercelRequest, res: VercelResponse) {
  const body = parseBody(req.body);
  if (typeof body.id !== 'string' || !allowedStatuses.includes(String(body.status))) {
    return res.status(400).json({ error: 'id ve geçerli status gerekli.' });
  }

  const rows = await supabaseFetch(`/rest/v1/editor_feedback?id=eq.${encodeURIComponent(body.id)}`, {
    body: JSON.stringify({ status: body.status }),
    headers: { Prefer: 'return=representation' },
    method: 'PATCH',
  });

  return res.status(200).json({ feedback: rows[0] });
}

async function supabaseFetch(path: string, init: RequestInit) {
  const response = await fetch(`${process.env.SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Supabase request failed with ${response.status}`);
  }

  return response.json();
}

function parseBody(body: unknown): Record<string, unknown> {
  if (typeof body === 'string') return JSON.parse(body);
  if (body && typeof body === 'object') return body as Record<string, unknown>;
  return {};
}
