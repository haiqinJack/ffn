module.exports = {
  apps : [{
    name      : 'app',
    script    : 'app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '111.230.201.47',
      ref  : 'origin/master',
      repo : 'git@github.com:haiqinJack/ffn.git',
      path : '/home/ffn/production',
      ssh_options: "StrictHostKeyChecking=no",
      'post-deploy' : 'npm i && npm run build && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }      
    }
  }
};
