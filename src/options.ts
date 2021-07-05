import { v4 as UUID } from 'uuid';
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
  sensibleAreaOffset?: string,
  customMediaQuery?: string,
  id?: string,
};

const defaultValues: {
  animationDuration: number,
  border: 'top' | 'right' | 'bottom' | 'left',
  zIndex: number,
  visibleArea: string,
  sensibleArea: string,
  sensibleAreaOffset: string,
  customMediaQuery: string,
} = {
  animationDuration: 250,
  border: 'left',
  zIndex: 2000,
  visibleArea: '0px',
  sensibleArea: '4rem',
  sensibleAreaOffset: '1rem',
  customMediaQuery: 'screen and (max-width: 576px)',
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

  public readonly sensibleAreaOffset: string;

  public readonly customMediaQuery: string;

  public readonly id: string;

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
    this.sensibleAreaOffset = optionsObject.sensibleAreaOffset ?? defaultValues.sensibleAreaOffset;
    this.customMediaQuery = optionsObject.customMediaQuery ?? defaultValues.customMediaQuery;
    this.id = optionsObject.id ?? UUID();
  }

  get cssProps() {
    return {
      '--slide-menu-z-index': this.zIndex,
      '--slide-menu-visible-area': this.visibleArea,
      '--shifting-transformation': this.getShiftingTransformation(),
      '--slide-menu-sensible-area-offset': this.sensibleAreaOffset,
      ...this.getSensibleAreaPosition(),
      ...this.getSensibleAreaDimensions(),
      ...this.getInitialPosition(),
    };
  }

  private getShiftingTransformation() {
    if (this.border === 'right') {
      return 'translateX(calc(100% - var(--slide-menu-visible-area)))';
    }

    if (this.border === 'bottom') {
      return 'translateY(calc(100% - var(--slide-menu-visible-area)))';
    }

    if (this.border === 'top') {
      return 'translateY(calc(-100% + var(--slide-menu-visible-area)))';
    }

    return 'translateX(calc(-100% + var(--slide-menu-visible-area)))';
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

  private getInitialPosition() {
    if (this.border === 'right') {
      return {
        '--slide-menu-right-position': '0px',
        '--slide-menu-top-position': '0px',
      };
    }

    if (this.border === 'bottom') {
      return {
        '--slide-menu-bottom-position': '0px',
        '--slide-menu-left-position': '0px',
      };
    }

    return {
      '--slide-menu-top-position': '0px',
      '--slide-menu-left-position': '0px',
    };
  }
}
