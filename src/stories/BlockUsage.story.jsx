// eslint-disable-next-line no-use-before-define
import React from 'react';
import { SlideMenu } from '../../dist/SlideMenu';

import './blockUsage.css';

export default {
  title: 'Block Usage',
  component: SlideMenu,
};

const desktopAlert = (
  <>
    <div className="alert alert-danger m-4">
      This is a test for the desktop version of the component, please
      disconsider it if you are using the mobile version.
    </div>
  </>
);

export function horizontalSizing() {
  return (
    <>
      <div className="p-3">
        <h1>Horizontal sizing</h1>
        {desktopAlert}
        <p className="lead">
          A test to see how the block version of the component behaves when it
          is forced to create a horizontal scroll.
        </p>
      </div>
      <SlideMenu
        style={{
          width: '30vw',
          overflow: 'auto',
        }}
      >
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function verticalSizing() {
  return (
    <>
      <div className="p-3">
        <h1>Vertical sizing</h1>
        {desktopAlert}
        <p className="lead">
          A test to see how the block version of the component behaves when it
          is forced to create a vertical scroll.
        </p>
      </div>
      <SlideMenu
        style={{
          height: '30vh',
          overflow: 'auto',
        }}
      >
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function BothAxisSizing() {
  return (
    <>
      <div className="p-3">
        <h1>Both axis sizing</h1>
        {desktopAlert}
        <p className="lead">
          A test to see how the block version of the component behaves when it
          is forced to create a scroll in both axis.
        </p>
      </div>
      <SlideMenu
        style={{
          height: '30vh',
          width: '30vw',
          overflow: 'auto',
        }}
      >
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}
