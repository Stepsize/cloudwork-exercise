import { ActionType, getType } from 'typesafe-actions';

import { Status } from './types';
import * as workloadActions from './actions';


export type WorkloadsAction = ActionType<typeof workloadActions>


interface WorkloadEntry<Id extends number> {
  id: Id;
  complexity: number;
  completeDate: Date;
  status: Status;
}

export type WorkloadsState = {
  [Id in number]: WorkloadEntry<Id>;
};
  

const initialState: WorkloadsState = {};

export const workloadReducer = (state: WorkloadsState = initialState, action: WorkloadsAction): WorkloadsState => {
  switch (action.type) {

    case getType(workloadActions.created):
      return { 
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          complexity: action.payload.complexity,
          completeDate: action.payload.completeDate,
          status: action.payload.status,
        },
      };
      
      case getType(workloadActions.updateStatus):
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            status: action.payload.status,
          },
        }

      default:
        return state;
  }
}
