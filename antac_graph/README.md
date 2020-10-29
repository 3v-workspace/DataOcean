# PEP-Company relations schema
Connect the css and js files
```html
<link rel="stylesheet" href="path/to/pep-graph-1.0.0.min.css">
<script src="path/to/pep-graph-1.0.0.min.js"></script>
```
Create root element for visualization
```html
<div id="root"></div>
```

In scripts create an instance of the `PepCompanyScheme` class
```javascript
const visualization = new PepCompanyScheme({
  rootElement: document.getElementById('root'),
  apiHost: 'https://some-dataocean-host',
  token: 'MThmM2Q1MTU1MTVlNGRkNjdkOTcyYTk2YmE5Njc2YjdmYWQzMj',
  // showSearch: false,
  // theme: 'antac',
  startNode: {
    type: 'pep',
    id: 22335,
    isIdFromAntac: true,
  },
});
```
Options
- `rootElement` - required; HTMLElement; visualization will be drawn here.
- `apiHost` - required; string:url;
- `token` - required; 
- `showSearch` - optional; boolean; default=`false`;
- `theme` - optional; `antac` or `data-ocean`; default=`antac`;
- `startNode` - optional; object; here we can specify the start node 
that will be loaded immediately after calling the `init()` method;
    - `startNode.type` - required; `pep` or `company`;
    - `startNode.id` - required; int;
    - `startNode.isIdFromAntac` - required; boolean; indicates that
    the ID that is specified is the ID from the AntAc database

Now we need to call the `init()` method in order
for the schema to be drawn inside the `rootElement`
```javascript
visualization.init();
```
You can also omit `options.startNode`
and load the object on the schema whenever you want:
```javascript
visualization.loadNodeById(22335, 'pep', true)
```

### Config file
You can omit `apiHost` and `token` in options and use config file.

Place the config file on your server, the file must be `*.json` extension. File structure:

/static/files/schemaConfigs.json
```json
{
  "token": "MThmM2Q1MTU1MTVlNGRkNjdkOTcyYTk2YmE5Njc2YjdmYWQzMj",
  "apiHost": "https://some-dataocean-host"
}
```
Now specify in the options that you need to use
the config file and specify the url from where the file with the settings will be loaded:
```js
const visualization = new PepCompanyScheme({
  rootElement: document.getElementById('root'),
  useConfigFile: true,
  configFileUrl: '/static/files/schemaConfigs.json', 
});
```
