// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Backdrop, SlideMenu } from '../../dist/index';

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
          Just a simple test, slide from the left border to show the menu with
          the backdrop.
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
          the bottom border and another one hidden on the left border. This test
          is meant to test the multiple menu behavior of the component.
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

export function excludingAMenu() {
  return (
    <>
      <Backdrop exclude={['excluded']} />
      <div className="p-3">
        <h1>Multiple menus: left and right</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test contains more than one menu. There are two: one hidden on
          the bottom border and another one hidden on the left border. This test
          is meant to test the multiple menu behavior of the component, when one
          of the menus is explicitly excluded from the backdrop monitoring.
        </p>
      </div>
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
      <SlideMenu border="bottom" id="excluded">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function nestedMenus() {
  return (
    <>
      <div className="p-3">
        <h1>Basic usage</h1>
        {MobileTestsWarning}
        <p className="lead">Nested menu and backdrop.</p>
      </div>
      <div>
        <div>
          <div>
            <Backdrop />
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <SlideMenu>
              <div className="verticalScrollCreator" />
            </SlideMenu>
          </div>
        </div>
      </div>
    </>
  );
}

export function backropWithContent() {
  return (
    <>
      <Backdrop>
        <button
          onClick={() => {
            window.dispatchEvent(new Event('hideMenuOrder'));
          }}
          className="text-white btn btn-light-outline display-1"
          type="button"
        >
          X
        </button>
      </Backdrop>
      <div className="p-3">
        <h1>Basic usage</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the right border to show the menu with
          the backdrop.
        </p>
      </div>
      <SlideMenu border="right">
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function backropWithCloseOnTouch() {
  return (
    <>
      <Backdrop closeOnTouch />
      <div className="p-3">
        <h1>Basic usage</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the right border to show the menu with
          the backdrop.
        </p>
      </div>
      <SlideMenu border="right">
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}
