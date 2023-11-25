import axios from 'axios';
const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';

function Beaver(componentName, userConfig = {}) {
  const defaultConfig = {
    environments: {
      development: ['localhost', '127.0.0.1'],
      production: [],
    },
    logLevels: {
      important: { color: '#AA00AA', background: '#000000', production: true },
      log: { color: '#0077FF', background: '#000000', production: false },
      info: { color: '#00AA00', background: '#000000', production: false },
      warn: { color: '#FFA500', background: '#000000', production: true },
      error: { color: '#FF0000', background: '#000000', production: true },
    },
    asyncLogging: false,
    includeLineInfo: true,
    useWebhook: false,
    webhookUrl: null,
    logFilter: null,
    forceLog: false,
  };

  const finalConfig = { ...defaultConfig, ...userConfig };
  const isBrowser = typeof window !== 'undefined';
  const currentHostname = isBrowser ? window.location.hostname : null;
  let environment = finalConfig.environments[ENV_DEVELOPMENT].includes(currentHostname) ? ENV_DEVELOPMENT : ENV_PRODUCTION;


  const sendLogViaWebhook = (level, message) => {
    if (finalConfig.useWebhook && finalConfig.webhookUrl) {
      axios.post(finalConfig.webhookUrl, { level, message }, { headers: { 'Content-Type': 'application/json' } })
        .catch(error => {
          console.error('Error sending log via webhook:', error);
        });
    }
  };

  const timestamp = () => {
    const now = new Date();
    return `${now.toLocaleDateString()}, ${now.toLocaleTimeString()}`;
  };

  const formatMetadata = (metadata) => {
    return Object.keys(metadata).length > 0 ? ` | Metadata: ${JSON.stringify(metadata)}` : '';
  };

  const getLineInfo = () => {
    return new Error().stack.split('\n')[3].trim();
  };

  const safeLog = (level) => {
    return (...args) => {
      if (!finalConfig.logFilter || finalConfig.logFilter === level) {
        if (environment !== ENV_PRODUCTION || finalConfig.logLevels[level].production || finalConfig.forceLog) {
          const [content, metadata = {}] = args;
          const formattedMetadata = formatMetadata(metadata);
          const lineInfo = finalConfig.includeLineInfo ? ` | ${getLineInfo()}` : '';
          const logMessage = `%c[${level.toUpperCase()} | ${timestamp()}${lineInfo}] ${componentName} | ${content}${formattedMetadata}`;

          if (finalConfig.asyncLogging) {
            setTimeout(() => console[level](logMessage, `color: ${finalConfig.logLevels[level].color}; background: ${finalConfig.logLevels[level].background};`), 0);
          } else {
            console[level](logMessage, `color: ${finalConfig.logLevels[level].color}; background: ${finalConfig.logLevels[level].background};`);
          }
          sendLogViaWebhook(level, logMessage);
        }
      }
    };
  };

  const logger = {};
  Object.keys(finalConfig.logLevels).forEach(level => {
    logger[level] = safeLog(level);
  });

  logger.group = (...args) => {
    if (environment !== ENV_PRODUCTION) {
      const [title] = args;
      console.groupCollapsed(`[${componentName}] ${title}`);
    }
  };

  logger.groupEnd = () => {
    if (environment !== ENV_PRODUCTION) {
      console.groupEnd();
    }
  };

  return logger;
}

export default Beaver;