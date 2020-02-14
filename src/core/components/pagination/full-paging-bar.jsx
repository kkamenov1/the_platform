import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  current: {
    display: 'inline-block',
    lineHeight: '18px',
    padding: '8px 16px',
    backgroundColor: '#eee',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '0 5px',
  },
  pageItem: {
    minWidth: '44px',
    margin: '0 5px',
  },
  separator: {
    padding: '8px 16px',
    margin: '0 5px',
  },
});

const generatePagingBarsArr = ({
  pageNumber,
  maxPage,
  visiblePages,
  separator,
}) => {
  const pageLinksFirstPage = { type: 'page', display: 1 };
  const pageLinksPrevDots = { type: 'separator', display: separator };
  const pageLinksNextDots = { type: 'separator', display: separator };
  const pageLinksLastPage = { type: 'page', display: maxPage };

  // Build flexible middle section with all page links by requirement
  const pageLinksMidArr = [];
  pageLinksMidArr.push(pageNumber); // Current page will always be displayed

  let loopDirectionHigh = true;
  let loopLow = pageNumber;
  let loopHigh = pageNumber;
  // While we need to add more pages and haven't reached BOTH ends 0 and maxPage
  while (
    pageLinksMidArr.length < visiblePages
    && (loopLow > 1 || loopHigh < maxPage)
  ) {
    if (loopDirectionHigh) {
      if (loopHigh < maxPage) {
        loopHigh += 1;
        pageLinksMidArr.push(loopHigh);
      }
      loopDirectionHigh = false;
    } else {
      if (loopLow > 1) {
        loopLow -= 1;
        pageLinksMidArr.push(loopLow);
      }
      loopDirectionHigh = true;
    }
  }
  pageLinksMidArr.sort((a, b) => a - b);

  // Coordinate edge cases
  if (pageNumber === 1) {
    pageLinksFirstPage.display = ''; // hidden
    pageLinksPrevDots.display = ''; // hidden
  }

  if (pageNumber === maxPage) {
    pageLinksNextDots.display = ''; // hidden
    pageLinksLastPage.display = ''; // hidden
  }

  // Hide unneccessary components, if needed
  if (maxPage > visiblePages) {
    if (loopLow === 1) {
      pageLinksFirstPage.display = ''; // hidden
      pageLinksPrevDots.display = ''; // hidden
    }
    if (loopLow >= 2) {
      pageLinksMidArr.shift(); // remove lowest element, will be replaced with "<< 1 ... "
    }

    if (loopHigh <= maxPage - 1) {
      pageLinksMidArr.pop(); // remove highest element, will be replaced with " ... MAX >>"
    }

    if (loopHigh === maxPage) {
      pageLinksNextDots.display = ''; // hidden
      pageLinksLastPage.display = ''; // hidden
    }
  } else {
    // few pages only, no need of separators
    pageLinksFirstPage.display = ''; // hidden
    pageLinksPrevDots.display = ''; // hidden
    pageLinksNextDots.display = ''; // hidden
    pageLinksLastPage.display = ''; // hidden
  }

  // Merge all components into final array to be processed in the markup
  const paginationLinksArr = [
    pageLinksFirstPage,
    pageLinksPrevDots,
  ];

  for (let i = 0; i < pageLinksMidArr.length; i += 1) {
    const pageObj = {
      type: 'page',
      display: pageLinksMidArr[i],
    };
    if (pageLinksMidArr[i] === pageNumber) {
      pageObj.type = 'currentpage';
    }
    paginationLinksArr.push(pageObj);
  }

  paginationLinksArr.push(pageLinksNextDots);
  paginationLinksArr.push(pageLinksLastPage);

  if (pageNumber === 1) {
    paginationLinksArr.shift();
  }

  if (pageNumber === maxPage) {
    paginationLinksArr.pop();
  }
  return paginationLinksArr;
};

const FullPagingBar = ({
  pageNumber,
  maxPage,
  visiblePages,
  onPageChange,
  separator,
  createURL,
}) => {
  const classes = useStyles();
  if (maxPage <= 1) {
    return <></>;
  }

  const pagingBarArr = generatePagingBarsArr({
    pageNumber,
    maxPage,
    visiblePages,
    onPageChange,
    separator,
  });

  const renderPaginationArray = () => pagingBarArr
    .filter((item) => item.display)
    .map((item, index) => {
      if (item.type === 'currentpage') {
        return (
          <span key={item.display} className={classes.current}>
            {item.display}
          </span>
        );
      }

      if (item.type === 'separator') {
        return (
          <span
            key={`${item.display}${index}`}
            className={classes.separator}
          >
            {item.display}
          </span>
        );
      }

      return (
        <Button
          key={item.display}
          href={createURL && createURL(item.display)}
          onClick={() => onPageChange(Number(item.display))}
          className={classes.pageItem}
        >
          {item.display}
        </Button>
      );
    });

  return (
    <>
      {pageNumber > 1 && (
        <Button
          color="primary"
          variant="contained"
          href={createURL && createURL(pageNumber - 1)}
          onClick={() => onPageChange(pageNumber - 1)}
        >
          PREV
        </Button>
      )}
      {renderPaginationArray()}
      {pageNumber < maxPage && (
        <Button
          color="primary"
          variant="contained"
          href={createURL && createURL(pageNumber + 1)}
          onClick={() => onPageChange(pageNumber + 1)}
        >
          NEXT
        </Button>
      )}
    </>
  );
};

FullPagingBar.defaultProps = {
  separator: '...',
};

FullPagingBar.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  visiblePages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  separator: PropTypes.string,
};

export default FullPagingBar;
