// index.d.ts

export type Renderable = 
  | TemplateResult 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | Renderable[];

export interface TemplateResult {
  readonly strings: TemplateStringsArray;
  readonly values: readonly unknown[];
  readonly type: string;
}

export interface CSSResult {
  readonly cssText: string;
  readonly styleSheet?: CSSStyleSheet;
}

/** Lit의 속성 설정 옵션 (static properties 정의용) */
export interface PropertyDeclaration {
  readonly type?: any;
  readonly state?: boolean;
  readonly attribute?: boolean | string;
  readonly reflect?: boolean;
  readonly hasChanged?(value: any, oldValue: any): boolean;
}

export class LitElement extends HTMLElement {
  static styles?: CSSResult | CSSResult[];
  static properties?: Record<string, PropertyDeclaration>;

  protected render(): Renderable;
  connectedCallback(): void;
  disconnectedCallback(): void;
  protected firstUpdated(changedProperties: Map<string | number | symbol, unknown>): void;
  requestUpdate(name?: string | number | symbol, oldValue?: unknown): Promise<boolean>;
  readonly updateComplete: Promise<boolean>;
  protected createRenderRoot(): Element | ShadowRoot;
}

export function html(strings: TemplateStringsArray, ...values: Renderable[]): TemplateResult;
export function css(strings: TemplateStringsArray, ...values: (CSSResult | number)[]): CSSResult;