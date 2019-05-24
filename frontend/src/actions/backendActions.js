/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 23:49
 * @copyright: Niklas Kappler, 2018.
 */
import * as types from './actionTypes';
//import fetcher from '../api/backendApi';

// // Below was the nice way, but didn't work because nested calls
// export const sendImage = (image, coordinates) => {
//     return (dispatch) => {
//         dispatch(sendImageRequest());
//         return fetcher.post('/prediction', {
//             image: image,
//             coordinates: coordinates
//         })
//             .then((response) => {
//                 dispatch(sendImageSuccess(response.data));
//             }).catch((response) => {
//                 dispatch(sendImageFail(response.error))
//             });
//     }
// };

// export const sendImageRequest = () => {
//     return {
//         type: types.SEND_IMAGE_REQUEST,
//     }
// };

// export const sendImageSuccess = (res) => {
//     return {
//         type: types.SEND_IMAGE_SUCCESS,
//         payload: res
//     };
// };

// export const sendImageFail = (err) => {
//     return {
//         type: types.SEND_IMAGE_FAIL,
//         payload: err
//     };
// };

export const toggleLayer = (bool) => {
    return {
        type: types.TOGGLE_LAYER,
        payload: bool
    };
};

