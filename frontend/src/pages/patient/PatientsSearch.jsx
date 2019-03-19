import React, { useContext } from 'react';
import { Formik } from 'formik';
import { ContextFilters } from '../../contexts/ContextFiltersProvider';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';

export const PatientSearch = () => {
  const { setFilters } = useContext(ContextFilters);
  const { setRefresh, refresh } = useContext(ContextRefresh);

  return (
    <Formik
      initialValues={{ fullName: '', lastVisit: '' }}
      onSubmit={async (values) => {
        setFilters(values);

        setRefresh(!refresh);
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
        <form onSubmit={handleSubmit}>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-0">
                <div className="search">
                  <input
                    name="fullName"
                    type="text"
                    className="input-search"
                    placeholder="Wyszukaj pacjenta"
                    onChange={handleChange}
                    onBlur={handleSubmit}
                    value={values.fullName || ''}
                  />
                  <input
                    name="lastVisit"
                    onChange={handleChange}
                    className="input-search"
                    type="date"
                    value={values.lastVisit || ''}
                    onBlur={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
