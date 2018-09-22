/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 10:41
 * @copyright: Niklas Kappler, 2018.
 */
import * as types from '../actions/actionTypes';
import axios from 'axios';

const protocol = types.IFTTT_API_HTTPS ?  'https://': 'http://';
const port = types.IFTTT_API_PORT ? ':'+ types.IFTTT_API_PORT: '';
const apiUrl = protocol + types.IFTTT_API_URL + port + types.IFTTT_API_PEFIX;

export default axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});