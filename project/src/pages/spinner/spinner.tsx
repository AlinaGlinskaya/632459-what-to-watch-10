import { Fragment } from 'react';
import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <Fragment>
      <h1 className="visually-hidden">Spinner</h1>
      <div className="lds-spinner">
        <div className="lds-spinner__el"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </Fragment>
  );
}

export default Spinner;
