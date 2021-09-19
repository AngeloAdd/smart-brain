import Clarifai from 'clarifai';

const clarifaiToken = '861d2ab2b7f24ca5b73345605a678a3d';
const clarifai = new Clarifai.App({
    apiKey: clarifaiToken
});



export default clarifai