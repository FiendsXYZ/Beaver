# Beaver

## Introduction
Basic JavaScript logging middleware for custom and conditional logs. Offers customizable log levels, remote logging and asynchronous support.

## Features
- Environment-specific logging (development and production)
- Customizable log levels with colour coding
- Remote logging via webhook
- Asynchronous logging for performance optimization

## Installation
Install Beaver using npm/yarn:
```bash
npm install your-beaver-package-name
yarn add your-beaver-package-name
```

## Usage

To use Beaver logging in your project, first import and configure:

### Importing and Configuring Beaver
```javascript
import Beaver from 'path-to-beaver-library';

// Configuration settings for Beaver
const loggerConfig = {
  environments: {
    development: ['localhost', '127.0.0.1'],
    production: ['yourproductiondomain.com'],
  },
  logLevels: {
    // Predefined log levels
    important: { color: '#AA00AA', background: '#000000', production: true },
    log: { color: '#0077FF', background: '#000000', production: false },
    info: { color: '#00AA00', background: '#000000', production: false },
    warn: { color: '#FFA500', background: '#000000', production: true },
    error: { color: '#FF0000', background: '#000000', production: true },
    // Custom log level
    custom: { color: '#00FFFF', background: '#000033', production: true },
  },
  asyncLogging: true,
  includeLineInfo: true,
  useWebhook: true,
  webhookUrl: 'https://yourwebhookurl.com',
};


const logger = Beaver('YourComponentName', loggerConfig);

// Logging a simple message
logger.log('This is a log message');

// Logging an important message
logger.important('This is an important message');

// Logging an informational message
logger.info('This is an info message');

// Logging a warning
logger.warn('This is a warning message');

// Logging an error
logger.error('This is an error message');

```

                                                                            
            ██  ██████████████▓▓██  ████                                    
          ██▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒██                                  
          ██▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒██                                  
            ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██                                    
          ██▒▒▒▒▒▒██▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▓▓                                    
        ██▒▒▒▒▒▒▒▒██▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒██                                    
      ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██                                  
    ██▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██                                
    ██▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒██  ░░                            
    ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒██                              
    ██▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒██                              
    ██▒▒▒▒▓▓██████████████████▓▓▒▒▒▒▒▒▒▒▒▒▓▓▒▒██                            
    ▓▓▒▒▒▒▒▒▓▓██    ██    ██▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒██                          
    ██▒▒▒▒▒▒▒▒██    ██    ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██                        
    ██▒▒▒▒▒▒▒▒██    ██    ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒██                      
    ██▓▓▒▒▒▒▒▒▒▒██████████▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒██                    
      ██▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██░░██▒▒▒▒▒▒▒▒▒▒▓▓▒▒██                    
        ████▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██░░▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▓▓▒▒██                  
            ████▓▓▒▒▓▓██████▓▓██░░▒▒██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒██    ████████      
                ██▓▓██▒▒▒▒▓▓██░░▒▒██▓▓▒▒▒▒██▒▒▒▒██▒▒▓▓▒▒██  ██▒▒▒▒▒▒▒▒██    
                ██▒▒▒▒▒▒▓▓██░░▒▒▒▒▒▒██▓▓▒▒▒▒▒▒▓▓██▒▒▒▒▓▓▒▒██▒▒▓▓▓▓▒▒▓▓▒▒██  
                ██▓▓▓▓▓▓██░░▒▒▒▒▒▒██▓▓██▓▓▓▓▓▓██▓▓▒▒▒▒▒▒▒▒██▓▓▒▒▓▓▓▓▓▓▓▓██  
                ██████████▒▒▒▒▒▒██▓▓▓▓▓▓██████▓▓▒▒▒▒▓▓▒▒▒▒██▓▓▓▓▓▓▓▓▒▒▓▓██  
                ██▓▓██░░░░██▒▒▒▒██▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒██▓▓▓▓▓▓▓▓▓▓▓▓██  
                ██▓▓▓▓██░░░░████▒▒██▒▒▒▒▓▓▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒██▓▓▒▒▓▓▓▓▓▓████  
                  ██▓▓▓▓████▓▓▓▓██▒▒██▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▓▓▓▓▓▓▓▓████    
                  ██▓▓▓▓▓▓▓▓▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██▓▓▓▓▒▒████      
                ██████▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██████████████████████        
              ██░░░░░░██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██░░░░░░░░░░░░████████          
            ██▒▒██▒▒▒▒▒▒██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▒▒▒▒▒▒██▒▒██▒▒▒▒██              
            ██▓▓██████████████▓▓████████████████████████████▓▓              
