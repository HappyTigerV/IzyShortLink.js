// https://github.com/HappyTigerV/readQuery.js V3.1 Gold //
Object.defineProperty(window.location, "queryString", { get() { let str_length = (window.location.protocol + "/\/" + window.location.host + window.location.pathname).length; let query_string = window.location.href.slice(str_length); if (query_string && query_string.slice(0, 1) == "?") { query_string = query_string.slice(1); } else query_string = ""; return query_string; }, set(v) { window.location.href = window.location.protocol + "/\/" + window.location.host + window.location.pathname + "?" + v; } }); Object.defineProperty(window.location, "query", { get() { let query_obj = {}; if (window.location.queryString) { let arr = window.location.queryString.split("&"); for (let i of arr) { query_obj[i.split("=")[0]] = i.split("=")[1]; } } return query_obj; }, set(v) { let queryString = ""; for (let i in v) { queryString += `&${i}=${v[i]}`; } queryString = queryString.slice(1, queryString.length); window.location.queryString = queryString; } });

// IzyShortLink.js //
class ShortLink {
    static Options = class ShortLinkOptions {
        /**@type {string} */
        link;

        /**@type {string} */
        redirect;

        /**@type {"query" | "hash"} */
        mode = "query";

        /**
         * 
         * @param {string} link 
         * @param {string} redirect 
         * @param {"query" | "hash"} mode
         */
        constructor(link, redirect, mode = "query") {
            this.link = link;
            this.redirect = redirect;
            this.mode = mode;
        }
    };

    static links = {};


    /**
     * 
     * @param {ShortLink.Options[]} opts 
     */
    static use(opts) {
        for (let i of opts) {
            ShortLink.links[(i.mode == "query" ? "?" : "#") + i.link] = i;
        }
    }


    static main() {
        if (window.location.queryString) {
            try {
                let k = ShortLink.links["?" + window.location.queryString];
                if (k) {
                    if (k.redirect) {
                        document.write(`Redirecting to <a href=${k.redirect}>${k.redirect}</a>`);
                        window.location.href =k.redirect;
                    }
                }
            } catch(e) {
                console.error(e);
            }
        }
        else {
            window.addEventListener("hashchange", () => {
                if (window.location.hash) {
                    try {
                        let k = ShortLink.links[window.location.hash];
                        window.location.hash = "";
                        if (k) {
                            if (k.redirect) {
                                document.write(`Redirecting to <a href=${k.redirect}>${k.redirect}</a>`);
                                window.location.href = k.redirect;
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            })
            
        }
    }
}

