import Request from './requests';
import IIndicatorTest from '../models/IndicatorTest';
import { API_URL } from '../helpers/constants';

export const getIndicatorTests = (indicatorId: number) => Request({
    method: 'GET',
    url: `${API_URL}/trading/indicators/${indicatorId}/tests`
});

export const getIndicatorTest = (indicatorId: number, testId: number) => Request({
    method: 'GET',
    url: `${API_URL}/trading/indicators/${indicatorId}/tests/${testId}`
});

export const createIndicatorTest = (data: IIndicatorTest) => Request({
    method: 'POST',
    url: `${API_URL}/trading/indicators/${data.indicator_id}/tests`,
    data: data
});