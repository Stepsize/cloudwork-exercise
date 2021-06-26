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
        <div className='workload-container'>
          <div className='workload-list-container'>
          <h2>Workloads</h2>
          <WorkloadListContainer />
          </div>
          <div className='workload-form-container'>
          <WorkloadFormContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
