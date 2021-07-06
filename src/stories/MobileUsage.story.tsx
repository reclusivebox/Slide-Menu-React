// eslint-disable-next-line no-use-before-define
import React from 'react';
import { SlideMenu } from 'slide-menu-react';

import './mobileUsage.css';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  title: 'Mobile Usage',
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

export function BasicStory() {
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

export function RightBorderMenu() {
  return (
    <>
      <div className="p-3">
        <h1>Menu from the right border</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the right border to show the menu.
        </p>
      </div>
      <SlideMenu border="right">
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function BottomBorderMenu() {
  return (
    <>
      <div className="p-3">
        <h1>Menu from the bottom border</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the bottom border to show the menu.
        </p>
      </div>
      <SlideMenu border="bottom">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function TopBorderMenu() {
  return (
    <>
      <div className="p-3">
        <h1>Menu from the top border</h1>
        {MobileTestsWarning}
        <p className="lead">
          Just a simple test, slide from the top border to show the menu.
        </p>
      </div>
      <SlideMenu border="top">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function TopAndBottomMenu() {
  return (
    <>
      <div className="p-3">
        <h1>Multiple menus: top and bottom</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test contains more than one menu. There are two: one hidden on
          the top border and another one hidden on the bottom border.
        </p>
      </div>
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
      <div className="p-3">
        <h1>Multiple menus: left and right</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test contains more than one menu. There are two: one hidden on
          the right border and another one hidden on the left border.
        </p>
      </div>
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
      <div className="p-3">
        <h1>Multiple menus: all directions</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test contains more than one menu. There are four, one for each
          border.
        </p>
      </div>
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

export function FullWidthMenu() {
  return (
    <>
      <div className="p-3">
        <h1>Full Width Menu</h1>
        {MobileTestsWarning}
        <p className="lead">
          In this test you can still activate the menu from the left border. But
          this time, it is full-width menu. Once opened, the menu has a 3rem
          sensible area before the right border. You can drag the menu from this
          area to close it.
        </p>
      </div>
      <SlideMenu sensibleArea="6rem" sensibleAreaOffset="3rem">
        <div className="verticalScrollCreator fullWidth" />
      </SlideMenu>
    </>
  );
}

export function FullHeightTopBorder() {
  return (
    <>
      <div className="p-3">
        <h1>Vertical Menu with full height</h1>
        {MobileTestsWarning}
        <p className="lead">
          Theres a single menu at the top of the screen, the purpose of this
          test is to show how a vertical menu behaves when it takes the full
          height of the viewport.
        </p>
      </div>
      <SlideMenu border="top">
        <div className="horizontalScrollCreator" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function BodyYScroll() {
  return (
    <>
      <div className="p-3">
        <h1>Menu Vertical Body Scroll</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test has an aditional element on the main body to generate a
          vertical scroll. The purpose of this test is to assess how the menu
          affects the main content scroll.
        </p>
      </div>
      <div className="verticalScrollCreator shiftRight" />
      <SlideMenu>
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function BodyXScroll() {
  return (
    <>
      <div className="p-3">
        <h1>Menu Horizontal Body Scroll</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test has an aditional element on the main body to generate a
          horizontal scroll. The purpose of this test is to assess how the menu
          affects the main content scroll.
        </p>
      </div>
      <div className="horizontalScrollCreator" />
      <SlideMenu>
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function CustomZIndex() {
  return (
    <>
      <div className="p-3">
        <h1>Menu with custom Z index</h1>
        {MobileTestsWarning}
        <p className="lead">
          The menu can be activated from the left border, this time the menu has
          a negative z-index. This test has an aditional element on the main
          body. The purpose of this test is to see if the menu can pass behind
          elements on the main body.
        </p>
      </div>
      <SlideMenu zIndex={0}>
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function TenPercentVisibleArea() {
  return (
    <>
      <div className="p-3 ms-5">
        <h1>Menu with visible area</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test features a menu with a visible area, you can drag the
          visible area to show the complete menu.
        </p>
      </div>
      <SlideMenu
        visibleArea="10vw"
        sensibleArea="10vw"
        sensibleAreaOffset="10vw"
      >
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function BottomBorderWithVisibleArea() {
  return (
    <>
      <div className="p-3">
        <h1>Menu with visible area: Bottom version</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test features a menu with a visible area, you can drag the
          visible area to show the complete menu.
        </p>
      </div>
      <SlideMenu visibleArea="4rem" border="bottom">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function RightBorderWithVisibleArea() {
  return (
    <>
      <div className="p-3 me-5">
        <h1>Menu with visible area: Right version</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test features a menu with a visible area, you can drag the
          visible area to show the complete menu.
        </p>
      </div>
      <SlideMenu
        visibleArea="4rem"
        border="right"
        sensibleAreaOffset="2rem"
        sensibleArea="3rem"
      >
        <div className="horizontalScrollCreator" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function TopBorderWithVisibleArea() {
  return (
    <>
      <div style={{ height: '10vh' }} />
      <div className="p-3">
        <h1>Menu with visible area: Top version</h1>
        {MobileTestsWarning}
        <p className="lead">
          This test features a menu with a visible area, you can drag the
          visible area to show the complete menu.
        </p>
      </div>
      <SlideMenu visibleArea="4rem" border="top">
        <div className="horizontalScrollCreator" />
      </SlideMenu>
    </>
  );
}
