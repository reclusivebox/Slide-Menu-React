// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-use-before-define

import { SlideMenu, ShowMenuOrderEvent, HideMenuOrderEvent } from '../../dist/index';

import './mobileUsage.css';
import './events.css';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  title: 'Events',
  component: SlideMenu,
};

const open = (id?: string) => {
  console.log('Open Order Event fired');
  return () => document.body.dispatchEvent(ShowMenuOrderEvent(id));
};
const close = (id?: string) => {
  console.log('Hide Order Event fired');
  return () => document.body.dispatchEvent(HideMenuOrderEvent(id));
};

const MobileTestsWarning = (
  <>
    <div className="alert alert-danger m-2">
      This is a mobile test. If you are using a desktop, enable the mobile mode
      in the developer settings of your browser.
    </div>
  </>
);

export function EventCycleLog() {
  return (
    <>
      <div className="p-3">
        <h1>Logging the event cycle</h1>
        {MobileTestsWarning}
        <p className="lead">
          The menu itself fires two kinds of events:
          {' '}
          <code>slideMenuShown</code>
          {' '}
          and
          {' '}
          <code>slideMenuHidden</code>
          {' '}
          . This test adds a handler to each one of
          those events that prints a message on the browser&apos;s console when executed.
        </p>
      </div>
      <SlideMenu
        onShown={(event) => console.log(event.type)}
        onHidden={(event) => console.log(event.type)}
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
      <div className="p-3">
        <h1>Order Events</h1>
        {MobileTestsWarning}
        <p className="lead">
          Besides the events fired by the menu there are also the order events.
          These events can be fired by the user to control the menu&apos;s behavior.
          This test has two buttons:
          <p className="ms-2 my-2">
            A button called &quot;open&quot; that fires the
            {' '}
            <code>showMenuOrder</code>
            {' event.'}
          </p>
          <p className="ms-2 my-2">
            And a button called &quot;close&quot; inside the menu that fires the
            {' '}
            <code>hideMenuOrder</code>
            {' event.'}
          </p>
        </p>
      </div>
      <SlideMenu>
        <div className="centerContents vh-100 vw-100 bg-secondary">
          <button
            className="btn btn-primary"
            type="button"
            onClick={close()}
          >
            Close
          </button>
        </div>
      </SlideMenu>
      <div className="centerContents vw-100 mb-3">
        <button className="btn btn-primary" type="button" onClick={open()}>
          Open
        </button>
      </div>
    </>
  );
}

export function OrderWithIds() {
  return (
    <>
      <div className="p-3">
        <h1>Order Events with IDs</h1>
        {MobileTestsWarning}
        <p className="lead">
          The constructor for the order events supports one optional parmater:
          the id property of a menu.
          This is necessary when you have multiple menus in a single page.
          When no ID is provided, every menu on the page is activates/deactivated by the event.
          This test has six buttons divided in two groups: close buttons and open buttons.
          Every group has three members:
          A button with the correct ID of the menu,
          a button with a wrong a ID for the menu,
          and a button without any ID.
          Click around to see if the menu responds correctly for each button.
        </p>
      </div>
      <div className="centerContents h-50">
        <button
          className="btn btn-primary my-4"
          type="button"
          onClick={open('correctMenu')}
        >
          Open correct menu
        </button>
        <button
          className="btn btn-primary my-4"
          type="button"
          onClick={open('wrongMenu')}
        >
          Open wrong menu
        </button>
        <button className="btn btn-primary my-4" type="button" onClick={open()}>
          Open any menu
        </button>
      </div>
      <SlideMenu id="correctMenu">
        <div className="centerContents vw-100 vh-100 bg-secondary">
          <button
            className="btn btn-primary"
            type="button"
            onClick={close('correctMenu')}
          >
            Close correct menu
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={close('wrongMenu')}
          >
            Close wrong menu
          </button>
          <button className="btn btn-primary" type="button" onClick={close()}>
            Close any menu
          </button>
        </div>
      </SlideMenu>
    </>
  );
}
