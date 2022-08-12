// @ts-nocheck
/**
 * Define App Locals & Configs
 *
 * @author Angel Angeles <aangeles@litystyles.com>
 */

class Locals {

    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    public static config(): any {
        const server_host = "52.70.36.16";
        //(
        //    window._env_ ?
        //        window._env_.REACT_APP_SERVER_HOST : (process.env.SERVER_HOST || "localhost"));

        const server_port = "3000"
        //(
        //    window._env_ ?
        //        window._env_.REACT_APP_SERVER_PORT : (process.env.REACT_APP_SERVER_PORT || 3000));

        const server_url = "http://" + server_host + ":" + server_port

        const a_tags_reg_exp = /(<a\s*(?!.*\bnofollow)[^>]*)(href="https?:\/\/)((?!(?:(?:www\.)?'.implode('|(?:www\.)?', $follow_list).'))[^"]+)"((?!.*\bnofollow)[^>]*)(?:[^>]*)>/g
        const follow_reg_exp = /rel=("|')dofollow("|')/g
        const no_follow_reg_exp = /rel=("|')nofollow("|')/g

        return {
            server_url,
            a_tags_reg_exp,
            follow_reg_exp,
            no_follow_reg_exp
        }
    }
}

export default Locals;