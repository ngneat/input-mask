import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { createMask } from './input-mask.directive';
import { InputMaskModule } from './input-mask.module';

@Component({
  template: `
    <input class="date" [inputMask]="dateMask" [formControl]="dateFC" />
    <input class="ip" [inputMask]="ipAddressMask" [formControl]="ipFC" />
    <input class="initDate" [inputMask]="dateMask" [formControl]="initDateFC" />
    <input
      class="dateOnBlur"
      [inputMask]="dateMask"
      [formControl]="dateBlurFC"
    />
  `,
})
class TestComponent {
  dateMask = createMask({
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
    parser: (value: string) => {
      const values = value.split('/');
      const year = +values[2];
      const month = +values[1] - 1;
      const date = +values[0];
      if (isNaN(date) && isNaN(month) && isNaN(year)) {
        // + empty string returns 0
        return null;
      }
      return new Date(year, month, date);
    },
  });
  dateFC = new FormControl('');
  dateBlurFC = new FormControl('', { updateOn: 'blur' });
  initDateFC = new FormControl('28/02/1992');

  ipAddressMask = createMask({ alias: 'ip' });
  ipFC = new FormControl('');
}

describe('InputMaskDirective', () => {
  let spectator: Spectator<TestComponent>;
  const createComponent = createComponentFactory({
    component: TestComponent,
    imports: [ReactiveFormsModule, InputMaskModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should get the instance', () => {
    const instance = spectator.component;
    expect(instance).toBeDefined();
  });

  it('should update the UI value as per mask', () => {
    const input = spectator.query('.date') as HTMLInputElement;
    spectator.typeInElement('28021992', '.date');
    expect(input.value).toEqual('28/02/1992');
    spectator.typeInElement('111111111111', '.ip');
    expect(spectator.component.ipFC.value).toEqual('111.111.111.111');
  });

  it('should update the control value as per mask parser', () => {
    spectator.typeInElement('28021992', '.date');
    expect(spectator.component.dateFC.value).toEqual(new Date(1992, 1, 28));
  });

  it('should make form control invalid for non-compliant value', () => {
    spectator.typeInElement('abcd', '.date');
    expect(spectator.component.dateFC.invalid).toBeTrue();
    spectator.typeInElement('abcd', '.ip');
    expect(spectator.component.ipFC.invalid).toBeTrue();
  });

  it('should render with initial value', () => {
    const input = spectator.query('.initDate') as HTMLInputElement;
    expect(input.value).toEqual('28/02/1992');
  });

  it('should update the UI value as per mask with updateOn: \'blur\'', () => {
    const input = spectator.query('.dateOnBlur') as HTMLInputElement;
    spectator.typeInElement('28021992', '.dateOnBlur');
    expect(input.value).toEqual('28/02/1992');
    expect(spectator.component.dateBlurFC.value).toBeFalsy();
    expect(spectator.component.dateBlurFC.dirty).toBeFalse();
    expect(spectator.component.dateBlurFC.touched).toBeFalse();
    spectator.blur('.dateOnBlur');
    expect(input.value).toEqual('28/02/1992');
    expect(spectator.component.dateBlurFC.value).toEqual(new Date(1992, 1, 28));
    expect(spectator.component.dateBlurFC.dirty).toBeTrue();
    expect(spectator.component.dateBlurFC.touched).toBeTrue();
  });
});
