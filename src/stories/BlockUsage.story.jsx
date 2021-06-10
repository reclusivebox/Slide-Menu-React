import React from 'react';
import SlideMenu from '../../dist/SlideMenu';

import './blockUsage.css';

export default {
  title: 'Block Usage',
  component: SlideMenu,
};

export function horizontalSizing() {
  return (
    <SlideMenu
      style={{
        width: '30vw',
        overflow: 'auto',
      }}
    >
      <div className="verticalScrollCreator" />
    </SlideMenu>
  );
}

export function verticalSizing() {
  return (
    <SlideMenu
      style={{
        height: '30vh',
        overflow: 'auto',
      }}
    >
      <div className="verticalScrollCreator" />
    </SlideMenu>
  );
}

export function BothAxisSizing() {
  return (
    <SlideMenu
      style={{
        height: '30vh',
        width: '30vw',
        overflow: 'auto',
      }}
    >
      <div className="verticalScrollCreator" />
    </SlideMenu>
  );
}
