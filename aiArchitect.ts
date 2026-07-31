import { FullStackFeature, FeatureLayer } from '../types/project';

export interface GeneratedSpec {
  title: string;
  description: string;
  layer: FeatureLayer;
  priority: 'high' | 'medium' | 'low';
  frontendSpec: {
    components: string[];
    stateManagement: string;
    accessibilityNotes: string;
    sampleCodeSnippet: string;
  };
  backendSpec: {
    apiEndpoints: string[];
    authRequirement: string;
    validationSchema: string;
    sampleCodeSnippet: string;
  };
  databaseSpec: {
    tablesOrCollections: string[];
    indexes: string[];
    sampleSchema: string;
  };
  securityChecklist: {
    id: string;
    label: string;
    completed: boolean;
  }[];
}

export function generateFullStackSpec(prompt: string, clientName: string = 'Client'): GeneratedSpec {
  const lower = prompt.toLowerCase();

  // 1. Auth & Identity Pattern
  if (lower.includes('auth') || lower.includes('oauth') || lower.includes('jwt') || lower.includes('login') || lower.includes('sso')) {
    return {
      title: `${prompt} (Production Full-Stack Spec)`,
      description: `Complete full-stack authentication workflow for ${clientName} with short-lived JWT access tokens, HTTP-only refresh rotation, and zero-trust session management.`,
      layer: 'fullstack',
      priority: 'high',
      frontendSpec: {
        components: ['AuthModalDialog.tsx', 'MfaChallengeForm.tsx', 'SessionTimerBadge.tsx'],
        stateManagement: 'React Context (AuthProvider) storing ephemeral user profile; access tokens kept in RAM only.',
        accessibilityNotes: 'WCAG AA contrast on form labels, ARIA error messaging on failed credentials, auto-focus on MFA input.',
        sampleCodeSnippet: `// Secure React Auth Hook
export function useSecureClientAuth() {
  const [user, setUser] = useState<User | null>(null);

  const loginWithMfa = async (credentials: Credentials) => {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', // For httpOnly refresh cookie
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setUser(data.user);
  };

  return { user, loginWithMfa };
}`
      },
      backendSpec: {
        apiEndpoints: [
          'POST /api/v1/auth/login',
          'POST /api/v1/auth/refresh',
          'POST /api/v1/auth/logout',
          'GET /api/v1/auth/me'
        ],
        authRequirement: 'Public for login/refresh; requireJwtGuard() for /me and protected routes.',
        validationSchema: 'Zod schema validating RFC 5322 email syntax, password complexity, and 6-digit MFA token.',
        sampleCodeSnippet: `// Express Route: Token Refresh with Rotation
app.post('/api/v1/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh session' });

  const session = await db.query.sessions.findFirst({ where: eq(token, refreshToken) });
  if (!session || session.expiresAt < new Date()) {
    return res.status(403).json({ error: 'Session expired' });
  }

  // Rotate refresh token securely
  const newRefreshToken = generateSecureToken();
  await rotateSessionToken(session.id, newRefreshToken);

  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 3600 * 1000
  });
  return res.json({ accessToken: signJwt(session.userId) });
});`
      },
      databaseSpec: {
        tablesOrCollections: ['users', 'user_sessions', 'auth_audit_logs'],
        indexes: ['idx_users_email_unique', 'idx_sessions_refresh_token'],
        sampleSchema: `CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token_hash VARCHAR(128) UNIQUE NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
      },
      securityChecklist: [
        { id: 'sec-1', label: 'Refresh tokens stored in HTTP-only, Secure, SameSite=Strict cookies', completed: true },
        { id: 'sec-2', label: 'Rate-limiting applied to prevent credential stuffing (max 5 attempts/min)', completed: true },
        { id: 'sec-3', label: 'Bcrypt/Argon2id hashing used for stored password hashes', completed: true },
        { id: 'sec-4', label: 'All failed login attempts logged to immutable auth_audit_logs', completed: true }
      ]
    };
  }

  // 2. Real-Time WebSockets / Notifications Pattern
  if (lower.includes('websocket') || lower.includes('realtime') || lower.includes('stream') || lower.includes('live') || lower.includes('notification')) {
    return {
      title: `${prompt} (Real-Time Architecture)`,
      description: `Event-driven bi-directional communication layer for ${clientName} allowing real-time state synchronization across active sessions.`,
      layer: 'fullstack',
      priority: 'high',
      frontendSpec: {
        components: ['RealtimeFeed.tsx', 'ConnectionIndicatorBadge.tsx', 'LiveToastCenter.tsx'],
        stateManagement: 'Custom useWebSocketChannel hook with automatic exponential backoff reconnection.',
        accessibilityNotes: 'Screen reader aria-live="polite" announcements for incoming notifications without stealing focus.',
        sampleCodeSnippet: `// Front-end WebSocket Subscription Hook
export function useClientLiveFeed(channel: string) {
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [status, setStatus] = useState<'connected' | 'reconnecting' | 'offline'>('connected');

  useEffect(() => {
    const ws = new WebSocket(\`wss://api.clientdomain.com/ws?channel=\${channel}\`);
    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      setMessages((prev) => [payload, ...prev].slice(0, 50));
    };
    ws.onclose = () => setStatus('reconnecting');
    return () => ws.close();
  }, [channel]);

  return { messages, status };
}`
      },
      backendSpec: {
        apiEndpoints: [
          'WS /ws/client-channel (WebSocket Upgrade)',
          'POST /api/v1/broadcast/publish'
        ],
        authRequirement: 'WebSocket URL token validation + Role check on broadcast trigger.',
        validationSchema: 'Zod event payload validation ensuring strict JSON schema conformity.',
        sampleCodeSnippet: `// Back-end WebSocket Broadcast Engine
const redisPubSub = createRedisClient();

wss.on('connection', (ws, req) => {
  const clientId = extractTenantFromReq(req);
  ws.clientId = clientId;
  
  redisPubSub.subscribe(\`client:feed:\${clientId}\`, (message) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
});`
      },
      databaseSpec: {
        tablesOrCollections: ['live_event_history', 'notification_preferences'],
        indexes: ['idx_live_events_client_time'],
        sampleSchema: `CREATE TABLE live_event_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  event_type VARCHAR(64) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
      },
      securityChecklist: [
        { id: 'sec-rt-1', label: 'WebSocket handshake authenticated before channel subscription', completed: true },
        { id: 'sec-rt-2', label: 'Tenant isolation checked on every broadcast payload', completed: true },
        { id: 'sec-rt-3', label: 'Maximum message payload size capped at 64KB to prevent DOS', completed: true }
      ]
    };
  }

  // 3. Payment / Billing / Ledger Pattern
  if (lower.includes('pay') || lower.includes('stripe') || lower.includes('bill') || lower.includes('ledger') || lower.includes('invoice') || lower.includes('webhook')) {
    return {
      title: `${prompt} (Idempotent Transaction Layer)`,
      description: `Secure financial processing pipeline for ${clientName} featuring Stripe webhook validation, ACID PostgreSQL ledger transactions, and idempotency guarantees.`,
      layer: 'backend',
      priority: 'high',
      frontendSpec: {
        components: ['BillingCheckoutCard.tsx', 'InvoiceHistoryTable.tsx', 'PaymentStatusModal.tsx'],
        stateManagement: 'SWR transaction polling with optimistic status badge updates.',
        accessibilityNotes: 'Clear currency formatting and keyboard-navigable payment method selector.',
        sampleCodeSnippet: `// Stripe Checkout Trigger
export async function initiateSecureCheckout(planId: string) {
  const res = await fetch('/api/v1/billing/checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Idempotency-Key': crypto.randomUUID() },
    body: JSON.stringify({ planId })
  });
  const { url } = await res.json();
  window.location.href = url;
}`
      },
      backendSpec: {
        apiEndpoints: [
          'POST /api/v1/billing/checkout-session',
          'POST /api/v1/webhooks/stripe',
          'GET /api/v1/billing/invoices'
        ],
        authRequirement: 'Stripe HMAC signature for webhooks; JWT Auth for checkout session.',
        validationSchema: 'Strict currency ISO code and positive integer cents validation.',
        sampleCodeSnippet: `// Idempotent Ledger Transaction via Drizzle ORM
export async function recordSettlement(invoiceId: string, amountCents: number) {
  return await db.transaction(async (tx) => {
    const existing = await tx.query.ledgers.findFirst({
      where: eq(ledgers.invoiceId, invoiceId)
    });
    if (existing) return existing; // Already processed!

    return await tx.insert(ledgers).values({
      invoiceId,
      amountCents,
      status: 'SETTLED'
    }).returning();
  });
}`
      },
      databaseSpec: {
        tablesOrCollections: ['client_invoices', 'ledger_entries', 'webhook_idempotency_log'],
        indexes: ['idx_invoices_client_id', 'UNIQUE INDEX idx_idempotency_key'],
        sampleSchema: `CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  invoice_id VARCHAR(64) UNIQUE NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  status VARCHAR(24) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
      },
      securityChecklist: [
        { id: 'sec-pay-1', label: 'Webhook HMAC signature verified against STRIPE_WEBHOOK_SECRET', completed: true },
        { id: 'sec-pay-2', label: 'Database UNIQUE constraint prevents duplicate payment credits', completed: true },
        { id: 'sec-pay-3', label: 'No credit card numbers or CVV ever touch server logs', completed: true }
      ]
    };
  }

  // 4. Default Full-Stack Architecture Pattern
  return {
    title: `${prompt} (Full-Stack Feature Architecture)`,
    description: `End-to-end full-stack feature architecture for ${clientName} integrating React 19 UI components, Express API endpoints, PostgreSQL schema, and security checks.`,
    layer: 'fullstack',
    priority: 'medium',
    frontendSpec: {
      components: ['FeatureContainer.tsx', 'FeatureDataGrid.tsx', 'FeatureActionModal.tsx'],
      stateManagement: 'React 19 functional hooks with SWR client caching & error boundaries.',
      accessibilityNotes: 'WCAG 2.1 AA compliant colors, semantic headings, and keyboard Esc modal dismissal.',
      sampleCodeSnippet: `// Front-end Component Architecture
export function FeatureWorkspace({ clientId }: { clientId: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload: unknown) => {
    setLoading(true);
    try {
      const res = await fetch(\`/api/v1/client/\${clientId}/resource\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request rejected');
    } finally {
      setLoading(false);
    }
  };

  return <FeatureForm onSubmit={handleSubmit} isLoading={loading} />;
}`
    },
    backendSpec: {
      apiEndpoints: [
        'GET /api/v1/client/:clientId/resource',
        'POST /api/v1/client/:clientId/resource',
        'PUT /api/v1/client/:clientId/resource/:id',
        'DELETE /api/v1/client/:clientId/resource/:id'
      ],
      authRequirement: 'Requires valid JWT bearer token with "client:collaborator" role.',
      validationSchema: 'Zod input schema validating all strings, UUIDs, and numerical bounds.',
      sampleCodeSnippet: `// Backend Express API Handler
app.get('/api/v1/client/:clientId/resource', requireAuth, async (req, res) => {
  const { clientId } = req.params;
  
  // Enforce Tenant Security Check
  if (req.user!.clientId !== clientId && req.user!.role !== 'admin') {
    return res.status(403).json({ error: 'Tenant Access Denied' });
  }

  const items = await db.query.resources.findMany({
    where: eq(resources.clientId, clientId),
    orderBy: [desc(resources.updatedAt)]
  });
  return res.json({ status: 'ok', count: items.length, data: items });
});`
    },
    databaseSpec: {
      tablesOrCollections: ['client_resources', 'resource_audit_history'],
      indexes: ['idx_resource_client_id_created'],
      sampleSchema: `CREATE TABLE client_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`
    },
    securityChecklist: [
      { id: 'sec-gen-1', label: 'All database queries parameterized to block SQL injection', completed: true },
      { id: 'sec-gen-2', label: 'Tenant ID explicitly validated against JWT token claim', completed: true },
      { id: 'sec-gen-3', label: 'CORS policy rejects unauthorized cross-origin requests', completed: true },
      { id: 'sec-gen-4', label: 'Confidential client discussions logged to dedicated Google Meet records', completed: true }
    ]
  };
}
