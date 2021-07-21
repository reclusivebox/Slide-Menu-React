// eslint-disable-next-line no-use-before-define
import React from 'react';
import { SlideMenu } from 'slide-menu-react';

import './mobileUsage.css';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  title: 'Breakpoints',
  component: SlideMenu,
};

const MobileTestsWarning = (
  <>
    <div className="alert alert-danger m-2">
      This is a mobile test. If you are using a desktop, enable the mobile mode
      in the developer settings of your browser.
    </div>
  </>
);

export function NoBreakpoint() {
  return (
    <>
      <div className="p-3">
        <h1>Basic usage</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the left border to show the menu.
        </p>
      </div>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function OnlyMd() {
  return (
    <>
      <div className="p-3">
        <h1>Basic usage</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the left border to show the menu.
        </p>
      </div>
      <SlideMenu customMediaQuery="screen and (min-width: 768px) and (max-width: 992px)">
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function MdAndUp() {
  return (
    <>
      <div className="p-3">
        <h1>Basic usage</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the left border to show the menu.
        </p>
      </div>
      <SlideMenu customMediaQuery="screen and (min-width: 768px)">
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}
