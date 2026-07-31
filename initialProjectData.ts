import { ClientProject, FullStackFeature, MeetSession, RoadmapNode, SecurityAuditItem } from '../types/project';

export const INITIAL_ROADMAP_NODES: RoadmapNode[] = [
  // 1. FRONTEND ESSENTIALS
  {
    id: 'fe-react-ts',
    title: 'React 19 & Strict TypeScript Architecture',
    category: 'frontend',
    level: 'essential',
    status: 'production-ready',
    description: 'Component architecture with strict type safety, memoization, functional hooks, and zero any-types.',
    whyImportantForClient: 'Ensures zero runtime type errors, maintainable client codebases, and predictable UI states.',
    keySkills: ['Strict TS Type Guards', 'Custom Hooks', 'Error Boundaries', 'Optimistic UI Updates'],
    clientChecklist: [
      { id: 'c1', label: 'All API responses strictly typed with TypeScript interfaces', checked: true },
      { id: 'c2', label: 'No unchecked any or implicit any in client bundle', checked: true },
      { id: 'c3', label: 'Fallback UI boundaries for graceful client error recovery', checked: true },
    ],
    codeSnippetTitle: 'Strictly Typed API Fetch Hook with AbortController',
    codeSnippet: `export function useSecureClientQuery<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal, credentials: 'omit' })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      });
    return () => controller.abort();
  }, [url]);

  return { data, error };
}`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },
  {
    id: 'fe-state-mgmt',
    title: 'Client State & Server Cache Synchronization',
    category: 'frontend',
    level: 'essential',
    status: 'production-ready',
    description: 'Separation of ephemeral UI state from server-authoritative state with automatic cache invalidation.',
    whyImportantForClient: 'Prevents stale client data and race conditions during high-frequency transactions.',
    keySkills: ['Optimistic UI', 'Stale-While-Revalidate', 'Local Persistence', 'Session Scrubbing'],
    clientChecklist: [
      { id: 'c4', label: 'Sensitive tokens excluded from persistent local storage', checked: true },
      { id: 'c5', label: 'Optimistic mutations roll back cleanly on API rejection', checked: true },
    ],
    codeSnippetTitle: 'Safe Local Storage Wrapper with NDA Scrubbing',
    codeSnippet: `export const secureClientStore = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(\`client_enc_\${key}\`);
      return item ? JSON.parse(item) : null;
    } catch { return null; }
  },
  set: (key: string, value: unknown) => {
    localStorage.setItem(\`client_enc_\${key}\`, JSON.stringify(value));
  },
  scrubSession: () => localStorage.clear(),
};`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },
  {
    id: 'fe-web-perf',
    title: 'Core Web Vitals & Bundle Optimization',
    category: 'frontend',
    level: 'advanced',
    status: 'production-ready',
    description: 'Code-splitting, tree-shaking, lazy loading, and asset compression for sub-second LCP and INP.',
    whyImportantForClient: 'Maximizes client user conversion rates and mobile accessibility across diverse networks.',
    keySkills: ['Vite Code Splitting', 'Image Optimization', 'Font Preloading', 'Lighthouse 100/100'],
    clientChecklist: [
      { id: 'c6', label: 'Vendor chunks split below 250KB compressed', checked: true },
      { id: 'c7', label: 'No synchronous blocking scripts on first contentful paint', checked: true },
    ],
    codeSnippetTitle: 'Vite Code-Splitting Config for Client Apps',
    codeSnippet: `export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react', 'motion'],
        },
      },
    },
  },
});`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },

  // 2. BACKEND & APIS
  {
    id: 'be-rest-graphql',
    title: 'RESTful API Design & Versioning',
    category: 'backend',
    level: 'essential',
    status: 'production-ready',
    description: 'Resource-oriented API endpoints with semantic HTTP status codes, pagination, and OpenAPI contracts.',
    whyImportantForClient: 'Ensures backward compatibility for client mobile apps and clear integration contracts.',
    keySkills: ['OpenAPI 3.1', 'Idempotent PUT/PATCH', 'Cursor Pagination', 'Input Sanitization'],
    clientChecklist: [
      { id: 'c8', label: 'All POST/PUT request bodies validated with strict schemas', checked: true },
      { id: 'c9', label: 'Rate-limiting headers (X-RateLimit-Remaining) included', checked: true },
      { id: 'c10', label: 'Proper 401/403/404/422 status code semantics', checked: true },
    ],
    codeSnippetTitle: 'Express Middleware with Idempotency Key Check',
    codeSnippet: `app.post('/api/v1/client/transactions', async (req, res) => {
  const idempotencyKey = req.headers['x-idempotency-key'];
  if (!idempotencyKey) {
    return res.status(400).json({ error: 'Missing Idempotency-Key header' });
  }
  // Process transaction securely...
  return res.status(201).json({ status: 'success', id: 'tx_9821' });
});`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },
  {
    id: 'be-jwt-auth',
    title: 'Secure JWT Authentication & RBAC',
    category: 'backend',
    level: 'essential',
    status: 'production-ready',
    description: 'Short-lived access tokens with HTTP-only secure cookies, refresh rotation, and Role-Based Access Control.',
    whyImportantForClient: 'Protects client business logic and prevents privilege escalation attacks.',
    keySkills: ['RS256 Signature', 'Refresh Token Rotation', 'CSRF Protection', 'Zero-Trust RBAC'],
    clientChecklist: [
      { id: 'c11', label: 'JWT access tokens expire within 15 minutes', checked: true },
      { id: 'c12', label: 'Refresh tokens stored in httpOnly, SameSite=Strict cookies', checked: true },
      { id: 'c13', label: 'Role permissions checked on every protected endpoint', checked: true },
    ],
    codeSnippetTitle: 'Express RBAC Authorization Guard',
    codeSnippet: `export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Confidentiality Access Denied' });
    }
    next();
  };
};`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },
  {
    id: 'be-websockets',
    title: 'Real-Time WebSockets & Event-Driven Workers',
    category: 'backend',
    level: 'advanced',
    status: 'mastered',
    description: 'Bi-directional live event streaming for client notifications, order statuses, and Google Meet session alerts.',
    whyImportantForClient: 'Provides instant feedback without aggressive HTTP polling overhead.',
    keySkills: ['WebSocket Heartbeats', 'Event Broadcasts', 'Graceful Reconnection', 'Redis Pub/Sub'],
    clientChecklist: [
      { id: 'c14', label: 'WebSocket handshakes authenticated via ticket/token', checked: true },
      { id: 'c15', label: 'Automatic exponential backoff on connection drop', checked: true },
    ],
    codeSnippetTitle: 'Secure WebSocket Reconnection Hook',
    codeSnippet: `function createSecureWebSocket(url: string, token: string) {
  const ws = new WebSocket(\`\${url}?token=\${encodeURIComponent(token)}\`);
  ws.onclose = () => {
    setTimeout(() => createSecureWebSocket(url, token), 3000);
  };
  return ws;
}`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },

  // 3. DATA LAYER & DATABASES
  {
    id: 'db-postgres-drizzle',
    title: 'PostgreSQL Relational Schema & ORM Type Safety',
    category: 'database',
    level: 'essential',
    status: 'production-ready',
    description: 'ACID-compliant relational database modeling with Drizzle ORM, foreign key integrity, and B-Tree indexing.',
    whyImportantForClient: 'Guarantees financial transaction consistency and high-speed complex query execution.',
    keySkills: ['ACID Transactions', 'Composite Indexes', 'Connection Pooling', 'Migration Versioning'],
    clientChecklist: [
      { id: 'c16', label: 'Foreign keys use explicit ON DELETE CASCADE / RESTRICT', checked: true },
      { id: 'c17', label: 'All query parameters parameterized to prevent SQL injection', checked: true },
    ],
    codeSnippetTitle: 'Drizzle ORM Relational Schema with Index',
    codeSnippet: `export const clientTransactions = pgTable('client_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').notNull(),
  amountCents: integer('amount_cents').notNull(),
  status: varchar('status', { length: 32 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  clientIndex: index('idx_client_created').on(table.clientId, table.createdAt),
}));`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },
  {
    id: 'db-caching-redis',
    title: 'In-Memory Caching & Distributed Locks',
    category: 'database',
    level: 'advanced',
    status: 'in-progress',
    description: 'Sub-millisecond data caching for frequent client reads and distributed locks for idempotent jobs.',
    whyImportantForClient: 'Reduces database CPU load by 80% during peak client traffic spikes.',
    keySkills: ['Cache-Aside Pattern', 'TTL Eviction', 'Distributed Mutex', 'Session Store'],
    clientChecklist: [
      { id: 'c18', label: 'Cache invalidation hooks fire on database writes', checked: true },
      { id: 'c19', label: 'No PII stored unencrypted in in-memory caches', checked: true },
    ],
    codeSnippetTitle: 'Cache-Aside Helper with Automatic TTL',
    codeSnippet: `export async function getCachedClientProfile(clientId: string) {
  const cacheKey = \`client:profile:\${clientId}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  const profile = await db.query.profiles.findFirst({ where: eq(id, clientId) });
  await redis.setex(cacheKey, 600, JSON.stringify(profile)); // 10 min TTL
  return profile;
}`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },

  // 4. DEVOPS & CLOUD DEPLOYMENT
  {
    id: 'devops-cloud-run',
    title: 'Containerized Cloud Run Ingress & Nginx Reverse Proxy',
    category: 'devops',
    level: 'client-production',
    status: 'production-ready',
    description: 'Stateless Docker containers deployed with zero-downtime rolling updates on port 3000.',
    whyImportantForClient: 'Guarantees 99.99% uptime and automatic horizontal scaling with scale-to-zero cost efficiency.',
    keySkills: ['Docker Multi-Stage', 'Cloud Run Secret Manager', 'HTTPS Ingress', 'Health Checks'],
    clientChecklist: [
      { id: 'c20', label: 'All external ingress routed securely through Port 3000', checked: true },
      { id: 'c21', label: 'Container starts in non-root user mode', checked: true },
    ],
    codeSnippetTitle: 'Multi-Stage Dockerfile for Full-Stack Client App',
    codeSnippet: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },

  // 5. CLIENT SECURITY & COMPLIANCE
  {
    id: 'sec-owasp-top10',
    title: 'OWASP Top 10 Mitigation & Secret Isolation',
    category: 'security',
    level: 'client-production',
    status: 'production-ready',
    description: 'Systematic defense against XSS, SQLi, CSRF, SSRF, broken authentication, and sensitive data exposure.',
    whyImportantForClient: 'Crucial for client NDA confidentiality and passing corporate SOC2 / ISO27001 audits.',
    keySkills: ['CSP Headers', 'Sanitization', 'Env Variable Scrubbing', 'Encrypted TLS 1.3'],
    clientChecklist: [
      { id: 'c22', label: 'Strict Content-Security-Policy headers applied', checked: true },
      { id: 'c23', label: 'API keys never exposed in client browser bundles', checked: true },
      { id: 'c24', label: 'Dedicated Google Meet confidentiality sessions recorded in audit logs', checked: true },
    ],
    codeSnippetTitle: 'Secure HTTP Response Headers Middleware',
    codeSnippet: `app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});`,
    roadmapShLink: 'https://roadmap.sh/full-stack',
  },
];

