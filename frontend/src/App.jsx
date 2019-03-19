import React, { Component } from 'react';
import { Routing } from './Routing';
import { ContextErrorProvider } from './contexts/ContextErrorProvider';
import { ContextRefreshProvider } from './contexts/ContextRefreshProvider';
import { ContextFiltersProvider } from './contexts/ContextFiltersProvider';
import { ContextUserProvider } from './contexts/ContextUserProvider';
import { CommErrors } from './components/CommErrors';
import './assets/scss/index.scss';

class App extends Component {
  render () {
    return (
      <ContextUserProvider>
        <ContextFiltersProvider>
          <ContextErrorProvider>
            <ContextRefreshProvider>
              <Routing/>
              <CommErrors/>
            </ContextRefreshProvider>
          </ContextErrorProvider>
        </ContextFiltersProvider>
      </ContextUserProvider>
    );
  }
}

export default App;
