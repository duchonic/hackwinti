IDE:
* install visual code
* install nodejs
package manager:

```
sudo npm -g install expo-cli
```
npm project dependencies, call from project folder

```
npm install
```

within the project folder


```
sudo sysctl -w fs.inotify.max_user_watches=100000
```

* edit package.json line 8: adjust --host ip address to your computers ip address
* edit shared/baseUrl.js: insert the same ip address

```
npm run startJsonServer
```
will start a dummy server to serve json data


```
npm start
```

With Expo tools, services, and React Native,
you can build, deploy, and quickly iterate on
native iOS and Android apps from the same
JavaScript codebase.
