// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { SlideMenu, ShowMenuOrderEvent, HideMenuOrderEvent } from '../../dist/SlideMenu';
import { Button, Grommet } from 'grommet';

import './mobileUsage.css';
import './events.css';

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
    <Grommet plain>
      <SlideMenu>
        <div className="centerContents">
          <Button primary onClick={close()}>Close</Button>
        </div>
      </SlideMenu>
      <div className="centerContents">
        <Button primary onClick={open()}>Open</Button>
      </div>
    </Grommet>
  );
}

export function OrderWithIds() {
  return (
    <Grommet plain>
      <SlideMenu id="correctMenu">
        <div className="centerContents">
          <Button primary onClick={close('correctMenu')}>Close correct menu</Button>
          <Button primary onClick={close('wrongMenu')}>Close wrong menu</Button>
          <Button primary onClick={close()}>Close any menu</Button>
        </div>
      </SlideMenu>
      <div className="centerContents">
        <Button primary onClick={open('correctMenu')}>Open correct menu</Button>
        <Button primary onClick={open('wrongMenu')}>Open wrong menu</Button>
        <Button primary onClick={open()}>Open any menu</Button>
      </div>
    </Grommet>
  );
}
