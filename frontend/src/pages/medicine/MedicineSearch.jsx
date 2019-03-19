import React, { useContext } from 'react';
import { Formik } from 'formik';
import { ContextFilters } from '../../contexts/ContextFiltersProvider';
import { ContextRefresh } from '../../contexts/ContextRefreshProvider';

export const MedicineSearch = () => {
  const { setFilters } = useContext(ContextFilters);
  const { setRefresh, refresh } = useContext(ContextRefresh);

  return (
    <Formik
      initialValues={{ medicineName: '' }}
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
                    name="medicineName"
                    type="text"
                    className="input-search"
                    placeholder="Wyszukaj lekakarstwo"
                    onChange={handleChange}
                    onBlur={handleSubmit}
                    value={values.medicineName || ''}
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
