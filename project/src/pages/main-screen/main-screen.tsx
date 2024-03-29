import React from 'react';
import FooterLogo from '../../components/footer-logo/footer-logo';
import {useEffect} from 'react';
import {resetFilters} from '../../store/filter-process/filter-process';
import {useAppDispatch} from '../../hooks';
import Promo from '../../components/promo/promo';
import FilmsWithFilters from '../../components/films-with-filters/films-with-filters';
import {fetchPromoFilmAction} from '../../store/api-actions';

function MainScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(resetFilters());
      dispatch(fetchPromoFilmAction());
    }

    return () => {
      isMounted = false;
    };

  }, [dispatch]);

  return (
    <React.Fragment>
      <Promo />
      <div className="page-content">

        <FilmsWithFilters />

        <footer className="page-footer">
          <FooterLogo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default MainScreen;
