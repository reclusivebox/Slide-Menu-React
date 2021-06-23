// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { SlideMenu, ShowMenuOrderEvent, HideMenuOrderEvent } from '../../dist/SlideMenu';

import './mobileUsage.css';
import './events.css';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  title: 'Events',
  component: SlideMenu,
};

const open = (id) => {
  console.log('Open Order Event fired');
  return () => document.body.dispatchEvent(new ShowMenuOrderEvent(id));
};
const close = (id) => {
  console.log('Hide Order Event fired');
  return () => document.body.dispatchEvent(new HideMenuOrderEvent(id));
};

export function EventCycleLog() {
  return (
    <>
      <SlideMenu
        onShown={() => console.log('Menu Shown')}
        onHidden={() => console.log('Menu Hidden')}
      >
        <div className="horizontalSpacer" />
        <div className="verticalScrollCreator" />
      </SlideMenu>
    </>
  );
}

export function OrderEvents() {
  return (
    <>
      <SlideMenu>
        <div className="centerContents">
          <button className="btn btn-primary" type="button" onClick={() => close()}>Close</button>
        </div>
      </SlideMenu>
      <div className="centerContents">
        <button className="btn btn-primary" type="button" onClick={open()}>Open</button>
      </div>
    </>
  );
}

export function OrderWithIds() {
  return (
    <>
      <SlideMenu id="correctMenu">
        <div className="centerContents">
          <button className="btn btn-primary" type="button" onClick={close('correctMenu')}>Close correct menu</button>
          <button className="btn btn-primary" type="button" onClick={close('wrongMenu')}>Close wrong menu</button>
          <button className="btn btn-primary" type="button" onClick={close()}>Close any menu</button>
        </div>
      </SlideMenu>
      <div className="centerContents">
        <button className="btn btn-primary" type="button" onClick={open('correctMenu')}>Open correct menu</button>
        <button className="btn btn-primary" type="button" onClick={open('wrongMenu')}>Open wrong menu</button>
        <button className="btn btn-primary" type="button" onClick={open()}>Open any menu</button>
      </div>
    </>
  );
}
