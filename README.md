# DataOcean

### For development
* clone repo to local
* go to project root directory
* create `.env.local` file
* override `.env` variables in `.env.local` for your environment
* run `npm install`
* run `npm start`
* start hacking

> :warning: **Before "git push" run `npm run lint` and make sure there are no errors**

### Commands
* `npm start` - Runs the app in the development mode.
* `npm run build` - Builds the app for production to the `build` folder.
* `npm run lint` - Linting code. Check for errors and warnings.
* `npm run fix` - Linting code and fix most errors. Output - unresolved errors.

### .env.local
* `REACT_APP_API_BASE_URL` - backend host name. For example: `https://ipa.dataocean.us`

## Deploy manual
_I recommend using **github deploy keys**_

##### Install node.js
```shell script
sudo apt update
sudo apt -y upgrade
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt -y install nodejs
sudo apt -y install gcc g++ make

# check installation
node --version
npm --version
```

##### Clone project and install node packages
```shell script
git clone git@github.com:3v-workspace/DataOcean.git
cd DataOcean
npm install
```

##### Nginx configs
```
server {

    server_name <here_domain_name>;

    root /<path_to_project>/DataOcean/build;

    index index.html;

    location / {
        try_files $uri /index.html = 404;
    }
}
```

##### Upgrade
For upgrade you need run only [upgrade.sh](upgrade.sh)
```
sh upgrade.sh
```

##### For test
* Platform: https://dataocean-dp.ml/
* Landing page: https://dataocean.ml/
