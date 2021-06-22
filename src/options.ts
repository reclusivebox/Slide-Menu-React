import type { MutableRefObject } from 'react';

type SlideMenuOptionsSchema = {
  showStateRef: MutableRefObject<boolean>;
  mainRef: MutableRefObject<null>;
  menuContainerRef: MutableRefObject<null>;
  animationDuration?: number;
  border?: 'top' | 'right' | 'bottom' | 'left';
  zIndex?: number,
  visibleArea?: string,
};

const defaultValues: {
  animationDuration: number,
  border: 'top' | 'right' | 'bottom' | 'left',
  zIndex: number,
  visibleArea: string,
} = {
  animationDuration: 250,
  border: 'left',
  zIndex: 2000,
  visibleArea: '0px',
};

export default class SlideMenuOptions {
  public readonly showStateRef: MutableRefObject<boolean>;

  public readonly mainRef: MutableRefObject<null>;

  public readonly menuContainerRef: MutableRefObject<null>;

  public readonly animationDuration: number;

  public readonly border: 'top' | 'right' | 'bottom' | 'left';

  public readonly zIndex: number;

  public readonly visibleArea: string;

  constructor(optionsObject: SlideMenuOptionsSchema) {
    // Mandatory props
    this.showStateRef = optionsObject.showStateRef;
    this.mainRef = optionsObject.mainRef;
    this.menuContainerRef = optionsObject.menuContainerRef;

    // Optional props
    this.animationDuration = optionsObject.animationDuration ?? defaultValues.animationDuration;
    this.border = optionsObject.border ?? defaultValues.border;
    this.zIndex = optionsObject.zIndex ?? defaultValues.zIndex;
    this.visibleArea = optionsObject.visibleArea ?? defaultValues.visibleArea;
  }

  get cssProps() {
    return {
      '--slide-menu-z-index': this.zIndex,
      '--slide-menu-visible-area': this.visibleArea,
      '--shifting-transformation': this.getShiftingTransformation(),
      '--initial-y-position': this.getInitialYPosition(),
      '--initial-x-position': this.getInitialXPosition(),
      ...this.getSensibleAreaPosition(),
      // '--sensible-area-position': this.getSensibleAreaXPosition(),
      // '--sensible-area-y-position': this.getSensibleAreaYPosition(),
    };
  }

  private getShiftingTransformation() {
    if (this.border === 'right') {
      return 'translateX(100%)';
    }
    return 'translateX(-100%)';
  }

  private getSensibleAreaPosition() {
    if (this.border === 'left') {
      // return '0px 0px 0px calc(100% - var(--slide-menu-sensible-area-offset))';
      return {
        '--sensible-area-top': 'unset',
        '--sensible-area-right': 'unset',
        '--sensible-area-bottom': 'unset',
        '--sensible-area-left': 'calc(100% - var(--slide-menu-sensible-area-offset))',
      };
    }

    if (this.border === 'right') {
      // return 'calc(-100% + var(--slide-menu-sensible-area-offset))';
      return {
        '--sensible-area-top': 'unset',
        '--sensible-area-right': 'calc(100% - var(--slide-menu-sensible-area-offset))',
        '--sensible-area-bottom': 'unset',
        '--sensible-area-left': 'unset',
      };
    }

    return {
      '--sensible-area-top': 'unset',
      '--sensible-area-right': 'unset',
      '--sensible-area-bottom': 'unset',
      '--sensible-area-left': 'calc(100% - var(--slide-menu-sensible-area-offset))',
    };
  }

  private getInitialXPosition() {
    if (this.border === 'right') {
      return '0px';
    }

    return 'none';
  }

  private getInitialYPosition() {
    if (this.border === 'bottom') {
      return '0px';
    }

    return 'none';
  }
}
