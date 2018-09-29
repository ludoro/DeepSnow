/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 10:39
 * @copyright: Niklas Kappler, 2018.
 */
import * as types from '../actions/actionTypes';

var initialState = {toggle: true, data: [], isLoading: false, error: null};

export default function (state = initialState, action) {
    switch (action.type) {
        // case types.SEND_IMAGE_REQUEST:
        //     return {
        //         isLoading: true,
        //         error: null,
        //         data: [],
        //         toggle: action.payload.toggle
        //     };
        // case types.SEND_IMAGE_SUCCESS:
        //     return {
        //         isLoading: false,
        //         error: null,
        //         data: action.payload,
        //         toggle: action.payload.toggle
        //     };
        // case types.SEND_IMAGE_FAIL:
        //     return {
        //         isLoading: false,
        //         error: action.payload,
        //         data: [],
        //         toggle: action.payload.toggle
        //     };
        case types.TOGGLE_LAYER:
            return{
                isLoading: false,
                error: null,
                data: [],
                toggle: action.payload
            };
        default:
            return state;
    }
}
