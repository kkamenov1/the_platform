import React from 'react';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  ClearRefinements,
  SearchBox,
  Pagination,
  Configure,
} from 'react-instantsearch-dom';
import { makeStyles } from '@material-ui/core/styles';
import CustomHits from './hits';

const useStyles = makeStyles((theme) => ({
  hitsContainer: {
    width: 840,
    padding: 24,
    backgroundColor: theme.palette.common.white,
  },

  map: {
    width: 'calc(100% - 840px)',
    position: 'fixed',
    top: 80,
    right: 0,
  },
}));

const WrapWithHits = ({ children }) => {
  const classes = useStyles();
  const searchClient = algoliasearch(
    'K50KABYMX9',
    'b21248284e21ea5c231e9ed63ea2ce19',
  );

  const searchParameters = {
    hitsPerPage: 3,
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="users">
      <Configure {...searchParameters} />
      <div>
        <SearchBox
          translations={{
            placeholder: 'Search...',
          }}
        />
        {/* <ClearRefinements translations={{ reset: 'Clear all filters' }} /> */}
        <div className={classes.hitsContainer}>
          <CustomHits />
          <Pagination showLast />
        </div>
        <div className={classes.map}>{children}</div>
      </div>
    </InstantSearch>
  );
};

export default WrapWithHits;
