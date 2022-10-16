class Api {
    private transQueries (q: Array<string>): String {
        let ret = "?";
        for(let i = 0; i < q.length; i++) {
            ret += q[i];
            if(i < q.length - 1) ret += "&";
        }
        return ret;
    };

    public json(method: string, url: string, params: Array<string>, queries: Array<string>): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(url+params+this.transQueries(queries), {
                method: method,
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
            })
            .then((res) => {
                res.json()
                .then((json) => {
                    // cas d'erreur à gérer
                    return resolve(json);
                })
                .catch((err) => {
                    console.error(err);
                    return reject();
                })
            })
            .catch((err) => {
                console.error(err)
                return reject();
            })
        })
    }
}

export default Api;


// – private HandleError
// – Request json
// – Request file
// – Header
