import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  PLATFORM_ID,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validator } from '@angular/forms';
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

  @HostListener('input', ['$event.target.value'])
  onInput = (_: any) => {};

  ngOnInit(): void {
    this.ngControl?.control?.setValidators([this.validate.bind(this)]);
    this.ngControl?.control?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.inputMaskPlugin?.remove();
  }

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (Object.keys(this.inputMask).length) {
      this.inputMaskPlugin = new Inputmask(this.inputMaskOptions).mask(
        this.elementRef.nativeElement
      );
      setTimeout(() => {
        this.ngControl?.control?.updateValueAndValidity();
      });
    }
  }

  get inputMaskOptions(): Inputmask.Options {
    const { parser, ...options } = this.inputMask;
    return options;
  }

  writeValue(value: string): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'value',
      value ?? ''
    );
  }

  registerOnChange(fn: (_: T | null) => void): void {
    const parser = this.inputMask.parser;
    this.onInput = (value) => {
      fn(parser ? parser(value) : value);
    };
  }

  registerOnTouched(fn: any): void {}

  validate(): { [key: string]: any } | null {
    return this.inputMaskPlugin && this.inputMaskPlugin.isValid()
      ? null
      : { inputMask: false };
  }
}

export const createMask = <T>(
  options: string | InputmaskOptions<T>
): InputmaskOptions<T> =>
  typeof options === 'string' ? { mask: options } : options;

export type InputmaskOptions<T> = Inputmask.Options & {
  parser?: (value: any) => T;
};
