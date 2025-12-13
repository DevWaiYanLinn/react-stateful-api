import { useMemo } from 'react';
import { useMatches } from 'react-router';

interface RootLoaderData {
    user: Record<string, any>;
}

export function useUser() {
    const matches = useMatches();
    const user = useMemo(() => {
        const rootMatch = matches.find(
            (m): m is typeof m & { loaderData: RootLoaderData } => m.pathname === '/' && m.loaderData !== undefined
        );

        return rootMatch?.loaderData.user ?? null;
    }, [matches]);

    return { user };
}
