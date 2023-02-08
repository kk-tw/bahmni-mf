import FederatedTypesPlugin from '@module-federation/typescript';
import { ModuleFederationPluginOptions } from '@module-federation/typescript/src/types';
import ENV_VALUES, { isProduction } from './env';
import { dependencies } from '../../package.json';

const federationConfig: ModuleFederationPluginOptions = {
    name: 'bahmni_mf_consultation',
    filename: 'remoteEntry.js',
    remotes: {
        '@bahmni-mf/components': `bahmni_mf_component_library@${ENV_VALUES.COMPONENTS_URL}/remoteEntry.js`,
    },
    exposes: {
        './ConsultationApp': './src/bootstrap',
    },
    shared: {
        ...dependencies,
        react: {
            singleton: true,
            requiredVersion: dependencies.react,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
        },
    },
};

const disableDownloadRemoteTypes =
    !!ENV_VALUES.DISABLE_FEDERATION_TYPES_DOWNLOAD &&
    ENV_VALUES.DISABLE_FEDERATION_TYPES_DOWNLOAD === 'true';

const federationPlugin = new FederatedTypesPlugin({
    federationConfig,
    disableDownloadingRemoteTypes: isProduction || disableDownloadRemoteTypes,
});

export default federationPlugin;
