import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="lds-spinner">
      <div className="lds-spinner__el"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default Spinner;
