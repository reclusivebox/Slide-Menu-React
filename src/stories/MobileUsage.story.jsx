// eslint-disable-next-line no-use-before-define
import React from 'react';
import { SlideMenu } from '../../dist/SlideMenu';

import './mobileUsage.css';

export default {
  title: 'Mobile Usage',
  component: SlideMenu,
};

export function BasicStory() {
  return (
    <>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function FullWidthMenu() {
  return (
    <>
      <SlideMenu>
        <div className="verticalScrollCreator fullWidth" />
      </SlideMenu>
    </>
  );
}

export function BodyYScroll() {
  return (
    <>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <div className="verticalScrollCreator shiftRight" />
    </>
  );
}

export function BodyXScroll() {
  return (
    <>
      <SlideMenu>
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <div className="horizontalScrollCreator" />
    </>
  );
}

export function NegativeZIndex() {
  return (
    <>
      <SlideMenu zIndex="-2000">
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <div className="horizontalScrollCreator" />
    </>
  );
}

export function TenPercentVisibleArea() {
  return (
    <>
      <SlideMenu visibleArea="10vw">
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function RightBorderMenu() {
  return (
    <>
      <SlideMenu border="right">
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function BottomBorderMenu() {
  return (
    <>
      <SlideMenu border="bottom">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function TopBorderMenu() {
  return (
    <>
      <SlideMenu border="top">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function TopAndBottomMenu() {
  return (
    <>
      <SlideMenu border="top">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
      <SlideMenu border="bottom">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function LeftAndRightMenu() {
  return (
    <>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <SlideMenu border="right">
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function FourDirectionsMenu() {
  return (
    <>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <SlideMenu border="right">
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <SlideMenu border="top">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
      <SlideMenu border="bottom">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function FullHeightTopBorder() {
  return (
    <>
      <SlideMenu border="top">
        <div className="horizontalScrollCreator" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function BottomBorderWithVisibleArea() {
  return (
    <>
      <SlideMenu visibleArea="4rem" border="bottom">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
      <div className="verticalScrollCreator" />
    </>
  );
}

export function RightBorderWithVisibleArea() {
  return (
    <>
      <SlideMenu visibleArea="4rem" border="right" sensibleAreaOffset="2rem" sensibleArea="3rem">
        <div className="horizontalScrollCreator" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <div className="verticalScrollCreator" />
    </>
  );
}

export function TopBorderWithVisibleArea() {
  return (
    <>
      <SlideMenu visibleArea="4rem" border="top">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
      <div className="verticalScrollCreator" />
    </>
  );
}
