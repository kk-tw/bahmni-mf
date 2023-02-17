/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getData(url: string, options?: Request) {
    const response = await fetch(url, options);
    return response.json();
}

export async function postData(url: string, data: any, options?: Request) {
    const response = await fetch(url, {
        ...options,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
