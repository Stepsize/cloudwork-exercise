import React, {useEffect} from 'react';
import TimeAgo from 'react-timeago';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootAction } from '../../state';

import { Status } from '../../state/workloads';
import {workloadService} from '../../state/workloads/epics';
import { updateStatus } from '../../state/workloads/actions';

interface WorkloadItemDispatchProps {
  updateWorkloadStatus: (id:number, status:Status) => void;
}

export interface WorkloadItemStateProps {
  id: number;
  complexity: number;
  status: Status;
  completeDate: Date;
}

export interface WorkloadItemMethodProps {
  onCancel: () => void;
}

export interface WorkloadItemProps extends 
  WorkloadItemStateProps,
  WorkloadItemMethodProps,
  WorkloadItemDispatchProps {}


const WorkloadItem: React.SFC<WorkloadItemProps> = (props) => {
  useEffect(()=>{
    const {completeDate, id, updateWorkloadStatus} = props;
    const completedTime =  completeDate.getTime();
    const checkStatus = async ()=>{
      clearInterval(interval);
      const res = await workloadService.checkStatus({id});
      updateWorkloadStatus(id, res.status)

    }
    const interval = setInterval(()=>{
      const currentTime = new Date().getTime();
      if(currentTime>=completedTime){
        checkStatus();
      };

    },1000);

    return ()=>{
      clearInterval(interval)
    }
    
  },[])

  return(
  <div className="WorkloadItem">
    <div>
      <h3 className="WorkloadItem-heading">Workload #{props.id}</h3>
      <span className="WorkloadItem-subHeading">Complexity: {props.complexity}</span>
    </div>
    <div>
      {props.status === 'WORKING'
        ? (
          <>
            <span><TimeAgo date={props.completeDate} /></span>
            <button 
              className="WorkloadItem-secondaryButton" 
              onClick={props.onCancel}
            >
              Cancel
            </button>
          </>
        )
        : (
          <span className="WorkloadItem-statusText">{props.status.toLowerCase()}</span>
        )
      }
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): WorkloadItemDispatchProps => ({
  updateWorkloadStatus: (id: number, status:Status) => dispatch(updateStatus({ id, status })),
}) 

const WorkloadItemContainer = connect(null, mapDispatchToProps)(WorkloadItem);

export { 
  WorkloadItem,
  WorkloadItemContainer
};

export default WorkloadItem;