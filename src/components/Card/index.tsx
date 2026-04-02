import { useState, CSSProperties, ReactNode } from 'react';

const tokens = {
  gold: '#D4A73C',
  goldDim: 'rgba(212,167,60,0.6)',
  goldGlow: 'rgba(212,167,60,0.15)',
  goldBorder: 'rgba(212,167,60,0.25)',
  surface: 'rgba(255,255,255,0.04)',
  surfaceHover: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(212,167,60,0.35)',
  text: '#F0EDE6',
  textMuted: 'rgba(240,237,230,0.45)',
  textDim: 'rgba(240,237,230,0.2)',
  success: '#5DCA95',
  danger: '#E05555',
  info: '#80AAE8',
  fontDisplay: "'Syne', sans-serif",
  fontMono: "'Space Mono', monospace",
} as const;

type BadgeVariant = 'gold' | 'success' | 'danger' | 'info' | 'default';
type CardStatus = 'active' | 'warning' | 'critical' | 'idle';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

interface CardProps {
  children: ReactNode;
  accent?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

interface BadgeConfig {
  label: string;
  variant: BadgeVariant;
}

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  badge?: BadgeConfig;
  accent?: boolean;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
}

interface ProfileDetail {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ProfileCardProps {
  initials: string;
  name: string;
  role: string;
  details?: ProfileDetail[];
}

interface StatusCardProps {
  title: string;
  subtitle?: string;
  status: CardStatus;
  time?: string;
  progress?: number;
}

const badgeStyles: Record<BadgeVariant, CSSProperties> = {
  gold: {
    background: 'rgba(212,167,60,0.12)',
    color: tokens.gold,
    border: `0.5px solid ${tokens.goldBorder}`,
  },
  success: {
    background: 'rgba(93,202,149,0.1)',
    color: tokens.success,
    border: '0.5px solid rgba(93,202,149,0.25)',
  },
  danger: {
    background: 'rgba(224,85,85,0.1)',
    color: tokens.danger,
    border: '0.5px solid rgba(224,85,85,0.25)',
  },
  info: {
    background: 'rgba(128,170,232,0.1)',
    color: tokens.info,
    border: '0.5px solid rgba(128,170,232,0.25)',
  },
  default: {
    background: 'rgba(255,255,255,0.06)',
    color: tokens.text,
    border: `0.5px solid ${tokens.border}`,
  },
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      style={{
        ...badgeStyles[variant],
        fontFamily: tokens.fontMono,
        fontSize: 10,
        padding: '3px 10px',
        borderRadius: 999,
        letterSpacing: '0.06em',
        fontWeight: 700,
        textTransform: 'uppercase',
        display: 'inline-block',
      }}>
      {children}
    </span>
  );
}

export function Card({ children, accent = false, style = {}, onClick }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `0.5px solid ${hovered ? tokens.borderHover : tokens.border}`,
        borderLeft: accent ? `2px solid ${tokens.gold}` : undefined,
        borderRadius: 14,
        padding: '1.2rem',
        transition: 'border-color 0.2s, background 0.2s',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(6px)',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: tokens.fontDisplay,
        ...style,
      }}>
      {children}
    </div>
  );
}

export function FeatureCard({ icon, title, description, badge, accent = false }: FeatureCardProps) {
  return (
    <Card accent={accent}>
      {icon && (
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: tokens.goldGlow,
            border: '0.5px solid rgba(212,167,60,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            marginBottom: 14,
          }}>
          {icon}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 6,
        }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: tokens.text }}>{title}</span>
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
      </div>
      <p style={{ fontSize: 12, color: tokens.textMuted, lineHeight: 1.6, margin: 0 }}>
        {description}
      </p>
    </Card>
  );
}

