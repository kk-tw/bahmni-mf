import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../i18n';

interface IAppProps {
    renderComponent: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
}

const App: React.FC<IAppProps> = ({
    renderComponent,
    options: { patient, visit },
}) => {
    const queryClient = new QueryClient();

    const ComponentLazy = lazy(() => import(`./${renderComponent}`));

    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<p>Loading!</p>}>
                <ComponentLazy patient={patient} visit={visit} />
            </Suspense>
        </QueryClientProvider>
    );
};

export default App;
