/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 10:39
 * @copyright: Niklas Kappler, 2018.
 */
import * as types from '../actions/actionTypes';

var initialState = {data: [], isLoading: false, error: null};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_GOT_HOUSES_REQUEST:
            return {
                isLoading: true,
                error: null,
                data: []
            };
        case types.FETCH_GOT_HOUSES_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.payload
            };
        case types.FETCH_GOT_HOUSES_FAIL:
            return {
                isLoading: false,
                error: action.payload,
                data: []
            };
        default:
            return state;
    }
}
