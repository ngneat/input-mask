import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  Directive,
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
import { IonInput } from '@ionic/angular';
import Inputmask from 'inputmask';
import { InputmaskOptions } from './types';

@Directive({ selector: 'ion-input[inputMask]' })
export class InputMaskIonicDirective<T = any>
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
  /**
   *Helps you to create input-mask based on https://github.com/RobinHerbots/Inputmask
   *Supports form-validation out-of-the box.
   *Visit https://github.com/ngneat/input-mask for more info.
   */
  @Input() inputMask: InputmaskOptions<T> = {};
  nativeInputElement: HTMLInputElement | undefined;
  inputMaskPlugin: Inputmask.Instance | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2,
    @Optional() @Self() public ngControl: NgControl,
    private inputMaskIonInput: IonInput
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @HostListener('ionInput', ['$event.target.value'])
  onInput = (_: any) => {};

  ngOnInit() {
    this.ngControl?.control?.setValidators([this.validate.bind(this)]);
    this.ngControl?.control?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.inputMaskPlugin?.remove();
  }

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.inputMaskIonInput.getInputElement().then((ele) => {
      this.nativeInputElement = ele;
      if (Object.keys(this.inputMask).length) {
        this.inputMaskPlugin = new Inputmask(this.inputMaskOptions).mask(
          this.nativeInputElement as HTMLInputElement
        );
        setTimeout(() => {
          this.ngControl?.control?.updateValueAndValidity();
        });
      }
    });
  }

  get inputMaskOptions(): Inputmask.Options {
    const { parser, ...options } = this.inputMask;
    return options;
  }

  writeValue(value: string): void {
    if (this.nativeInputElement) {
      this.renderer.setProperty(this.nativeInputElement, 'value', value);
    } else {
      this.inputMaskIonInput.getInputElement().then((ele) => {
        this.nativeInputElement = ele;
        this.renderer.setProperty(this.nativeInputElement, 'value', value);
      });
    }
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
