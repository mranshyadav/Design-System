import React, { useState } from 'react'
import { Badge, Button } from '../components/index.js'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'For individuals and small teams getting started.',
    monthly: 29,
    annual: 19,
    badge: null,
    cta: 'Get started',
    variant: 'secondary',
    features: [
      { label: 'Up to 5 team members', included: true },
      { label: '10 GB storage', included: true },
      { label: 'API access', included: true },
      { label: 'Basic analytics', included: true },
      { label: 'Priority support', included: false },
      { label: 'Custom integrations', included: false },
      { label: 'SSO / SAML', included: false },
      { label: 'SLA guarantee', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'For growing teams that need more power and flexibility.',
    monthly: 79,
    annual: 59,
    badge: 'Most popular',
    cta: 'Start free trial',
    variant: 'primary',
    features: [
      { label: 'Up to 25 team members', included: true },
      { label: '100 GB storage', included: true },
      { label: 'API access', included: true },
      { label: 'Advanced analytics', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom integrations', included: true },
      { label: 'SSO / SAML', included: false },
      { label: 'SLA guarantee', included: false },
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'For organizations that need security and scale.',
    monthly: null,
    annual: null,
    badge: null,
    cta: 'Contact sales',
    variant: 'secondary',
    features: [
      { label: 'Unlimited team members', included: true },
      { label: 'Unlimited storage', included: true },
      { label: 'API access', included: true },
      { label: 'Custom analytics', included: true },
      { label: 'Dedicated support', included: true },
      { label: 'Custom integrations', included: true },
      { label: 'SSO / SAML', included: true },
      { label: 'SLA guarantee', included: true },
    ]
  },
]

const CheckIcon = ({ color = '#1F6B47' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export function PricingTable() {
  const [annual, setAnnual] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-28)', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          Simple, transparent pricing
        </h2>
        <p style={{ margin: 0, fontSize: 'var(--fs-15)', color: 'var(--fg-3)' }}>
          Start free, scale as you grow. No hidden fees.
        </p>
      </div>

      {/* Billing toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-3)', borderRadius: 'var(--radius-6)', padding: 4 }}>
        <button onClick={() => setAnnual(false)} style={{
          border: 0, borderRadius: 'var(--radius-4)', padding: '6px 16px',
          fontSize: 'var(--fs-13)', fontWeight: 500, cursor: 'pointer',
          background: !annual ? 'var(--surface)' : 'transparent',
          color: !annual ? 'var(--fg-1)' : 'var(--fg-3)',
          boxShadow: !annual ? 'var(--shadow-1)' : 'none',
          transition: 'all 120ms var(--ease-standard)',
        }}>Monthly</button>
        <button onClick={() => setAnnual(true)} style={{
          border: 0, borderRadius: 'var(--radius-4)', padding: '6px 16px',
          fontSize: 'var(--fs-13)', fontWeight: 500, cursor: 'pointer',
          background: annual ? 'var(--surface)' : 'transparent',
          color: annual ? 'var(--fg-1)' : 'var(--fg-3)',
          boxShadow: annual ? 'var(--shadow-1)' : 'none',
          transition: 'all 120ms var(--ease-standard)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Annual
          <span style={{ fontSize: 'var(--fs-11)', background: '#1F6B47', color: '#fff', borderRadius: 'var(--radius-4)', padding: '1px 6px', fontWeight: 600 }}>Save 25%</span>
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, width: '100%' }}>
        {PLANS.map(plan => (
          <div key={plan.id} style={{
            background: plan.id === 'pro' ? 'var(--ink)' : 'var(--surface)',
            color: plan.id === 'pro' ? '#fff' : 'var(--fg-1)',
            border: `1px solid ${plan.id === 'pro' ? 'var(--ink)' : 'var(--border-1)'}`,
            borderRadius: 'var(--radius-8)',
            padding: 24,
            display: 'flex', flexDirection: 'column', gap: 20,
            boxShadow: plan.id === 'pro' ? 'var(--shadow-3)' : 'var(--shadow-1)',
            position: 'relative',
          }}>
            {plan.badge && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}>
                <Badge variant="accent" size="sm">{plan.badge}</Badge>
              </div>
            )}

            {/* Plan info */}
            <div>
              <div style={{ fontSize: 'var(--fs-14)', fontWeight: 600, marginBottom: 4, opacity: plan.id === 'pro' ? 0.9 : 1 }}>{plan.name}</div>
              <div style={{ fontSize: 'var(--fs-12)', opacity: 0.6, lineHeight: 1.5 }}>{plan.desc}</div>
            </div>

            {/* Price */}
            <div>
              {plan.monthly ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-40)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
                      ${annual ? plan.annual : plan.monthly}
                    </span>
                    <span style={{ fontSize: 'var(--fs-13)', opacity: 0.5, paddingBottom: 4 }}>/mo</span>
                  </div>
                  {annual && (
                    <div style={{ fontSize: 'var(--fs-12)', opacity: 0.5, marginTop: 4 }}>
                      Billed ${plan.annual * 12}/year
                    </div>
                  )}
                </>
              ) : (
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-28)', fontWeight: 700, letterSpacing: '-0.02em' }}>Custom</div>
              )}
            </div>

            {/* CTA */}
            <Button
              variant={plan.id === 'pro' ? 'secondary' : plan.variant}
              style={plan.id === 'pro' ? { background: '#fff', color: 'var(--ink)', border: 'none' } : {}}
            >
              {plan.cta}
            </Button>

            {/* Divider */}
            <div style={{ borderTop: `1px solid ${plan.id === 'pro' ? 'rgba(255,255,255,0.15)' : 'var(--border-1)'}` }} />

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {f.included
                    ? <CheckIcon color={plan.id === 'pro' ? '#6EE7B7' : '#1F6B47'} />
                    : <MinusIcon />
                  }
                  <span style={{ fontSize: 'var(--fs-13)', opacity: f.included ? (plan.id === 'pro' ? 0.9 : 1) : 0.4 }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p style={{ margin: 0, fontSize: 'var(--fs-13)', color: 'var(--fg-3)', textAlign: 'center' }}>
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  )
}
