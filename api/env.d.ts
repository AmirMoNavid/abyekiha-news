declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            HOST: string;
            LOCAL_CLIENT_APP: string;
            REMOTE_CLIENT_APP: string;
            LOCAL_SERVER_API: string;
            REMOTE_SERVER_API: string;

            ACCESS_TOKEN_SECRET: string;
            REFRESH_TOKEN_SECRET: string;
            VOTE_ID_TOKEN_SECRET: string;
            POLL_TOKEN_SECRET: string;

            DB_HOSTNAME: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_USER: string;
        }
    }
}

export { };