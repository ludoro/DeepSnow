/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 10:31
 * @copyright: Niklas Kappler, 2018.
 */
import App from './containers/App/App'
import Imprint from './containers/Imprint/Imprint';

var indexRoutes = [
    { path: "/imprint", name: "Imprint", component: Imprint },
    { path: "/", name: "App", component: App },
];

export default indexRoutes;