// eslint-disable-next-line no-use-before-define
import React from 'react';
import SlideMenu from '../../dist/SlideMenu';

import './mobileUsage.css';

export default {
  title: 'Mobile Usage',
  component: SlideMenu,
};

export function BasicStory() {
  return (
    <>
      <SlideMenu>
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
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