import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../i18n';

const App = () => {
    const queryClient = new QueryClient();

    const DiagnosisLazy = lazy(() => import('./Diagnosis'));

    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<p>Loading!</p>}>
                <DiagnosisLazy />
            </Suspense>
        </QueryClientProvider>
    );
};

export default App;
