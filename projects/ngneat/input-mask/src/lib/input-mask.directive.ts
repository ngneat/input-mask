import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  PLATFORM_ID,
  Renderer2,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  Validator,
} from '@angular/forms';
import Inputmask from 'inputmask';

@Directive({ selector: '[inputMask]' })
export class InputMaskDirective<T = any>
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
  /**
   *Helps you to create input-mask based on https://github.com/RobinHerbots/Inputmask
   *Supports form-validation out-of-the box.
   *Visit https://github.com/ngneat/input-mask for more info.
   */
  @Input() inputMask: InputmaskOptions<T> = {};
  inputMaskPlugin: Inputmask.Instance | undefined;

  private formInitialValue: T | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onInput = (_: any) => {};

  ngOnInit() {
    this.getFormControl()?.setValidators([this.validate.bind(this)]);
    this.getFormControl()?.updateValueAndValidity();
    this.formInitialValue = this.getFormControl()?.value;
  }

  ngOnDestroy(): void {
    this.inputMaskPlugin?.remove();
  }

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (Object.keys(this.inputMask).length) {
      this.inputMaskPlugin = new Inputmask(this.inputMaskOptions).mask(
        this.elementRef.nativeElement
      );

      this.setupEventListenerForFormControl();

      setTimeout(() => {
        this.getFormControl()?.updateValueAndValidity();
      });
    }
  }

  get inputMaskOptions(): Inputmask.Options {
    const { parser, ...options } = this.inputMask;
    return options;
  }

  writeValue(value: string): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  registerOnChange(fn: (_: T | null) => void): void {
    this.onChange = fn;
    if (this.getFormControl()?.updateOn === 'change') {
      const parser = this.inputMask.parser;
      this.onInput = (value) => {
        fn(parser ? parser(value) : value);
      };
    }
  }

  registerOnTouched(fn: () => void): void {
    if (this.getFormControl()?.updateOn === 'blur') {
      const parser = this.inputMask.parser;
      this.onInput = (value): void => {
        const newValue = parser ? parser(value) : value;
        this.onChange(newValue); // 2 discuss
        if (this.formInitialValue !== value) {
          fn();
        }
      };
    }
  }

  validate(): { [key: string]: any } | null {
    return this.inputMaskPlugin && this.inputMaskPlugin.isValid()
      ? null
      : { inputMask: false };
  }

  private getFormControl(): AbstractControl | null {
    return this.ngControl?.control;
  }

  private setupEventListenerForFormControl() {
    if (this.getFormControl() != null) {
      const updateOn = this.getFormControl()?.updateOn;
      const eventName = updateOn === 'blur' ? 'blur' : 'input';
      this.renderer.listen(
        this.elementRef.nativeElement,
        eventName,
        (event: any) => this.onInput(event.target.value)
      );
    }
  }

  private onChange: (_: T | null) => void = (_: any) => {};
}

export const createMask = <T>(
  options: string | InputmaskOptions<T>
): InputmaskOptions<T> =>
  typeof options === 'string' ? { mask: options } : options;

export type InputmaskOptions<T> = Inputmask.Options & {
  parser?: (value: any) => T;
};
