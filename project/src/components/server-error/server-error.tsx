import './server-error.css';

function ServerError(): JSX.Element {
  return (
    <div className="server-error">
      <div className="server-error__message">
        <h1><b>Server not available</b><br /><small>Please, try again later</small></h1>
      </div>
    </div>
  );
}

export default ServerError;
