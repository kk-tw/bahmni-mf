import getCookie, { setCookie } from './helpers';

const location = getCookie('bahmni.user.location');
const user = getCookie('bahmni.user');

if (!location) {
    setCookie(
        'bahmni.user.location',
        JSON.stringify({
            name: 'General Ward',
            uuid: 'baf7bd38-d225-11e4-9c67-080027b662ec',
        }),
    );
}

if (!user) {
    setCookie('bahmni.user', encodeURIComponent('"superman"'));
}
