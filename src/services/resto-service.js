export default class RestoService {
    _apiBase = 'http://localhost:3000';

    //get

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }
    async getMenuItems() {
        return await this.getResource('/menu/');
    }

    // set 
    async setResource(url, method, body) {
        const res = await fetch(`${this._apiBase}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    async setOrder(newOrder) {
        return await this.setResource("/order/", "POST", newOrder);
    }
}