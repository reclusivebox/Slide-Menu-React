// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Backdrop, SlideMenu } from '../../dist/SlideMenu';

import './mobileUsage.css';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  title: 'Mobile Usage with backdrop',
  component: Backdrop,
};

const MobileTestsWarning = (
  <>
    <div className="alert alert-danger m-2">
      This is a mobile test. If you are using a desktop, enable the mobile mode
      in the developer settings of your browser.
    </div>
  </>
);

export function BasicStory() {
  return (
    <>
      <Backdrop />
      <div className="p-3">
        <h1>Basic usage</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the left border to show the menu with the backdrop.
        </p>
      </div>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function twoMenus() {
  return (
    <>
      <Backdrop />
      <div className="p-3">
        <h1>Multiple menus: left and right</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test contains more than one menu. There are two: one hidden on
          the bottom border and another one hidden on the left border.
          This test is meant to test the multiple menu behavior of the component.
        </p>
      </div>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <SlideMenu border="bottom">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}