export const INITIAL_AUDIT_ITEMS: SecurityAuditItem[] = [
  {
    id: 'aud-101',
    category: 'OWASP-Top-10',
    title: 'A01:2021 — Broken Access Control & Role Permissions',
    description: 'Verify that client users cannot access administrative or cross-tenant financial records by altering URL parameters or UUIDs.',
    severity: 'critical',
    status: 'pass',
    mitigationNotes: 'Implemented server-side requireRole() middleware and tenant-scoped SQL queries. Tested via automated penetration suite.',
    lastAuditedBy: 'Dr. Evelyn Vance (Lead Architect)',
    lastAuditedDate: '2026-07-28',
  },
  {
    id: 'aud-102',
    category: 'OWASP-Top-10',
    title: 'A03:2021 — Injection (SQLi & NoSQL Injection Protection)',
    description: 'Ensure all user-supplied input is parameterized and never concatenated into SQL strings or dynamic database queries.',
    severity: 'critical',
    status: 'pass',
    mitigationNotes: 'All queries execute through Drizzle ORM prepared statements. Checked across all 32 client API endpoints.',
    lastAuditedBy: 'Dr. Evelyn Vance (Lead Architect)',
    lastAuditedDate: '2026-07-29',
  },
  {
    id: 'aud-103',
    category: 'Client-Confidentiality',
    title: 'NDA-01 — Strict Client Confidentiality in Google Meet Sessions',
    description: 'To uphold the utmost confidentiality of the company, in-depth discussions regarding all client projects must be conducted exclusively through dedicated Google Meet sessions.',
    severity: 'critical',
    status: 'pass',
    mitigationNotes: 'All team members have signed client NDA. Google Meet links are unique per session with encrypted meeting summaries.',
    lastAuditedBy: 'Marcus Sterling (Client Partner)',
    lastAuditedDate: '2026-07-30',
  },
  {
    id: 'aud-104',
    category: 'Client-Confidentiality',
    title: 'NDA-02 — Source Code & API Key Isolation',
    description: 'Ensure client repository is private and third-party API keys (GEMINI_API_KEY, Stripe, DB credentials) are stored server-side only.',
    severity: 'high',
    status: 'pass',
    mitigationNotes: 'Verified .env.example contains zero live keys and production secrets use Cloud Run Secret Manager.',
    lastAuditedBy: 'Dr. Evelyn Vance (Lead Architect)',
    lastAuditedDate: '2026-07-27',
  },
  {
    id: 'aud-105',
    category: 'OWASP-Top-10',
    title: 'A05:2021 — Security Misconfiguration & CORS Policy',
    description: 'Ensure CORS is explicitly restricted to verified client domains and rejects wildcards (*) on authenticated endpoints.',
    severity: 'high',
    status: 'pass',
    mitigationNotes: 'CORS whitelist configured in server.ts with strict origin matching.',
    lastAuditedBy: 'Alex Chen (SecOps Lead)',
    lastAuditedDate: '2026-07-26',
  },
  {
    id: 'aud-106',
    category: 'Data-Privacy-GDPR',
    title: 'PRIV-01 — Data Minimization & PII Encryption at Rest',
    description: 'Ensure sensitive client customer PII is encrypted at rest using AES-256 and only decrypted when needed.',
    severity: 'medium',
    status: 'warning',
    mitigationNotes: 'AES-256 encryption applied to financial SSNs. Scheduling column-level encryption for secondary address tables in Sprint 5.',
    lastAuditedBy: 'Alex Chen (SecOps Lead)',
    lastAuditedDate: '2026-07-29',
  },
];

