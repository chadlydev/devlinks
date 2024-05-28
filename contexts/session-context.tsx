'use client';

import React, { createContext, useContext } from 'react';

import { validateRequest } from '@/lib/server-utils';

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

const SessionContext = createContext<ContextType>({
	session: null,
	user: null
});

export const SessionContextProvider = ({
	children,
	value
}: React.PropsWithChildren<{ value: ContextType }>) => {
	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export function useSessionContext() {
	const context = useContext(SessionContext);

	if (!context) {
		throw new Error('useSessionContext must be used within a SessionContextProvider');
	}

	return context;
}
