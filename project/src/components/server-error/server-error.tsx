function ServerError(): JSX.Element {
  return (
    <div className="sign-in user-page__content" style={{display: 'flex', alignItems: 'center'}}>
      <div style={{margin: '0 auto'}}>
        <h1><b>Server not available</b><br /><small style={{marginTop: '30px', display: 'block'}}>Please, try again later</small></h1>
      </div>
    </div>
  );
}

export default ServerError;
