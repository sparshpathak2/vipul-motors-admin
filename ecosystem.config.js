module.exports = {
    apps: [
        {
            name: "vipul-motors-admin",
            script: "node_modules/next/dist/bin/next",
            args: "start -p 3001",
            cwd: "/home/ubuntu/vipul-motors/vipul-motors-admin-panel",
            env: {
                NODE_ENV: "production"
            }
        },
    ]
};