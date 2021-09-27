import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
// eslint-disable-next-line max-len
import {
  OpenTelemetryInterceptorModule,
  OTELCOL_LOGGER,
  OtelColExporterModule,
  CompositePropagatorModule,
  HttpTraceContextPropagatorModule, ZipkinExporterModule
} from 'projects/opentelemetry-interceptor/src/public-api';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewBackendComponent} from './view-backend/view-backend.component';
import {HighlightJsModule} from 'ngx-highlight-js';
import {AppRoutingModule} from './app-routing.module';
import {PostBackendComponent} from './post-backend/post-backend.component';
import {JsonpBackendComponent} from './jsonp-backend/jsonp-backend.component';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {CUSTOM_SPAN} from '../../../opentelemetry-interceptor/src/lib/configuration/opentelemetry-config';
import {CustomSpanImpl} from './custom-span-impl';
import {EnvServiceProvider} from "./env.service.provider";
import {DiagLogLevel} from "@opentelemetry/api";

@NgModule({
  declarations: [AppComponent, ViewBackendComponent, PostBackendComponent, JsonpBackendComponent],
  imports: [
    BrowserModule,
    // Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot({
      commonConfig: {
        console: true, // Display trace on console
        production: false, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
        serviceName: 'interceptor-example', // Service name send in trace
        logBody: true, // true add body in a log, nothing otherwise
        probabilitySampler: '1', // 75% sampling
        logLevel: DiagLogLevel.ALL //ALL Log, DiagLogLevel is an Enum from @opentelemetry/api
      },
      otelcolConfig: {
        url: 'http://127.0.0.1:4318/v1/traces', // URL of opentelemetry collector
        attributes: {
          test: 'test'
        }
      }
    }),
    // OtelColExporterModule,
    ZipkinExporterModule,
    HttpTraceContextPropagatorModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    HighlightJsModule,
    AppRoutingModule,
    // Insert a logger (NGXLogger for this example...)
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      disableConsoleLogging: false,
    }),
  ],
  providers: [
    // Provide token OTELCOL_LOGGER with the NGXLogger
    {provide: OTELCOL_LOGGER, useExisting: NGXLogger},
    {provide: CUSTOM_SPAN, useClass: CustomSpanImpl}, EnvServiceProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