export const INITIAL_MEET_SESSIONS: MeetSession[] = [
  {
    id: 'meet-01',
    title: 'Client Sprint 4 Full-Stack Architecture & Security Audit Review',
    clientName: 'ApexFin Cloud Corp',
    date: '2026-07-30',
    time: '14:00 (PST)',
    durationMinutes: 60,
    meetLink: 'https://meet.google.com/xry-pwqk-mdv',
    attendees: [
      'maheshpoludasu203@gmail.com (Lead Full-Stack Eng)',
      'sarah.jenning@apexfin-cloud.io (Client Product Director)',
      'david.ko@apexfin-cloud.io (Client VP Engineering)',
      'evelyn.vance@studio.ai (Security Auditor)',
    ],
    agenda: [
      '1. Review full-stack roadmap milestones (React 19 Frontend + Node Express API)',
      '2. In-depth confidential discussion on OAuth2 & JWT refresh rotation',
      '3. Verify OWASP SQLi & XSS test reports for portfolio dashboard',
      '4. Sign off on Cloud Run production deployment for Sprint 4 release',
    ],
    confidentialNotes:
      'CONFIDENTIAL SESSION RECORD (NDA VERIFIED): Client approved the Drizzle ORM PostgreSQL schema for high-frequency order ledgers. Agreed that all webhook callbacks must enforce X-Idempotency-Key validation. Next session will focus on Redis distributed caching.',
    actionItems: [
      {
        id: 'act-1',
        text: 'Implement idempotency middleware on POST /api/v1/orders',
        assignee: 'maheshpoludasu203@gmail.com',
        completed: true,
        layer: 'backend',
      },
      {
        id: 'act-2',
        text: 'Add optimistic UI rollback toast notification on order failure',
        assignee: 'maheshpoludasu203@gmail.com',
        completed: true,
        layer: 'frontend',
      },
      {
        id: 'act-3',
        text: 'Deliver final OWASP Top 10 automated scan PDF to Client VP',
        assignee: 'evelyn.vance@studio.ai',
        completed: false,
        layer: 'security',
      },
    ],
    isConfidentialNDA: true,
    recordingConsentVerified: true,
  },
  {
    id: 'meet-02',
    title: 'Confidential Client NDA Kickoff — Wealth Ledger API Engine',
    clientName: 'ApexFin Cloud Corp',
    date: '2026-08-02',
    time: '10:00 (PST)',
    durationMinutes: 45,
    meetLink: 'https://meet.google.com/qzw-nvja-bck',
    attendees: [
      'maheshpoludasu203@gmail.com (Lead Full-Stack Eng)',
      'sarah.jenning@apexfin-cloud.io (Client Product Director)',
      'marcus.sterling@studio.ai (Client Partner)',
    ],
    agenda: [
      '1. Re-verify NDA compliance & repository access controls',
      '2. Discuss high-frequency portfolio chart requirements (Recharts + WebSockets)',
      '3. Align on Roadmap.sh/full-stack milestone deliveries for Q3',
    ],
    confidentialNotes:
      'CONFIDENTIAL: Client requested sub-50ms chart re-rendering. Team demonstrated React 19 memoization & Tailwind CSS zero-runtime styling.',
    actionItems: [
      {
        id: 'act-4',
        text: 'Benchmark Recharts SVG rendering under 10,000 data points',
        assignee: 'maheshpoludasu203@gmail.com',
        completed: true,
        layer: 'frontend',
      },
    ],
    isConfidentialNDA: true,
    recordingConsentVerified: true,
  },
  {
    id: 'meet-03',
    title: 'HIPAA & Zero-Trust Auth Architecture Session',
    clientName: 'VeriMed Health Systems',
    date: '2026-08-05',
    time: '11:30 (PST)',
    durationMinutes: 60,
    meetLink: 'https://meet.google.com/hmu-ztpx-wrc',
    attendees: [
      'maheshpoludasu203@gmail.com (Lead Full-Stack Eng)',
      'dr.robert.vance@verimed.health (Chief Medical Officer)',
      'alex.chen@studio.ai (SecOps)',
    ],
    agenda: [
      '1. Review AES-256 patient database encryption at rest',
      '2. Demonstrate two-factor authentication (2FA) JWT token flow',
      '3. Sign off on audit log retention policy',
    ],
    confidentialNotes:
      'CONFIDENTIAL MEDICAL SYSTEMS NDA: Client verified zero diagnostic data leaves the secure Cloud Run VPC. All logs are scrubbed of patient names.',
    actionItems: [
      {
        id: 'act-5',
        text: 'Configure audit log retention ttl to 365 days in PostgreSQL schema',
        assignee: 'alex.chen@studio.ai',
        completed: false,
        layer: 'database',
      },
    ],
    isConfidentialNDA: true,
    recordingConsentVerified: true,
  },
];

