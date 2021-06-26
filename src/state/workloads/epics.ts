import { combineEpics, Epic } from 'redux-observable';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import {WorkloadService} from './services'; 

export const workloadService = new WorkloadService();

type AppEpic = Epic<RootAction, RootAction, RootState>;

const submitWorkloadEpic: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    switchMap(({payload}) => from(workloadService.create(payload)).pipe(
      map(res=>workloadsActions.created(res)),
    ))
    ))

const cancelWorkloadEpic: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    switchMap(({payload}) => from(workloadService.cancel(payload)).pipe(
      map(res=>workloadsActions.updateStatus(res)),
    ))
  ))    
    
export const epics = combineEpics(
  submitWorkloadEpic,
  cancelWorkloadEpic
);

export default epics;
