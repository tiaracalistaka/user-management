import { auth } from "../../auth/auth"

export default defineEventHandler((event) => {
    return auth.handler(toWebRequest(event));
});