## Login system Node.js and Passport
This is an application that has a login and registretion system using Passport and other packages

## Instalation

Clone this repository
```bash
git clone 
```

Install the packages
```bash
npm install 
```
Put your mongoDB connect URI in the `keys.example.js` file located in the `config` folder

```javascript
// config/keys.example.js file
module.exports = {
	MongoURI: 'mongodb connect URI '
}
```
Then rename the `keys.example.js` file to `keys.js`

### Run the application
```bash
npm run start
```

### Run the application in development mode
```bash
npm run dev
```

I built this application following the  [TraversyMedia](https://github.com/bradtraversy) tutorial. 