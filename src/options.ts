import type { MutableRefObject } from 'react';

type SlideMenuOptionsSchema = {
  showStateRef: MutableRefObject<boolean>;
  mainRef: MutableRefObject<null>;
  menuContainerRef: MutableRefObject<null>;
  animationDuration?: number;
  border?: 'top' | 'right' | 'bottom' | 'left';
};

const defaultValues: {
  animationDuration: number,
  border: 'top' | 'right' | 'bottom' | 'left',
} = {
  animationDuration: 250,
  border: 'left',
};

export default class SlideMenuOptions {
  public readonly showStateRef: MutableRefObject<boolean>;

  public readonly mainRef: MutableRefObject<null>;

  public readonly menuContainerRef: MutableRefObject<null>;

  public readonly animationDuration: number;

  public readonly border: 'top' | 'right' | 'bottom' | 'left';

  constructor(optionsObject: SlideMenuOptionsSchema) {
    // Mandatory props
    this.showStateRef = optionsObject.showStateRef;
    this.mainRef = optionsObject.mainRef;
    this.menuContainerRef = optionsObject.menuContainerRef;

    // Optional props
    this.animationDuration = optionsObject.animationDuration ?? defaultValues.animationDuration;
    this.border = optionsObject.border ?? defaultValues.border;
  }
}
