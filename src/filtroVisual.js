import React from "react";
import { connect } from "react-redux";
import cx from "classnames";

const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
};

const TEXTO_FILTROS = {
  ALL: "Todas",
  COMPLETED: "Completas",
  INCOMPLETE: "Incompletas"
}

const setFilter = filter => ({ type: 'SET_FILTER', payload: { filter } });

const FiltrosVisuales = ({ activeFilter, setFilter }) => {
  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              "btn-filtro",
              currentFilter === activeFilter && "btn-filtro-activo"
            )}
            onClick={() => {
              setFilter(currentFilter);
            }}
          >
            {TEXTO_FILTROS[filterKey]}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};

export default connect(
  mapStateToProps,
  { setFilter }
)(FiltrosVisuales);
