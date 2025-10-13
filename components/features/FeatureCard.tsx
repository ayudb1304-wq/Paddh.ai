import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  tag?: string
}

export function FeatureCard({ icon, title, description, tag }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl shadow-sm bg-surface hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="text-accent-pink">
          {icon}
        </div>
        {tag && (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent-soft text-accent-muted">
            {tag}
          </span>
        )}
      </div>
      <h4 className="text-xl font-semibold mb-2 text-foreground">{title}</h4>
      <p className="text-sm text-foreground-muted">{description}</p>
    </div>
  )
}
