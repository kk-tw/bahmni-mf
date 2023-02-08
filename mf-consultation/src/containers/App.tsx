import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../i18n';
import Diagnosis from './Diagnosis';

const App = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Diagnosis />
        </QueryClientProvider>
    );
};

export default App;
