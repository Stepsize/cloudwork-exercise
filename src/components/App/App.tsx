import React, { PureComponent } from 'react';

import { WorkloadListContainer } from '../WorkloadList';
import { WorkloadFormContainer } from '../WorkloadForm';
import './App.css';


class App extends PureComponent {
  render() {
    return (
      <div className='app'>
        <h1>CloudWork</h1>
        <hr />
        <div className='workload-container m-t-5'>
            <div className='workload-list-container w-48'>
            <div className='card'>
              <h2>Workloads</h2>
              <WorkloadListContainer />
              </div>
          </div>
          <div className='workload-form-container w-48'>
          <div className='card'>
            <WorkloadFormContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
