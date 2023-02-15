import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../i18n';

interface IAppProps {
    renderComponent: string;
}

const App: React.FC<IAppProps> = ({ renderComponent }) => {
    const queryClient = new QueryClient();

    const ComponentLazy = lazy(() => import(`./${renderComponent}`));

    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<p>Loading!</p>}>
                <ComponentLazy />
            </Suspense>
        </QueryClientProvider>
    );
};

export default App;
