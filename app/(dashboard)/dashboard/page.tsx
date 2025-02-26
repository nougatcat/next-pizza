import React from 'react';

interface Props {
    className?: string;
}

export default function DashboardPage({ className }: Props) {
    return <div className={className}>DashboardPage</div>;
}