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

const open = () => {
  console.log('Open Order Event fired');
  document.body.dispatchEvent(new ShowMenuOrderEvent());
};
const close = () => {
  console.log('Hide Order Event fired');
  document.body.dispatchEvent(new HideMenuOrderEvent());
};

export function EventCicleLog() {
  return (
    <>
      <SlideMenu
        onHideStart={() => console.log('hideStart event fired')}
        onHideEnd={() => console.log('hideEnd event fired')}
        onShowStart={() => console.log('showStart event fired')}
        onShowEnd={() => console.log('showEnd event fired')}
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
          <Button primary onClick={close}>Close</Button>
        </div>
      </SlideMenu>
      <div className="centerContents">
        <Button primary onClick={open}>Open</Button>
      </div>
    </Grommet>
  );
}
