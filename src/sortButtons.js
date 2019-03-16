import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

// Action a emitir en caso de presionado un boton
// de ordenacion enviando los parametros de ordenacion.
const setSorter = sorter => ({
  type: 'ORDER_DIRECTION',
  payload: {
    by: sorter.by,
    direction: sorter.direction
  }
});

// Utilizo este componente para crear los botones
// solicitados como criterios de ordenamiento
// Al hacer click una vez los ordena por el criterio
// Los siguientes clicks solo reversan este orden.
const SortButtons = ({sorter, setSorter}) => {
  return (
    <div className='sort-buttons'>
      <span
        className={cx(
          'btn-filtro',
          sorter.by === 'Ruta' && 'btn-filtro-activo'
        )}
        onClick={() => {
          if (sorter.direction === 'ASC') {
            setSorter({ by: 'Ruta', direction: 'DESC'});
          }
          if (sorter.direction === 'DESC') {
            setSorter({ by: 'Ruta', direction: 'ASC'});
          }
        }}
      >
      Ruta ↑ ↓
      </span>
      <span
        className={cx(
          'btn-filtro',
          sorter.by === 'Slot' && 'btn-filtro-activo'
        )}
        onClick={() => {
          if (sorter.direction === 'ASC') {
            setSorter({ by: 'Slot', direction: 'DESC'});
          }
          if (sorter.direction === 'DESC') {
            setSorter({ by: 'Slot', direction: 'ASC'});
          }
        }}
      >
      Slot ↑ ↓
      </span>
      <span
        className={cx(
          'btn-filtro',
          sorter.by === 'Alistado' && 'btn-filtro-activo'
        )}
        onClick={() => {
          if (sorter.direction === 'ASC') {
            setSorter({ by: 'Alistado', direction: 'DESC'});
          }
          if (sorter.direction === 'DESC') {
            setSorter({ by: 'Alistado', direction: 'ASC'});
          }
        }}
      >
      Alistado ↑ ↓
      </span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sorter: state.sorter
  };
}

export default connect(
  mapStateToProps,
  { setSorter }
)(SortButtons);