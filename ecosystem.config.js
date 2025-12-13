module.exports = {
    apps: [
        {
            name: "vipul-motors-admin",

            script: "node_modules/next/dist/bin/next",
            args: "start -p 3001 -H 127.0.0.1",
            // cwd: "/home/ubuntu/vipul-motors/vipul-motors-admin-panel",
            cwd: "/home/ubuntu/vipul-motors-admin-panel",

            watch: false,
            autorestart: true,
            max_memory_restart: "400M",

            env: {
                NODE_ENV: "production",
                PORT: 3001,
                HOST: "127.0.0.1"
            },

            exec_mode: "fork",
            instances: 1,
            kill_timeout: 5000,
            time: true
        }
    ]
};