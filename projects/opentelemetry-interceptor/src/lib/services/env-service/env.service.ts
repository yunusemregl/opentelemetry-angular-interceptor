import {Injectable} from '@angular/core';
import {
  OpenTelemetryConfig
} from '../../configuration/opentelemetry-config';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl2 = '';
  public urlTest = '';

  public production = false;
  // Whether or not to enable debug mode
  public enableDebug = true;
  public config: OpenTelemetryConfig;
  public loggerConfig: {
    level: 1,
    disableConsoleLogging: false,
  }

  constructor() {
  }

}
