export interface LogLevels {
  [level: string]: {
    color: string;
    background: string;
    production: boolean;
  };
}

export interface BeaverConfig {
  environments?: {
    development: string[];
    production: string[];
  };
  logLevels?: LogLevels;
  asyncLogging?: boolean;
  includeLineInfo?: boolean;
  useWebhook?: boolean;
  webhookUrl?: string;
  logFilter?: string | null;
  forceLog?: boolean;
}

export interface Logger {
  [level: string]: (...args: any[]) => void;
  group: (...args: any[]) => void;
  groupEnd: () => void;
}

export default function Beaver(componentName: string, userConfig?: BeaverConfig): Logger;