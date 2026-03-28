import {
  AgCharts
} from "./chunk-LLYQLE5I.js";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-4XTVZBAK.js";
import "./chunk-RSS3ODKE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-653SOEEV.js";

// node_modules/ag-charts-angular/fesm2022/ag-charts-angular.mjs
var AgChartsBase = class _AgChartsBase {
  chart;
  _nativeElement;
  _initialised = false;
  ngZone;
  ngAfterViewInit() {
    const options = this.patchChartOptions(this.options);
    this.chart = this.runOutsideAngular(() => this.createChart(options));
    this._initialised = true;
    this.chart.chart.waitForUpdate().then(() => {
      this.chartReady.emit(this.chart);
    });
  }
  // noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
  ngOnChanges(_changes) {
    this.runOutsideAngular(() => {
      if (!this._initialised || !this.chart) {
        return;
      }
      this.chart.update(this.patchChartOptions(this.options));
    });
  }
  ngOnDestroy() {
    if (this._initialised && this.chart) {
      this.chart.destroy();
      this.chart = void 0;
      this._initialised = false;
    }
  }
  patchChartOptions(propsOptions) {
    const patchListeners = (listenerConfig) => {
      const config = listenerConfig ?? {};
      for (const listenerName of Object.keys(config)) {
        const listener = config[listenerName];
        if (typeof listener !== "function") continue;
        config[listenerName] = (...args) => {
          this.runInsideAngular(() => listener(...args));
        };
      }
    };
    patchListeners(propsOptions?.legend?.listeners);
    patchListeners(propsOptions?.listeners);
    if (propsOptions.series) {
      for (const series of propsOptions.series) {
        patchListeners(series.listeners);
      }
    }
    if (propsOptions.container) {
      return propsOptions;
    }
    return __spreadProps(__spreadValues({}, propsOptions), {
      container: this._nativeElement
    });
  }
  runOutsideAngular(callback) {
    return this.ngZone ? this.ngZone.runOutsideAngular(callback) : callback();
  }
  runInsideAngular(callback) {
    return this.ngZone ? this.ngZone.run(callback) : callback();
  }
  static ɵfac = function AgChartsBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgChartsBase)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _AgChartsBase,
    selectors: [["ng-component"]],
    standalone: false,
    features: [ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function AgChartsBase_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgChartsBase, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
var AgCharts2 = class _AgCharts extends AgChartsBase {
  ngZone;
  options = {};
  chartReady = new EventEmitter();
  constructor(elementDef, ngZone) {
    super();
    this.ngZone = ngZone;
    this._nativeElement = elementDef.nativeElement;
  }
  createChart(options) {
    return AgCharts.create(options);
  }
  static ɵfac = function AgCharts_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgCharts)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _AgCharts,
    selectors: [["ag-charts"]],
    inputs: {
      options: "options"
    },
    outputs: {
      chartReady: "chartReady"
    },
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function AgCharts_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgCharts2, [{
    type: Component,
    args: [{
      selector: "ag-charts",
      standalone: true,
      template: "",
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    chartReady: [{
      type: Output
    }]
  });
})();
var AgFinancialCharts = class _AgFinancialCharts extends AgChartsBase {
  ngZone;
  options = {};
  chartReady = new EventEmitter();
  constructor(elementDef, ngZone) {
    super();
    this.ngZone = ngZone;
    this._nativeElement = elementDef.nativeElement;
  }
  createChart(options) {
    return AgCharts.createFinancialChart(options);
  }
  static ɵfac = function AgFinancialCharts_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgFinancialCharts)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _AgFinancialCharts,
    selectors: [["ag-financial-charts"]],
    inputs: {
      options: "options"
    },
    outputs: {
      chartReady: "chartReady"
    },
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function AgFinancialCharts_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgFinancialCharts, [{
    type: Component,
    args: [{
      selector: "ag-financial-charts",
      standalone: true,
      template: "",
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    chartReady: [{
      type: Output
    }]
  });
})();
var AgGauge = class _AgGauge extends AgChartsBase {
  ngZone;
  options = {
    type: "radial-gauge",
    value: 0
  };
  chartReady = new EventEmitter();
  constructor(elementDef, ngZone) {
    super();
    this.ngZone = ngZone;
    this._nativeElement = elementDef.nativeElement;
  }
  createChart(options) {
    return AgCharts.createGauge(options);
  }
  static ɵfac = function AgGauge_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgGauge)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _AgGauge,
    selectors: [["ag-gauge"]],
    inputs: {
      options: "options"
    },
    outputs: {
      chartReady: "chartReady"
    },
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function AgGauge_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgGauge, [{
    type: Component,
    args: [{
      selector: "ag-gauge",
      standalone: true,
      template: "",
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }], {
    options: [{
      type: Input
    }],
    chartReady: [{
      type: Output
    }]
  });
})();
var AgChartsModule = class _AgChartsModule {
  static ɵfac = function AgChartsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgChartsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AgChartsModule,
    imports: [AgCharts2, AgFinancialCharts, AgGauge],
    exports: [AgCharts2, AgFinancialCharts, AgGauge]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgChartsModule, [{
    type: NgModule,
    args: [{
      declarations: [],
      imports: [AgCharts2, AgFinancialCharts, AgGauge],
      exports: [AgCharts2, AgFinancialCharts, AgGauge]
    }]
  }], null, null);
})();
export {
  AgCharts2 as AgCharts,
  AgChartsModule,
  AgFinancialCharts,
  AgGauge
};
//# sourceMappingURL=ag-charts-angular.js.map
