// eslint-disable-next-line no-use-before-define
import React from 'react';
import SlideMenu from '../../dist/SlideMenu';

import './testStyle.css';

export default {
  title: 'Basic Usage',
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
      <div className="verticalScrollCreator" />
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
