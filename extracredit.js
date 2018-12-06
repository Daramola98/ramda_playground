const R = require('ramda');
const fs = require('fs');
const terminalImage = require('terminal-image');
const got = require('got');

const flickrDataDog = JSON.parse(fs.readFileSync('dogs.json', 'utf8'));

// Returns the array of objects in the item property
const flickrImageData = R.compose(
    R.prop('items'),
);

// Returns the array of objects with the media property
const getMediaValues = R.compose(R.map(R.prop('media')) ,flickrImageData);

const getMediaInIndex = index => (flickrData) => R.nth(index, getMediaValues(flickrData)).m;

const checkUserInput = (userInput) => {
    if(parseInt(userInput) < 0 || parseInt(userInput) > 19){
        console.log("You have entered an Invalid Number please enter a number between 0 - 19");
        return false;
    }
    return true;
}

const printDog = async (userInput) => {
	const { body } = await got(getMediaInIndex(userInput)(flickrDataDog), {encoding: null});
	console.log(await terminalImage.buffer(body));
}

if(checkUserInput(process.argv[2])){
    printDog(process.argv[2]);
}