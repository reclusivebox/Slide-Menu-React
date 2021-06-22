import type { MutableRefObject } from 'react';

type SlideMenuOptionsSchema = {
  showStateRef: MutableRefObject<boolean>;
  mainRef: MutableRefObject<null>;
  menuContainerRef: MutableRefObject<null>;
  animationDuration?: number;
  border?: 'top' | 'right' | 'bottom' | 'left';
  zIndex?: number,
  visibleArea?: string,
  sensibleArea?: string,
};

const defaultValues: {
  animationDuration: number,
  border: 'top' | 'right' | 'bottom' | 'left',
  zIndex: number,
  visibleArea: string,
  sensibleArea: string,
} = {
  animationDuration: 250,
  border: 'left',
  zIndex: 2000,
  visibleArea: '0px',
  sensibleArea: '4rem',
};

export default class SlideMenuOptions {
  public readonly showStateRef: MutableRefObject<boolean>;

  public readonly mainRef: MutableRefObject<null>;

  public readonly menuContainerRef: MutableRefObject<null>;

  public readonly animationDuration: number;

  public readonly border: 'top' | 'right' | 'bottom' | 'left';

  public readonly zIndex: number;

  public readonly visibleArea: string;

  public readonly sensibleArea: string;

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
    this.sensibleArea = optionsObject.sensibleArea ?? defaultValues.sensibleArea;
  }

  get cssProps() {
    return {
      '--slide-menu-z-index': this.zIndex,
      '--slide-menu-visible-area': this.visibleArea,
      '--shifting-transformation': this.getShiftingTransformation(),
      '--initial-y-position': this.getInitialYPosition(),
      '--initial-x-position': this.getInitialXPosition(),
      ...this.getSensibleAreaPosition(),
      ...this.getSensibleAreaDimensions(),
      // '--sensible-area-position': this.getSensibleAreaXPosition(),
      // '--sensible-area-y-position': this.getSensibleAreaYPosition(),
    };
  }

  private getShiftingTransformation() {
    if (this.border === 'right') {
      return 'translateX(100%)';
    }

    if (this.border === 'bottom') {
      return 'translateY(100%)';
    }

    if (this.border === 'top') {
      return 'translateY(-100%)';
    }

    return 'translateX(-100%)';
  }

  private getSensibleAreaDimensions() {
    if (this.border === 'left' || this.border === 'right') {
      return {
        '--slide-menu-sensible-area-width': this.sensibleArea,
        '--slide-menu-sensible-area-height': '100%',
      };
    }

    return {
      '--slide-menu-sensible-area-width': '100%',
      '--slide-menu-sensible-area-height': this.sensibleArea,
    };
  }

  private getSensibleAreaPosition() {
    if (this.border === 'left') {
      return {
        '--sensible-area-left': 'calc(100% - var(--slide-menu-sensible-area-offset))',
      };
    }

    if (this.border === 'right') {
      return {
        '--sensible-area-right': 'calc(100% - var(--slide-menu-sensible-area-offset))',
      };
    }

    if (this.border === 'bottom') {
      return {
        '--sensible-area-top': 'calc(var(--slide-menu-sensible-area-offset) - var(--slide-menu-sensible-area-height))',
      };
    }

    if (this.border === 'top') {
      return {
        '--sensible-area-bottom': 'calc(var(--slide-menu-sensible-area-offset) - var(--slide-menu-sensible-area-height))',
      };
    }

    return {
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