export const INITIAL_FEATURES: FullStackFeature[] = [
  {
    id: 'feat-101',
    title: 'Real-Time Portfolio Valuation WebSockets & UI Canvas',
    description: 'Full-stack feature for live streaming portfolio valuations with sub-second chart updates and zero-flicker React state synchronization.',
    layer: 'fullstack',
    status: 'production',
    priority: 'high',
    frontendSpec: {
      components: ['PortfolioChart.tsx', 'LiveTickerHeader.tsx', 'AssetAllocationTable.tsx'],
      stateManagement: 'Custom useWebSocketToken hook with optimistic local cache & reconnection jitter',
      accessibilityNotes: 'ARIA live region updates for visually impaired traders; high contrast chart colors',
      sampleCodeSnippet: `// Front-end subscription component
export function PortfolioTicker({ clientId }: { clientId: string }) {
  const { data, isConnected } = usePortfolioSocket(clientId);
  return (
    <div className="flex items-center gap-2 font-mono text-emerald-700 dark:text-emerald-400">
      <span className={cn("w-2 h-2 rounded-full", isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
      <span>\${data?.totalValue.toLocaleString()}</span>
    </div>
  );
}`,
    },
    backendSpec: {
      apiEndpoints: [
        'GET /api/v1/portfolio/:id/stream (WebSocket Upgrade)',
        'GET /api/v1/portfolio/:id/history',
      ],
      authRequirement: 'Requires valid JWT bearer token with "client:viewer" or "client:trader" role',
      validationSchema: 'Zod schema enforcing valid UUID v4 for portfolio ID and sanitized ticker symbols',
      sampleCodeSnippet: `// Back-end WebSocket upgrade handler
wss.on('connection', async (ws, req) => {
  const token = new URL(req.url!, 'http://localhost').searchParams.get('token');
  const user = await verifyJwtToken(token);
  if (!user) return ws.close(4001, 'Unauthorized');
  
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ type: 'TICKER_UPDATE', totalValue: 1425890.45 }));
  }, 1000);
  ws.on('close', () => clearInterval(interval));
});`,
    },
    databaseSpec: {
      tablesOrCollections: ['portfolios', 'asset_positions', 'market_price_ticks'],
      indexes: ['idx_portfolio_client_id', 'idx_asset_symbol_time'],
      sampleSchema: `CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL,
  total_value_cents BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
    },
    securityChecklist: [
      { id: 'sc-1', label: 'WebSocket handshake authenticated via token parameter', completed: true },
      { id: 'sc-2', label: 'Rate limited to max 5 connections per client ID', completed: true },
      { id: 'sc-3', label: 'No PII or raw account numbers broadcast over WS', completed: true },
    ],
    assignedTo: 'Mahesh P. (Lead Full-Stack Eng)',
    dueDate: '2026-07-31',
  },
  {
    id: 'feat-102',
    title: 'Idempotent Payment & Settlement Webhook Processing',
    description: 'Backend-heavy transaction processor that safely handles duplicate Stripe/wire payment notifications without double-crediting accounts.',
    layer: 'backend',
    status: 'in-development',
    priority: 'high',
    frontendSpec: {
      components: ['TransactionHistoryTable.tsx', 'WebhookStatusModal.tsx'],
      stateManagement: 'SWR data fetching with manual refetch button and toast notifications',
      accessibilityNotes: 'Clear keyboard focus indicators on transaction filter pills',
    },
    backendSpec: {
      apiEndpoints: ['POST /api/v1/webhooks/settlement', 'POST /api/v1/transactions/retry'],
      authRequirement: 'HMAC SHA-256 signature verification header (Stripe-Signature)',
      validationSchema: 'Strict validation of payment amount, currency ISO code, and unique event_id',
      sampleCodeSnippet: `app.post('/api/v1/webhooks/settlement', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  
  // Idempotency check
  if (await isEventProcessed(event.id)) {
    return res.status(200).json({ received: true, duplicate: true });
  }
  await recordPaymentTransaction(event.data.object);
  res.status(200).json({ received: true });
});`,
    },
    databaseSpec: {
      tablesOrCollections: ['payment_webhook_events', 'client_ledgers'],
      indexes: ['UNIQUE INDEX idx_webhook_event_id ON payment_webhook_events(event_id)'],
      sampleSchema: `CREATE TABLE payment_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id VARCHAR(128) UNIQUE NOT NULL,
  payload JSONB NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW()
);`,
    },
    securityChecklist: [
      { id: 'sc-4', label: 'Verify HMAC signature before parsing JSON payload', completed: true },
      { id: 'sc-5', label: 'Enforce database UNIQUE constraint on event_id', completed: true },
      { id: 'sc-6', label: 'Log webhook failures without leaking stack traces', completed: false },
    ],
    assignedTo: 'Mahesh P. (Lead Full-Stack Eng)',
    dueDate: '2026-08-04',
  },
  {
    id: 'feat-103',
    title: 'Zero-Trust Role-Based Access Control (RBAC) Dashboard',
    description: 'Frontend administrative interface and backend policy enforcement allowing client admins to manage team permissions safely.',
    layer: 'fullstack',
    status: 'code-review',
    priority: 'medium',
    frontendSpec: {
      components: ['RolePermissionMatrix.tsx', 'InviteTeamMemberDialog.tsx', 'AuditLogStream.tsx'],
      stateManagement: 'React 19 Form Action hooks with optimistic toggle states',
      accessibilityNotes: 'Screen-reader friendly checkbox group with role descriptions',
    },
    backendSpec: {
      apiEndpoints: ['GET /api/v1/roles', 'PUT /api/v1/users/:id/role', 'POST /api/v1/invitations'],
      authRequirement: 'Requires "admin" or "owner" role in JWT claim',
      validationSchema: 'Restricts assigned roles to pre-approved client hierarchy levels',
    },
    databaseSpec: {
      tablesOrCollections: ['user_roles', 'role_permissions', 'admin_audit_trail'],
      indexes: ['idx_user_roles_user_id'],
    },
    securityChecklist: [
      { id: 'sc-7', label: 'Prevent self-demotion or self-elevation of permissions', completed: true },
      { id: 'sc-8', label: 'Log all role changes to immutable admin_audit_trail', completed: true },
    ],
    assignedTo: 'Alex Chen (SecOps & Backend)',
    dueDate: '2026-08-01',
  },
];

export const INITIAL_PROJECTS: ClientProject[] = [
  {
    id: 'proj-apexfin',
    name: 'ApexFin Cloud — Enterprise Private Wealth Application',
    clientName: 'ApexFin Cloud Corp',
    industry: 'Financial Technology & Wealth Management',
    description:
      'High-performance full-stack web application providing real-time portfolio tracking, multi-asset allocation modeling, and encrypted wealth ledger management under strict NDA.',
    status: 'in-progress',
    ndaSignedDate: '2026-06-15',
    confidentialityLevel: 'Strict NDA',
    techStack: {
      frontend: ['React 19', 'TypeScript 5.8', 'Tailwind CSS v4', 'Vite', 'Lucide Icons', 'Recharts'],
      backend: ['Node.js 20 ESM', 'Express 4.21', 'JWT RS256 Auth', 'WebSockets', 'Stripe SDK'],
      database: ['PostgreSQL 16', 'Drizzle ORM', 'Redis Cache', 'ACID Financial Ledgers'],
      devops: ['Cloud Run Port 3000', 'Docker Multi-Stage', 'Nginx Reverse Proxy', 'Secret Manager'],
    },
    repositoryUrl: 'https://github.com/apexfin-private-repo/wealth-portal-web',
    googleMeetLink: 'https://meet.google.com/xry-pwqk-mdv',
    leadEngineer: 'maheshpoludasu203@gmail.com',
    startDate: '2026-06-20',
    targetLaunchDate: '2026-09-15',
    features: INITIAL_FEATURES,
    meetSessions: INITIAL_MEET_SESSIONS.filter((s) => s.clientName === 'ApexFin Cloud Corp'),
    roadmapNodes: INITIAL_ROADMAP_NODES,
    securityAudits: INITIAL_AUDIT_ITEMS,
  },
  {
    id: 'proj-verimed',
    name: 'VeriMed Health — HIPAA Patient Diagnostic Platform',
    clientName: 'VeriMed Health Systems',
    industry: 'Healthcare & Clinical Analytics',
    description:
      'Secure diagnostic review platform connecting clinical specialists with encrypted patient lab reports and AI-assisted triage models.',
    status: 'security-review',
    ndaSignedDate: '2026-07-01',
    confidentialityLevel: 'Strict NDA',
    techStack: {
      frontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Accessible Medical Canvas'],
      backend: ['Node.js', 'Express API', 'Zero-Trust RBAC', 'AES-256 Crypto Provider'],
      database: ['PostgreSQL (HIPAA Encrypted)', 'Audit Ledger Table'],
      devops: ['Cloud Run VPC-SC', 'Strict TLS 1.3 Ingress'],
    },
    repositoryUrl: 'https://github.com/verimed-confidential/diagnostic-portal',
    googleMeetLink: 'https://meet.google.com/hmu-ztpx-wrc',
    leadEngineer: 'maheshpoludasu203@gmail.com',
    startDate: '2026-07-05',
    targetLaunchDate: '2026-10-01',
    features: [
      {
        id: 'feat-med-1',
        title: 'AES-256 Encrypted Lab Result PDF Renderer',
        description: 'Frontend secure PDF reader with watermarking and backend temporary signed URL generator.',
        layer: 'fullstack',
        status: 'production',
        priority: 'high',
        frontendSpec: {
          components: ['SecurePdfViewer.tsx', 'WatermarkOverlay.tsx'],
          stateManagement: 'Ephemeral memory buffer; zero caching to disk',
          accessibilityNotes: 'High contrast medical typography and zoom controls',
        },
        backendSpec: {
          apiEndpoints: ['GET /api/v1/patients/:id/labs/token'],
          authRequirement: 'Requires verified Doctor role + active HIPAA session',
          validationSchema: 'UUID v4 patient id parameter validation',
        },
        databaseSpec: {
          tablesOrCollections: ['encrypted_lab_reports', 'access_audit_logs'],
          indexes: ['idx_patient_id_created'],
        },
        securityChecklist: [
          { id: 'med-1', label: 'PDF bytes decrypted in RAM only, never written to disk', completed: true },
          { id: 'med-2', label: 'Watermark includes viewing doctor email & timestamp', completed: true },
        ],
        assignedTo: 'Mahesh P. (Lead Full-Stack Eng)',
        dueDate: '2026-08-10',
      },
    ],
    meetSessions: INITIAL_MEET_SESSIONS.filter((s) => s.clientName === 'VeriMed Health Systems'),
    roadmapNodes: INITIAL_ROADMAP_NODES,
    securityAudits: INITIAL_AUDIT_ITEMS,
  },
];
