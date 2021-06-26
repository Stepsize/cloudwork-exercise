import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootAction, RootState } from '../../state';
import { cancel } from '../../state/workloads/actions';
import { WorkloadItemContainer, WorkloadItemStateProps } from '../WorkloadItem';


export interface WorkloadListStateProps {
  workloads: WorkloadItemStateProps[];
}

export interface WorkloadListDispatchProps {
  cancelWorkload: (id: number) => void;
}

export interface WorkloadListProps extends 
  WorkloadListStateProps,
  WorkloadListDispatchProps {}


const WorkloadList: React.SFC<WorkloadListProps> = ({ workloads, cancelWorkload }) => (
  !workloads.length 
    ? (
      <span>No workloads to display</span>
    )
  : (
    <ol>
      {workloads.map((workload) => (
        <li key={workload.id}>
          <WorkloadItemContainer {...workload} onCancel={() => cancelWorkload(workload.id)} />
        </li>
      ))}
    </ol>
  )
);


const mapStateToProps = (state: RootState): WorkloadListStateProps => ({
  workloads: Object.values(state.workloads),
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): WorkloadListDispatchProps => ({
  cancelWorkload: (id: number) => dispatch(cancel({ id })),
}) 

const WorkloadListContainer = connect(mapStateToProps, mapDispatchToProps)(WorkloadList);


export {
  WorkloadList,
  WorkloadListContainer,
};

export default WorkloadList;
