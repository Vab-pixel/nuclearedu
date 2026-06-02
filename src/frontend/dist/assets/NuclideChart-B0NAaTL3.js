import { b2 as epsilon, r as reactExports, j as jsxRuntimeExports, aC as Presence, av as Primitive, as as useControllableState, au as useComposedRefs, aw as composeEventHandlers, aA as createContextScope, af as Check, q as cn, aX as shapeLine, B as Button, b3 as ZoomIn, k as Badge, J as X, x as BookOpen, g as ChevronRight } from "./index-DTpTSWSe.js";
import { u as usePrevious } from "./index-DG7Ha9hh.js";
import { u as useSize } from "./index-BQgx5lFL.js";
import { S as Separator } from "./separator-Bl7zUiuX.js";
import { n as nuclides } from "./nuclides-BRGIWNJL.js";
import "./transform-HVroAnEf.js";
import { M as Minus } from "./minus-huGs9pjU.js";
import { P as Plus } from "./plus-CdkQv1U0.js";
import { R as RotateCcw } from "./rotate-ccw-jft29M4M.js";
import { s as select } from "./select-FR2wsuHH.js";
import "./index-yebDAB1k.js";
function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point$1(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        this._x1 = x, this._y1 = y;
        break;
      case 2:
        this._point = 3;
      default:
        point$1(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
(function custom(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function(tension2) {
    return custom(+tension2);
  };
  return cardinal;
})(0);
function point(that, x, y) {
  var x1 = that._x1, y1 = that._y1, x2 = that._x2, y2 = that._y2;
  if (that._l01_a > epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) {
      var x23 = this._x2 - x, y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point(this, x, y);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
const catmullRom = function custom2(alpha) {
  function catmullRom2(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom2.alpha = function(alpha2) {
    return custom2(+alpha2);
  };
  return catmullRom2;
}(0.5);
function colors(specifier) {
  var n = specifier.length / 6 | 0, colors2 = new Array(n), i = 0;
  while (i < n) colors2[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors2;
}
function ramp(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
const viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const CELL_SIZE = 14;
const CELL_GAP = 1;
const STEP = CELL_SIZE + CELL_GAP;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.15;
const AXIS_LEFT = 50;
const AXIS_BOTTOM = 40;
const COLOR_MAPS = {
  default: {
    stable: "#9ca3af",
    alpha: "#fbbf24",
    "beta-": "#60a5fa",
    "beta+": "#4ade80",
    gamma: "#c084fc",
    other: "#22d3ee"
  },
  deuteranopia: {
    stable: "#9ca3af",
    alpha: "#f97316",
    "beta-": "#3b82f6",
    "beta+": "#e879f9",
    gamma: "#facc15",
    other: "#22d3ee"
  }
};
const FRESHNESS_LEGEND = [
  { label: "0–7 days", color: "#10b981" },
  { label: "8–30 days", color: "#f59e0b" },
  { label: ">30 days / no data", color: "#6b7280" }
];
const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Alpha", value: "alpha" },
  { label: "β⁻ Decay", value: "beta-" },
  { label: "β⁺/EC Decay", value: "beta+" },
  { label: "Stable", value: "stable" },
  { label: "Gamma", value: "gamma" },
  { label: "Other", value: "other" }
];
const DECAY_FILTER_OPTS = FILTER_OPTIONS.slice(1);
const MAGIC_NUMBERS = [2, 8, 20, 28, 50, 82, 126];
function getFreshnessColor(nuclide) {
  if (!nuclide.lastUpdated) return "#374151";
  const diffDays = (Date.now() - new Date(nuclide.lastUpdated).getTime()) / 864e5;
  if (diffDays <= 7) return "#10b981";
  if (diffDays <= 30) return "#f59e0b";
  return "#6b7280";
}
function getHalfLifeColor(nuclide) {
  if (nuclide.halfLifeSeconds === null) return "#e9d5ff";
  const s = nuclide.halfLifeSeconds;
  if (s <= 0) return "#1e1b4b";
  const logS = Math.log10(s);
  const t = Math.max(0, Math.min(1, (logS + 10) / 30));
  return viridis(t);
}
function getBindingEnergyColor(nuclide) {
  if (nuclide.bindingEnergyPerNucleon_MeV === null) return "#374151";
  const t = Math.max(0, Math.min(1, nuclide.bindingEnergyPerNucleon_MeV / 9));
  return inferno(t);
}
function getColor(nuclide, palette, colorMode) {
  if (colorMode === "freshness") return getFreshnessColor(nuclide);
  if (colorMode === "halflife") return getHalfLifeColor(nuclide);
  if (colorMode === "binding") return getBindingEnergyColor(nuclide);
  const primary = nuclide.decayModes[0] ?? "other";
  return COLOR_MAPS[palette][primary] ?? COLOR_MAPS[palette].other;
}
const RADAR_DIMS = [
  { key: "Z", label: "Z", getValue: (n) => n.Z, max: 100 },
  { key: "N", label: "N", getValue: (n) => n.N, max: 160 },
  {
    key: "binding",
    label: "B/A",
    getValue: (n) => n.bindingEnergyPerNucleon_MeV ?? 0,
    max: 9
  },
  {
    key: "halflife",
    label: "log(t½)",
    getValue: (n) => n.halfLifeSeconds ? Math.max(0, Math.log10(n.halfLifeSeconds) + 10) : 30,
    max: 30
  },
  {
    key: "Qvalue",
    label: "Q (MeV)",
    getValue: (n) => Math.abs(n.Qvalue_MeV ?? 0),
    max: 10
  }
];
function RadarChart({
  nuclides: ns
}) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const angleStep = 2 * Math.PI / RADAR_DIMS.length;
  function axisPoint(i, radius) {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    };
  }
  function polygonPath(n) {
    const pts = RADAR_DIMS.map((dim, i) => {
      const val = dim.getValue(n);
      const norm = Math.min(1, val / dim.max);
      return axisPoint(i, norm * r);
    });
    return `${pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")}Z`;
  }
  const RADAR_COLORS = ["#60a5fa", "#4ade80", "#fbbf24", "#c084fc", "#f87171"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${size} ${size}`,
      className: "w-full max-w-[200px] mx-auto",
      role: "img",
      "aria-label": "Radar chart comparing nuclide properties",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Radar chart comparing nuclide properties" }),
        [0.25, 0.5, 0.75, 1].map((scale) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: RADAR_DIMS.map((_, i) => {
              const p = axisPoint(i, r * scale);
              return `${p.x},${p.y}`;
            }).join(" "),
            fill: "none",
            stroke: "rgba(255,255,255,0.1)",
            strokeWidth: 0.5
          },
          scale
        )),
        RADAR_DIMS.map((dim, i) => {
          const p = axisPoint(i, r);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: cx,
                y1: cy,
                x2: p.x,
                y2: p.y,
                stroke: "rgba(255,255,255,0.2)",
                strokeWidth: 0.5
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: axisPoint(i, r + 14).x,
                y: axisPoint(i, r + 14).y,
                textAnchor: "middle",
                dominantBaseline: "central",
                fill: "#9ca3af",
                fontSize: "9",
                children: dim.label
              }
            )
          ] }, dim.key);
        }),
        ns.map((n, ni) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: polygonPath(n),
            fill: `${RADAR_COLORS[ni % RADAR_COLORS.length]}33`,
            stroke: RADAR_COLORS[ni % RADAR_COLORS.length],
            strokeWidth: 1.5
          },
          n.symbol
        )),
        ns.map((n, ni) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: 10,
            cy: 10 + ni * 14,
            r: 3,
            fill: RADAR_COLORS[ni % RADAR_COLORS.length]
          },
          `${n.symbol}-dot`
        )),
        ns.map((n, ni) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: 17,
            y: 10 + ni * 14,
            dominantBaseline: "central",
            fill: "#e5e7eb",
            fontSize: "8",
            children: n.symbol
          },
          `${n.symbol}-lbl`
        ))
      ]
    }
  );
}
function HalfLifeLegend() {
  const steps = 6;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-3 w-36 rounded",
        style: {
          background: `linear-gradient(to right, ${Array.from({ length: steps }, (_, i) => viridis(i / (steps - 1))).join(", ")})`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground w-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Short" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Stable" })
    ] })
  ] });
}
function BindingLegend() {
  const steps = 6;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-3 w-36 rounded",
        style: {
          background: `linear-gradient(to right, ${Array.from({ length: steps }, (_, i) => inferno(i / (steps - 1))).join(", ")})`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground w-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0 MeV" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "9 MeV" })
    ] })
  ] });
}
function NuclideChart() {
  const svgRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [comparison, setComparison] = reactExports.useState([]);
  const [compareTab, setCompareTab] = reactExports.useState("table");
  const [inspectorTab, setInspectorTab] = reactExports.useState(
    "details"
  );
  const [filter, setFilter] = reactExports.useState("all");
  const [decayFilters, setDecayFilters] = reactExports.useState(
    /* @__PURE__ */ new Set(["alpha", "beta-", "beta+", "stable", "gamma", "other"])
  );
  const [zRange, setZRange] = reactExports.useState([0, 100]);
  const [aRange, setARange] = reactExports.useState([0, 250]);
  const [palette, setPalette] = reactExports.useState("default");
  const [colorMode, setColorMode] = reactExports.useState("decay");
  const [showMagicLines, setShowMagicLines] = reactExports.useState(true);
  const [showValleyOfStability, setShowValleyOfStability] = reactExports.useState(false);
  const [showInspector, setShowInspector] = reactExports.useState(false);
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [zoom, setZoom] = reactExports.useState(1);
  const [fitZoom, setFitZoom] = reactExports.useState(1);
  const [pan, setPan] = reactExports.useState({ x: 0, y: 0 });
  const isDragging = reactExports.useRef(false);
  const hasDragged = reactExports.useRef(false);
  const dragStart = reactExports.useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const maxN = reactExports.useMemo(() => Math.max(...nuclides.map((n) => n.N)), []);
  const maxZ = reactExports.useMemo(() => Math.max(...nuclides.map((n) => n.Z)), []);
  const svgW = (maxN + 2) * STEP + AXIS_LEFT + 20;
  const svgH = (maxZ + 2) * STEP + AXIS_BOTTOM + 20;
  const displayed = reactExports.useMemo(() => {
    return nuclides.filter((n) => {
      if (filter !== "all" && !n.decayModes.includes(filter))
        return false;
      if (filter === "all") {
        const hasMode = n.decayModes.some((m) => decayFilters.has(m));
        if (!hasMode) return false;
      }
      if (n.Z < zRange[0] || n.Z > zRange[1]) return false;
      if (n.A < aRange[0] || n.A > aRange[1]) return false;
      return true;
    });
  }, [filter, decayFilters, zRange, aRange]);
  const recalcFit = reactExports.useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerW = rect.width || 900;
    const containerH = rect.height || 500;
    const fit = Math.min(containerW / svgW, containerH / svgH);
    const clampedFit = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, fit));
    setFitZoom(clampedFit);
    setZoom(clampedFit);
    setPan({ x: 0, y: 0 });
  }, [svgW, svgH]);
  reactExports.useLayoutEffect(() => {
    recalcFit();
  }, [recalcFit]);
  reactExports.useEffect(() => {
    const obs = new ResizeObserver(recalcFit);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [recalcFit]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement)
        return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
      } else if (e.key === "0") {
        setZoom(fitZoom);
        setPan({ x: 0, y: 0 });
      } else if (e.key === "Escape") {
        setShowInspector(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fitZoom]);
  reactExports.useEffect(() => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);
    svg.selectAll(
      ".nuclide-cell, .axis-label, .magic-line, .magic-label, .valley-line"
    ).remove();
    for (let n = 0; n <= maxN; n += 10) {
      svg.append("text").attr("class", "axis-label").attr("x", AXIS_LEFT + n * STEP + CELL_SIZE / 2).attr("y", svgH - AXIS_BOTTOM + 16).attr("text-anchor", "middle").attr("fill", "#6b7280").attr("font-size", "9px").text(n);
    }
    for (let z = 0; z <= maxZ; z += 10) {
      svg.append("text").attr("class", "axis-label").attr("x", AXIS_LEFT - 8).attr("y", svgH - AXIS_BOTTOM - z * STEP + CELL_SIZE / 2 + 4).attr("text-anchor", "end").attr("fill", "#6b7280").attr("font-size", "9px").text(z);
    }
    if (showMagicLines) {
      for (const mn of MAGIC_NUMBERS) {
        if (mn <= maxN) {
          const x = AXIS_LEFT + mn * STEP - CELL_GAP / 2;
          svg.append("line").attr("class", "magic-line").attr("x1", x).attr("x2", x).attr("y1", 0).attr("y2", svgH - AXIS_BOTTOM).attr("stroke", "#818cf8").attr("stroke-width", 0.8).attr("stroke-dasharray", "4,3").attr("opacity", 0.55);
          svg.append("text").attr("class", "magic-label").attr("x", x + 2).attr("y", 10).attr("fill", "#818cf8").attr("font-size", "7px").text(`N=${mn}`);
        }
        if (mn <= maxZ) {
          const y = svgH - AXIS_BOTTOM - mn * STEP - CELL_GAP / 2;
          svg.append("line").attr("class", "magic-line").attr("x1", AXIS_LEFT).attr("x2", svgW).attr("y1", y).attr("y2", y).attr("stroke", "#f472b6").attr("stroke-width", 0.8).attr("stroke-dasharray", "4,3").attr("opacity", 0.55);
          svg.append("text").attr("class", "magic-label").attr("x", AXIS_LEFT + 2).attr("y", y - 2).attr("fill", "#f472b6").attr("font-size", "7px").text(`Z=${mn}`);
        }
      }
    }
    if (showValleyOfStability) {
      const valleyPts = Array.from(
        { length: maxZ + 1 },
        (_, z) => {
          const nIdeal = z <= 20 ? z : Math.round(z + (z - 20) * 0.4);
          return [nIdeal, z];
        }
      );
      const lineGen = shapeLine().x(([n]) => AXIS_LEFT + n * STEP + CELL_SIZE / 2).y(([, z]) => svgH - AXIS_BOTTOM - z * STEP + CELL_SIZE / 2).curve(catmullRom);
      svg.append("path").attr("class", "valley-line").datum(valleyPts).attr("d", lineGen).attr("fill", "none").attr("stroke", "#34d399").attr("stroke-width", 1.2).attr("stroke-dasharray", "6,4").attr("opacity", 0.7);
    }
    for (const n of displayed) {
      const cx = AXIS_LEFT + n.N * STEP;
      const cy = svgH - AXIS_BOTTOM - n.Z * STEP;
      const color = getColor(n, palette, colorMode);
      const isSelected = (selected == null ? void 0 : selected.symbol) === n.symbol;
      const isInComparison = comparison.some((c) => c.symbol === n.symbol);
      svg.append("rect").attr("class", "nuclide-cell").attr("x", cx).attr("y", cy).attr("width", CELL_SIZE).attr("height", CELL_SIZE).attr("rx", 1.5).attr("fill", color).attr("opacity", isSelected ? 1 : 0.85).attr(
        "stroke",
        isInComparison ? "#f59e0b" : isSelected ? "#fff" : "none"
      ).attr("stroke-width", isInComparison ? 2 : 1.5).attr("tabindex", "0").attr("role", "button").attr(
        "aria-label",
        `${n.name}, Z=${n.Z}, N=${n.N}, ${n.decayModes.join("/")} decay, half-life: ${n.halfLifeStr}`
      ).style("cursor", "pointer").on("click", () => {
        if (!hasDragged.current) {
          setSelected(n);
          setShowInspector(true);
        }
      }).on("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          setSelected(n);
          setShowInspector(true);
        }
      });
    }
  }, [
    displayed,
    palette,
    colorMode,
    selected,
    comparison,
    maxN,
    maxZ,
    svgH,
    svgW,
    showMagicLines,
    showValleyOfStability
  ]);
  const handlePointerDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
    e.target.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged.current = true;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  };
  const handlePointerUp = () => {
    isDragging.current = false;
  };
  const handleWheel = reactExports.useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom(
      (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2)))
    );
  }, []);
  const addToComparison = (n) => {
    if (comparison.length < 4 && !comparison.some((c) => c.symbol === n.symbol)) {
      setComparison([...comparison, n]);
    }
  };
  const removeFromComparison = (sym) => {
    setComparison(comparison.filter((c) => c.symbol !== sym));
  };
  const zoomPct = Math.round(zoom * 100);
  const COLOR_MODE_OPTS = [
    { value: "decay", label: "Decay Mode" },
    { value: "halflife", label: "Half-life" },
    { value: "binding", label: "Binding Energy" },
    { value: "freshness", label: "Data Freshness" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-screen bg-background overflow-hidden",
      "data-ocid": "nuclide-chart.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-none border-b border-border bg-card px-3 py-2 flex flex-wrap items-center gap-2 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0 mr-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-sm font-bold text-foreground leading-tight", children: "Chart of Nuclides" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground leading-tight", children: [
              displayed.length,
              "/",
              nuclides.length,
              " nuclides · ENSDF/NNDC"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-8 hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "fieldset",
            {
              className: "flex items-center gap-0.5 rounded-lg border border-border bg-muted/30 p-0.5 border-0 m-0",
              "aria-label": "Color mode",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Color mode" }),
                COLOR_MODE_OPTS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: colorMode === opt.value ? "default" : "ghost",
                    className: "h-6 px-2 text-xs",
                    onClick: () => setColorMode(opt.value),
                    "aria-pressed": colorMode === opt.value,
                    "data-ocid": `nuclide-chart.colormode_${opt.value}`,
                    children: opt.label
                  },
                  opt.value
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-8 hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "fieldset",
            {
              className: "flex flex-wrap gap-1 border-0 m-0 p-0",
              "aria-label": "Quick filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Quick filter by decay mode" }),
                FILTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: filter === opt.value ? "default" : "outline",
                    className: "h-6 px-2 text-xs",
                    onClick: () => setFilter(opt.value),
                    "aria-pressed": filter === opt.value,
                    "data-ocid": `nuclide-chart.filter_${opt.value}`,
                    children: opt.label
                  },
                  opt.value
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: showMagicLines ? "default" : "outline",
                className: "h-6 px-2 text-xs gap-1",
                onClick: () => setShowMagicLines((v) => !v),
                "aria-pressed": showMagicLines,
                "data-ocid": "nuclide-chart.magic_lines_toggle",
                children: "Magic N/Z"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: showValleyOfStability ? "default" : "outline",
                className: "h-6 px-2 text-xs gap-1",
                onClick: () => setShowValleyOfStability((v) => !v),
                "aria-pressed": showValleyOfStability,
                "data-ocid": "nuclide-chart.valley_toggle",
                children: "Valley"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-6 px-2 text-xs",
                onClick: () => setPalette((p) => p === "default" ? "deuteranopia" : "default"),
                "data-ocid": "nuclide-chart.palette_toggle",
                children: palette === "default" ? "Colorblind-Safe" : "Default Palette"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: showFilters ? "default" : "outline",
                className: "h-6 px-2 text-xs",
                onClick: () => setShowFilters((v) => !v),
                "data-ocid": "nuclide-chart.filters_toggle",
                children: "⚙ Filters"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-8 hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1 rounded-full border border-border bg-muted/30 px-2 py-0.5",
              role: "toolbar",
              "aria-label": "Zoom",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-6 w-6 rounded-full p-0",
                    onClick: () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2))),
                    disabled: zoom <= MIN_ZOOM,
                    "aria-label": "Zoom out",
                    "data-ocid": "nuclide-chart.zoom_out_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-mono text-xs text-foreground min-w-[2.8rem] text-center",
                    "aria-live": "polite",
                    children: [
                      zoomPct,
                      "%"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-6 w-6 rounded-full p-0",
                    onClick: () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2))),
                    disabled: zoom >= MAX_ZOOM,
                    "aria-label": "Zoom in",
                    "data-ocid": "nuclide-chart.zoom_in_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-6 px-1.5 rounded-full text-xs gap-0.5",
                    onClick: () => {
                      setZoom(fitZoom);
                      setPan({ x: 0, y: 0 });
                    },
                    "aria-label": "Reset zoom",
                    "data-ocid": "nuclide-chart.zoom_reset_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
                      "Fit"
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-none border-b border-border bg-muted/30 px-4 py-3 flex flex-wrap gap-6 items-start z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-2", children: "Decay modes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: DECAY_FILTER_OPTS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: `decay-filter-${opt.value}`,
                className: "flex items-center gap-1.5 cursor-pointer text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      id: `decay-filter-${opt.value}`,
                      checked: decayFilters.has(opt.value),
                      onCheckedChange: (checked) => {
                        setDecayFilters((prev) => {
                          const next = new Set(prev);
                          if (checked) next.add(opt.value);
                          else next.delete(opt.value);
                          return next;
                        });
                      },
                      "data-ocid": `nuclide-chart.decay_filter_${opt.value}`
                    }
                  ),
                  opt.label
                ]
              },
              opt.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2", children: [
              "Z range: ",
              zRange[0],
              "–",
              zRange[1]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 100,
                  value: zRange[0],
                  onChange: (e) => setZRange([+e.target.value, zRange[1]]),
                  className: "w-20 accent-primary",
                  "aria-label": "Min Z",
                  "data-ocid": "nuclide-chart.z_range_min"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 100,
                  value: zRange[1],
                  onChange: (e) => setZRange([zRange[0], +e.target.value]),
                  className: "w-20 accent-primary",
                  "aria-label": "Max Z",
                  "data-ocid": "nuclide-chart.z_range_max"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2", children: [
              "A range: ",
              aRange[0],
              "–",
              aRange[1]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 250,
                  value: aRange[0],
                  onChange: (e) => setARange([+e.target.value, aRange[1]]),
                  className: "w-20 accent-primary",
                  "aria-label": "Min A",
                  "data-ocid": "nuclide-chart.a_range_min"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 250,
                  value: aRange[1],
                  onChange: (e) => setARange([aRange[0], +e.target.value]),
                  className: "w-20 accent-primary",
                  "aria-label": "Max A",
                  "data-ocid": "nuclide-chart.a_range_max"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-7 text-xs self-end",
              onClick: () => {
                setDecayFilters(
                  /* @__PURE__ */ new Set([
                    "alpha",
                    "beta-",
                    "beta+",
                    "stable",
                    "gamma",
                    "other"
                  ])
                );
                setZRange([0, 100]);
                setARange([0, 250]);
                setFilter("all");
              },
              "data-ocid": "nuclide-chart.reset_filters_button",
              children: "Reset Filters"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: containerRef,
              className: "flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing bg-[#0a0a12]",
              "data-ocid": "nuclide-chart.svg_container",
              onPointerDown: handlePointerDown,
              onPointerMove: handlePointerMove,
              onPointerUp: handlePointerUp,
              onPointerLeave: handlePointerUp,
              onWheel: handleWheel,
              "aria-label": "Chart of Nuclides — drag to pan, scroll to zoom",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground pointer-events-none z-10 font-mono", children: "Neutron Number (N) →" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute left-2 top-1/2 text-[10px] text-muted-foreground pointer-events-none z-10 font-mono",
                    style: {
                      transform: "translateY(-50%) rotate(-90deg)",
                      whiteSpace: "nowrap"
                    },
                    children: "← Proton Number (Z)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      transform: `translate(${pan.x}px, ${pan.y}px)`,
                      transformOrigin: "0 0",
                      willChange: "transform"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        ref: svgRef,
                        width: svgW,
                        height: svgH,
                        style: {
                          transform: `scale(${zoom})`,
                          transformOrigin: "0 0",
                          display: "block"
                        },
                        role: "img",
                        "aria-label": `Chart of Nuclides: ${displayed.length} nuclides shown.`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Chart of Nuclides — Z vs N heatmap" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/60 pointer-events-none flex items-center gap-1.5 z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-3 w-3" }),
                  "Drag to pan · Scroll to zoom · ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "font-mono", children: "+/-" }),
                  " ",
                  "keys · Click cell for details"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 right-4 z-20 bg-card/90 border border-border rounded-lg px-3 py-2 text-xs backdrop-blur-sm", children: [
                  colorMode === "decay" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Decay Mode" }),
                    Object.entries(COLOR_MAPS[palette]).map(([mode, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-block h-2.5 w-2.5 rounded-sm flex-none",
                          style: { background: color }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: mode })
                    ] }, mode))
                  ] }),
                  colorMode === "freshness" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Data Freshness" }),
                    FRESHNESS_LEGEND.map(({ label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-block h-2.5 w-2.5 rounded-sm flex-none",
                          style: { background: color }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label })
                    ] }, label))
                  ] }),
                  colorMode === "halflife" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Half-life (log scale)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HalfLifeLegend, {})
                  ] }),
                  colorMode === "binding" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Binding Energy / Nucleon" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BindingLegend, {})
                  ] }),
                  showMagicLines && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-col gap-0.5 border-t border-border pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-block h-0.5 w-5 bg-[#818cf8] opacity-60",
                          style: { borderTop: "1px dashed #818cf8" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Magic N" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-block h-0.5 w-5 bg-[#f472b6] opacity-60",
                          style: { borderTop: "1px dashed #f472b6" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Magic Z" })
                    ] })
                  ] }),
                  showValleyOfStability && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block h-0.5 w-5",
                        style: { borderTop: "2px dashed #34d399" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Valley of Stability" })
                  ] })
                ] })
              ]
            }
          ),
          showInspector && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-none w-80 border-l border-border bg-card flex flex-col overflow-hidden",
              "data-ocid": "nuclide-chart.inspector_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 border-b border-border bg-muted/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: inspectorTab === "details" ? "default" : "ghost",
                        className: "h-6 px-2 text-xs",
                        onClick: () => setInspectorTab("details"),
                        "data-ocid": "nuclide-chart.inspector_details_tab",
                        children: "Details"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: inspectorTab === "compare" ? "default" : "ghost",
                        className: "h-6 px-2 text-xs gap-1",
                        onClick: () => setInspectorTab("compare"),
                        "data-ocid": "nuclide-chart.inspector_compare_tab",
                        children: [
                          "Compare",
                          comparison.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "h-4 w-4 p-0 flex items-center justify-center text-[9px]", children: comparison.length })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-6 w-6 p-0 rounded-full",
                      onClick: () => setShowInspector(false),
                      "aria-label": "Close inspector",
                      "data-ocid": "nuclide-chart.inspector_close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                    }
                  )
                ] }),
                inspectorTab === "details" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "h-5 w-5 rounded flex-none",
                        style: {
                          background: getColor(selected, palette, colorMode)
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: selected.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                        selected.symbol,
                        " · A=",
                        selected.A
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: selected.decayModes.map((dm) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "text-[10px] px-1.5 py-0",
                      style: {
                        background: COLOR_MAPS[palette][dm] ?? COLOR_MAPS[palette].other,
                        color: "#000"
                      },
                      children: dm
                    },
                    dm
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-2 gap-x-3 gap-y-2", children: [
                    ["Proton (Z)", selected.Z],
                    ["Neutron (N)", selected.N],
                    ["Mass number (A)", selected.A],
                    ["Half-life", selected.halfLifeStr],
                    [
                      "Q-value",
                      selected.Qvalue_MeV != null ? `${selected.Qvalue_MeV} MeV` : "—"
                    ],
                    [
                      "Binding E/A",
                      selected.bindingEnergyPerNucleon_MeV != null ? `${selected.bindingEnergyPerNucleon_MeV} MeV` : "—"
                    ],
                    [
                      "Mass excess",
                      selected.massExcess_keV != null ? `${selected.massExcess_keV} keV` : "—"
                    ],
                    [
                      "Abundance",
                      selected.abundance != null ? `${selected.abundance}%` : "—"
                    ],
                    [
                      "Atomic mass",
                      selected.atomicMass_AMU != null ? `${selected.atomicMass_AMU} u` : "—"
                    ]
                  ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-xs font-semibold text-foreground break-all", children: String(value) })
                  ] }, label)) }),
                  selected.branchingRatios && selected.branchingRatios.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1", children: "Branching Ratios" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: selected.branchingRatios.map((br) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full bg-primary rounded-full",
                          style: { width: `${br}%` }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground w-10 text-right", children: [
                        br,
                        "%"
                      ] })
                    ] }, br)) })
                  ] }),
                  selected.lastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "h-1.5 w-1.5 rounded-full flex-none",
                        style: { background: getFreshnessColor(selected) }
                      }
                    ),
                    "IAEA last updated:",
                    " ",
                    new Date(selected.lastUpdated).toLocaleDateString()
                  ] }),
                  selected.sourceUri && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: selected.sourceUri,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-1.5 text-xs text-primary hover:underline",
                      "data-ocid": "nuclide-chart.nndc_link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
                        "View on NNDC/NuDat3",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: comparison.some((c) => c.symbol === selected.symbol) ? "default" : "outline",
                      className: "h-7 text-xs w-full",
                      disabled: comparison.length >= 4 && !comparison.some((c) => c.symbol === selected.symbol),
                      onClick: () => {
                        if (comparison.some((c) => c.symbol === selected.symbol)) {
                          removeFromComparison(selected.symbol);
                        } else {
                          addToComparison(selected);
                          setInspectorTab("compare");
                        }
                      },
                      "data-ocid": "nuclide-chart.add_compare_button",
                      children: comparison.some((c) => c.symbol === selected.symbol) ? "✓ In Comparison" : comparison.length >= 4 ? "Max 4 nuclides" : "Add to Compare"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center justify-center h-full py-12 gap-2 text-muted-foreground",
                    "data-ocid": "nuclide-chart.inspector_empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-8 w-8 opacity-30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Click any nuclide to inspect" })
                    ]
                  }
                ) }),
                inspectorTab === "compare" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-3 flex flex-col gap-3", children: comparison.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground",
                    "data-ocid": "nuclide-chart.compare_empty_state",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-center", children: 'Select nuclides and click "Add to Compare" in the Details tab' })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: comparison.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "h-2 w-2 rounded-sm flex-none",
                            style: {
                              background: getColor(n, palette, colorMode)
                            }
                          }
                        ),
                        n.symbol,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeFromComparison(n.symbol),
                            className: "opacity-60 hover:opacity-100 ml-0.5",
                            "aria-label": `Remove ${n.symbol}`,
                            "data-ocid": `nuclide-chart.remove_compare_${n.symbol}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-2.5 w-2.5" })
                          }
                        )
                      ]
                    },
                    n.symbol
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: compareTab === "table" ? "default" : "ghost",
                        className: "h-6 px-2 text-xs",
                        onClick: () => setCompareTab("table"),
                        "data-ocid": "nuclide-chart.compare_table_tab",
                        children: "Table"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: compareTab === "radar" ? "default" : "ghost",
                        className: "h-6 px-2 text-xs",
                        onClick: () => setCompareTab("radar"),
                        "data-ocid": "nuclide-chart.compare_radar_tab",
                        children: "Radar"
                      }
                    )
                  ] }),
                  compareTab === "table" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto -mx-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "text-xs w-full min-w-max", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pr-2 pb-1.5 font-medium", children: "Property" }),
                      comparison.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: "text-right pb-1.5 px-1 font-medium",
                          children: n.symbol
                        },
                        n.symbol
                      ))
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                      { label: "Z", get: (n) => n.Z },
                      { label: "N", get: (n) => n.N },
                      { label: "A", get: (n) => n.A },
                      {
                        label: "Half-life",
                        get: (n) => n.halfLifeStr
                      },
                      {
                        label: "Decay",
                        get: (n) => n.decayModes.join("/")
                      },
                      {
                        label: "Q (MeV)",
                        get: (n) => n.Qvalue_MeV != null ? n.Qvalue_MeV : "—"
                      },
                      {
                        label: "B/A (MeV)",
                        get: (n) => n.bindingEnergyPerNucleon_MeV != null ? n.bindingEnergyPerNucleon_MeV : "—"
                      },
                      {
                        label: "Δm (keV)",
                        get: (n) => n.massExcess_keV != null ? n.massExcess_keV : "—"
                      },
                      {
                        label: "Abundance",
                        get: (n) => n.abundance != null ? `${n.abundance}%` : "—"
                      }
                    ].map(({ label, get }) => {
                      const vals = comparison.map(get);
                      const numericVals = vals.filter((v) => typeof v === "number").map(Number);
                      const maxVal = numericVals.length > 0 ? Math.max(...numericVals) : null;
                      const minVal = numericVals.length > 0 ? Math.min(...numericVals) : null;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "tr",
                        {
                          className: "border-t border-border/50",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-2 py-1 text-muted-foreground font-medium", children: label }),
                            comparison.map((n, _ni) => {
                              const v = get(n);
                              const isMax = typeof v === "number" && v === maxVal && maxVal !== minVal;
                              const isMin = typeof v === "number" && v === minVal && maxVal !== minVal;
                              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "td",
                                {
                                  className: `text-right px-1 py-1 font-mono ${isMax ? "text-green-400 font-bold" : isMin ? "text-red-400" : "text-foreground"}`,
                                  children: String(v)
                                },
                                n.symbol
                              );
                            })
                          ]
                        },
                        label
                      );
                    }) })
                  ] }) }),
                  compareTab === "radar" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RadarChart, { nuclides: comparison, palette }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center", children: "Normalized radar chart — green=high, relative to all comparison items" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "h-7 text-xs w-full mt-auto",
                      onClick: () => setComparison([]),
                      "data-ocid": "nuclide-chart.clear_compare_button",
                      children: "Clear All"
                    }
                  )
                ] }) })
              ]
            }
          ),
          !showInspector && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "flex-none w-8 border-l border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
              onClick: () => setShowInspector(true),
              "aria-label": "Open inspector panel",
              "data-ocid": "nuclide-chart.inspector_open_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ]
    }
  );
}
export {
  COLOR_MAPS,
  FILTER_OPTIONS,
  FRESHNESS_LEGEND,
  NuclideChart as default,
  getColor
};
