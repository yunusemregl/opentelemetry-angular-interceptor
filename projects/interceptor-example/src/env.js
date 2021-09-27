import {NgxLoggerLevel} from "ngx-logger";

(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiUrl2 = 'http://127.0.0.1:5000';
  window.__env.production = false;
  window.__env.urlTest = 'http://localhost:4200/api';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
  window.__env.loggerConfig = {
    level: NgxLoggerLevel.DEBUG,
    disableConsoleLogging: false,
  };
  window.__env.config = {
    commonConfig: {
      console: false, // Display trace on console
      production: false, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'webclient-ozel', // Service name send in trace+
      logBody: true, // true add body in a log, nothing otherwise
      probabilitySampler: '1',
      logLevel: 0// ALL Log, DiagLogLevel is an Enum from @opentelemetry/api
    },
    batchSpanProcessorConfig: { // Only if production = true in commonConfig
      maxQueueSize: '2048', // The maximum queue size. After the size is reached spans are dropped.
      maxExportBatchSize: '512', // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
      scheduledDelayMillis: '5000', // The interval between two consecutive exports
      exportTimeoutMillis: '30000', // How long the export can run before it is cancelled
    },
    zipkinConfig: {
      url: 'http://localhost/cloudapi/client-trace',
      headers: {'Content-Type': 'application/json'}
    }
  }

}(this));
