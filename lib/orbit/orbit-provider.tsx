'use client';

import * as React from 'react';
import Provider from '@kiwicom/orbit-components/lib/OrbitProvider';
import { defaultTheme } from '@kiwicom/orbit-components/lib';

export default function OrbitProvider({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}): React.JSX.Element {
    return (
        <Provider theme={defaultTheme} useId={React.useId}>
            {children}
        </Provider>
    );
}