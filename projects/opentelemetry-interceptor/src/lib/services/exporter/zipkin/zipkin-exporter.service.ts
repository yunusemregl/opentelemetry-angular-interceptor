import {Injectable, Inject} from '@angular/core';
import {IExporter} from '../exporter.interface';
import {SpanExporter} from '@opentelemetry/tracing';
import {OpenTelemetryConfig, OTELCOL_CONFIG} from '../../../configuration/opentelemetry-config';
import {ZipkinExporter, ExporterConfig} from '@opentelemetry/exporter-zipkin';
import {EnvService} from "../../env-service/env.service";

/**
 * ZipkinExporterService class
 */
@Injectable({
  providedIn: 'root',
})
export class ZipkinExporterService implements IExporter {
  /**
   * zipkinConfig
   */
  private zipkinConfig: ExporterConfig;

  /**
   * constructor
   *
   * @param env
   * @param config OpenTelemetryConfig
   */
  constructor(private env: EnvService, @Inject(OTELCOL_CONFIG) config: OpenTelemetryConfig) {
    if (this.env.config != null && this.env.config.zipkinConfig != null) {
      config = this.env.config;
    }

    this.zipkinConfig = {
      url: config.zipkinConfig?.url,
      headers: config.zipkinConfig?.headers
    };

  }

  /**
   * Return a ZipkinExporter configured with zipkinConfig field
   *
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new ZipkinExporter(this.zipkinConfig);
  }
}
