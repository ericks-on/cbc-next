module.exports = {
  apps: [{
    name: 'cbc-next-app',
    script: 'npm',
    args: 'start',
    cwd: '/home/kamitu/cbc-next',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3010,  
      HOST: '0.0.0.0'
    }
  }]
};
