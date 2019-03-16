import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { onlyUnique } from './redux/selectors';

const setFilter = filter => ({ type: 'FILTER_REGION', payload: { filter } });

const FiltroRegion = ({ filterRegion, regiones, setFilter }) => {
  let regionUniq = regiones.filter(onlyUnique)
  // Ingreso el boton de Todas
  regionUniq.unshift('All')
  return (
    <div className='visibility-filters'>Region:
      {regionUniq.map(filterKey => {
        return (
          <span
            key={`visibility-filter-${filterKey}`}
            className={cx(
              'btn-filtro',
              filterKey === filterRegion && 'btn-filtro-activo'
            )}
            onClick={() => {
              setFilter(filterKey);
            }}
          >
            {filterKey}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filterRegion: state.filterRegion,
    regiones: ownProps.regiones
  };
};

export default connect(
  mapStateToProps,
  { setFilter }
)(FiltroRegion);
