import React from 'react';

export const Icon: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {children}
    </svg>
);

export const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-11.494v11.494c0 1.105.896 2 2 2h14c1.104 0 2-.895 2-2V6.253c0-1.104-.896-2-2-2H5c-1.104 0-2 .896-2 2z" /></Icon>
);

export const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 11a2 2 0 012.828 0l1.414 1.414a2 2 0 002.828 0l1.414-1.414a2 2 0 012.828 0M12 21v-4m0 0H9.5a2 2 0 01-2-2V11a2 2 0 012-2h5a2 2 0 012 2v4a2 2 0 01-2 2H12z" /></Icon>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></Icon>
);

export const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></Icon>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);

export const LightBulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></Icon>
);

export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0119.5 19.5" /></Icon>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></Icon>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`h-8 w-8 text-primary ${className}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5a1.5 1.5 0 01-3 0V7a1 1 0 011-1h2a1 1 0 011 1v9.5a1.5 1.5 0 01-1.5 1.5zM19 12a1 1 0 01-1 1h-2.5a1.5 1.5 0 01-1.5-1.5V7a1 1 0 011-1h2a1 1 0 011 1v5z"/>
    </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></Icon>
);