export function MetricCard({ label, value, delta, deltaPositive = true }: MetricCardProps) {
  return (
    <div
      style={{
        border: `0.5px solid ${tokens.border}`,
        borderRadius: 14,
        padding: '1rem 1.2rem',
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(6px)',
        fontFamily: tokens.fontDisplay,
      }}>
      <div
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 10,
          color: tokens.textMuted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: tokens.gold, lineHeight: 1 }}>
        {value}
      </div>
      {delta && (
        <div
          style={{
            fontSize: 11,
            color: deltaPositive ? tokens.success : tokens.danger,
            marginTop: 6,
            fontFamily: tokens.fontMono,
          }}>
          {deltaPositive ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  );
}

export function ProfileCard({ initials, name, role, details = [] }: ProfileCardProps) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(212,167,60,0.1)',
            border: `1px solid ${tokens.goldBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: tokens.fontMono,
            fontSize: 12,
            fontWeight: 700,
            color: tokens.gold,
            flexShrink: 0,
          }}>
          {initials}
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: tokens.text, margin: 0 }}>{name}</p>
          <p style={{ fontSize: 12, color: tokens.textMuted, margin: 0 }}>{role}</p>
        </div>
      </div>
      <div style={{ borderTop: `0.5px solid ${tokens.border}`, paddingTop: 12 }}>
        {details.map((d, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              padding: '4px 0',
              borderBottom: i < details.length - 1 ? `0.5px solid ${tokens.border}` : 'none',
            }}>
            <span style={{ color: tokens.textMuted }}>{d.label}</span>
            <span style={{ color: d.highlight ? tokens.gold : tokens.text }}>{d.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const statusConfig: Record<CardStatus, { color: string; label: string }> = {
  active: { color: tokens.success, label: 'Active' },
  warning: { color: tokens.gold, label: 'Warning' },
  critical: { color: tokens.danger, label: 'Critical' },
  idle: { color: tokens.textMuted, label: 'Idle' },
};

export function StatusCard({ title, subtitle, status, time, progress }: StatusCardProps) {
  const statusCfg = statusConfig[status];
  const badgeVariant: BadgeVariant =
    status === 'active' ? 'success' : status === 'critical' ? 'danger' : 'gold';

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 10,
        }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: tokens.text, margin: '0 0 2px' }}>
            {title}
          </p>
          {subtitle && (
            <p style={{ fontSize: 11, color: tokens.textMuted, margin: 0 }}>{subtitle}</p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <Badge variant={badgeVariant}>{statusCfg.label}</Badge>
          {time && (
            <span
              style={{
                fontFamily: tokens.fontMono,
                fontSize: 9,
                color: tokens.textDim,
                letterSpacing: '0.08em',
              }}>
              {time}
            </span>
          )}
        </div>
      </div>
      {progress !== undefined && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 10, color: tokens.textMuted, fontFamily: tokens.fontMono }}>
              progress
            </span>
            <span style={{ fontSize: 10, color: statusCfg.color, fontFamily: tokens.fontMono }}>
              {progress}%
            </span>
          </div>
          <div
            style={{
              height: 3,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 999,
              overflow: 'hidden',
            }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: statusCfg.color,
                borderRadius: 999,
                opacity: 0.8,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}

interface Section {
  label: string;
  content: ReactNode;
}

export default function BlackHoleCards() {
  const sections: Section[] = [
    {
      label: 'feature cards',
      content: (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}>
          <FeatureCard
            icon="⬡"
            title="Gravitational Lensing"
            description="Light bends around the massive object, distorting spacetime fabric."
            accent
          />
          <FeatureCard
            icon="◎"
            title="Hawking Radiation"
            description="Quantum effects near the event horizon emit thermal radiation slowly."
            badge={{ label: 'New', variant: 'gold' }}
          />
          <FeatureCard
            icon="✦"
            title="Singularity Point"
            description="Infinite density where the laws of physics break down completely."
            badge={{ label: 'Stable', variant: 'success' }}
          />
        </div>
      ),
    },
    {
      label: 'metric cards',
      content: (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
          }}>
          <MetricCard label="Mass" value="4.3M" delta="0.2% M☉" deltaPositive />
          <MetricCard label="Radius" value="12.7" delta="Schwarzschild km" deltaPositive />
          <MetricCard label="Entropy" value="∞" delta="Increasing" deltaPositive={false} />
          <MetricCard label="Objects" value="847" delta="3 new today" deltaPositive />
        </div>
      ),
    },
    {
      label: 'profile card',
      content: (
        <div style={{ maxWidth: 320 }}>
          <ProfileCard
            initials="SG"
            name="Sagittarius A*"
            role="Supermassive Black Hole"
            details={[
              { label: 'Distance', value: '26,000 ly', highlight: true },
              { label: 'Mass', value: '4.3M M☉' },
              { label: 'Classification', value: 'Sgr A*', highlight: true },
              { label: 'Status', value: 'Active' },
            ]}
          />
        </div>
      ),
    },
    {
      label: 'status cards',
      content: (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
          }}>
          <StatusCard
            title="Orbital Monitor"
            subtitle="Sector 7 · Ring C"
            status="active"
            time="2m ago"
            progress={87}
          />
          <StatusCard
            title="Radiation Scan"
            subtitle="EH Proximity Alert"
            status="warning"
            time="14m ago"
            progress={54}
          />
          <StatusCard
            title="Core Analysis"
            subtitle="Singularity depth"
            status="critical"
            time="1h ago"
            progress={29}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        fontFamily: tokens.fontDisplay,
        color: tokens.text,
        padding: '2rem',
        maxWidth: 900,
        margin: '0 auto',
      }}>
      {sections.map(({ label, content }) => (
        <div key={label} style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span
              style={{
                fontFamily: tokens.fontMono,
                fontSize: 10,
                color: tokens.gold,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}>
              {label}
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: 'linear-gradient(90deg, rgba(212,167,60,0.3), transparent)',
              }}
            />
          </div>
          {content}
        </div>
      ))}
    </div>
  );
}
