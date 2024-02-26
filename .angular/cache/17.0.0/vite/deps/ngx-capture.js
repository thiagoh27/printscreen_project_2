import {
  html2canvas_esm_default
} from "./chunk-XVX3BMMU.js";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  Subject,
  ViewChild,
  from,
  of,
  setClassMetadata,
  take,
  tap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵviewQuery
} from "./chunk-A6IMIUIQ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-J5XZNU7V.js";

// node_modules/ngx-capture/fesm2020/ngx-capture.mjs
var _c0 = ["rect"];
var _c1 = ["over"];
var _c2 = ["*"];
var NgxCaptureService = class {
  getImage(screen, fullCapture, cropDimensions) {
    let options = {
      logging: false,
      useCORS: true
    };
    if (!fullCapture && cropDimensions.width > 10 && cropDimensions.height > 10) {
      options = __spreadValues(__spreadValues({}, options), cropDimensions);
    } else if (!fullCapture) {
      return of(null);
    }
    return from(html2canvas_esm_default(screen, options).then((canv) => {
      const img = canv.toDataURL("image/png");
      return img;
    }, (err) => {
      throw new Error(err);
    }).catch((res) => {
      throw new Error(res);
    }));
  }
  downloadImage(img) {
    const element = document.createElement("a");
    element.setAttribute("href", img);
    element.setAttribute("download", "capture");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
};
NgxCaptureService.ɵfac = function NgxCaptureService_Factory(t) {
  return new (t || NgxCaptureService)();
};
NgxCaptureService.ɵprov = ɵɵdefineInjectable({
  token: NgxCaptureService,
  factory: NgxCaptureService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxCaptureService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NgxCaptureComponent = class {
  constructor(captureService) {
    this.captureService = captureService;
    this.resultImage = new EventEmitter();
    this.isDrawing = false;
    this.mouseStart = {
      x: 0,
      y: 0
    };
    this.cropDimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.destroy$ = new Subject();
  }
  ngOnInit() {
    setTimeout(() => {
      this.rect = this.rectangle.nativeElement;
      this.captureZone = this.overlay.nativeElement;
      if (!this.captureZone) {
        console.warn('"captureZone" is not set');
        return;
      }
      this.captureZone.onmousedown = (e) => this.startCapture(e);
      this.captureZone.onmousemove = (e) => this.drawRect(e);
      this.captureZone.onmouseup = () => this.endCapture();
    }, 2e3);
  }
  startCapture(e) {
    const mouse = this.setMousePosition(e, true);
    this.isDrawing = true;
    this.cropDimensions = {
      x: mouse.x,
      y: mouse.y,
      width: 0,
      height: 0
    };
    this.captureZone.style.cursor = "crosshair";
  }
  drawRect(e) {
    if (this.isDrawing) {
      const mouse = this.setMousePosition(e, false);
      this.cropDimensions = {
        x: mouse.x - this.mouseStart.x < 0 ? mouse.x : this.mouseStart.x,
        y: mouse.y - this.mouseStart.y < 0 ? mouse.y : this.mouseStart.y,
        width: Math.abs(mouse.x - this.mouseStart.x),
        height: Math.abs(mouse.y - this.mouseStart.y)
      };
      this.setRectangle();
    }
  }
  setMousePosition(e, isStart = false) {
    const ev = e || window.event;
    const mouse = {
      x: 0,
      y: 0
    };
    if (ev.pageX) {
      mouse.x = ev.clientX;
      mouse.y = ev.clientY;
    } else if (ev.clientX) {
      mouse.x = ev.clientX + document.body.scrollLeft;
      mouse.y = ev.clientY + document.body.scrollTop;
    }
    if (isStart) {
      this.mouseStart.x = mouse.x;
      this.mouseStart.y = mouse.y;
    }
    return mouse;
  }
  endCapture() {
    this.captureZone.style.cursor = "default";
    this.isDrawing = false;
    this.captureService.getImage(this.target, false, __spreadProps(__spreadValues({}, this.cropDimensions), {
      x: this.cropDimensions.x + window.scrollX,
      y: this.cropDimensions.y + window.scrollY
    })).pipe(take(1), tap((img) => {
      this.resultImage.emit(img);
    })).subscribe();
    this.cropDimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.setRectangle();
  }
  setRectangle() {
    this.rect.style.left = this.cropDimensions.x + "px";
    this.rect.style.top = this.cropDimensions.y + "px";
    this.rect.style.width = this.cropDimensions.width + "px";
    this.rect.style.height = this.cropDimensions.height + "px";
  }
};
NgxCaptureComponent.ɵfac = function NgxCaptureComponent_Factory(t) {
  return new (t || NgxCaptureComponent)(ɵɵdirectiveInject(NgxCaptureService));
};
NgxCaptureComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxCaptureComponent,
  selectors: [["ngx-capture"]],
  viewQuery: function NgxCaptureComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7);
      ɵɵviewQuery(_c1, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rectangle = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlay = _t.first);
    }
  },
  inputs: {
    target: "target"
  },
  outputs: {
    resultImage: "resultImage"
  },
  ngContentSelectors: _c2,
  decls: 5,
  vars: 0,
  consts: [[1, "overlay"], ["over", ""], [1, "rectangle"], ["rect", ""]],
  template: function NgxCaptureComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
      ɵɵelementStart(1, "div", 0, 1);
      ɵɵelement(3, "div", 2, 3);
      ɵɵelementEnd();
    }
  },
  styles: [".overlay[_ngcontent-%COMP%]{top:0;left:0;position:fixed;width:100vw;height:100vh}.rectangle[_ngcontent-%COMP%]{border:1px solid #ff0000;position:absolute}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxCaptureComponent, [{
    type: Component,
    args: [{
      selector: "ngx-capture",
      template: `
    <ng-content></ng-content>
    <div class="overlay" #over>
      <div class="rectangle" #rect></div>
    </div>
  `,
      styles: [".overlay{top:0;left:0;position:fixed;width:100vw;height:100vh}.rectangle{border:1px solid #ff0000;position:absolute}\n"]
    }]
  }], function() {
    return [{
      type: NgxCaptureService
    }];
  }, {
    rectangle: [{
      type: ViewChild,
      args: ["rect", {
        static: true
      }]
    }],
    overlay: [{
      type: ViewChild,
      args: ["over", {
        static: true
      }]
    }],
    target: [{
      type: Input
    }],
    resultImage: [{
      type: Output
    }]
  });
})();
var NgxCaptureModule = class {
};
NgxCaptureModule.ɵfac = function NgxCaptureModule_Factory(t) {
  return new (t || NgxCaptureModule)();
};
NgxCaptureModule.ɵmod = ɵɵdefineNgModule({
  type: NgxCaptureModule,
  declarations: [NgxCaptureComponent],
  exports: [NgxCaptureComponent]
});
NgxCaptureModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxCaptureModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxCaptureComponent],
      imports: [],
      exports: [NgxCaptureComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }]
  }], null, null);
})();
export {
  NgxCaptureComponent,
  NgxCaptureModule,
  NgxCaptureService
};
//# sourceMappingURL=ngx-capture.js.map
