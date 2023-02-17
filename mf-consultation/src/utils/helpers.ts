export const getCookie = (name: string) =>
    document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');

export const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}`;
};

export const getLocation = () => {
    const location = getCookie('bahmni.user.location');
    return JSON.parse(location);
};

export default getCookie;
