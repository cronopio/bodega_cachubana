import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { onlyUnique } from './redux/selectors';

// Action a emitir en caso de escogida una region como filtro
const setFilter = filter => ({ type: 'FILTER_REGION', payload: { filter } });

// Utilizo este componente para generar los botones que 
// filtraran por region, usando las regiones que saco del estado
// Asi que automaticamente se va llenando a medida que aparezcan regiones
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
