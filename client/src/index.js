console.log('hi');

const button = document.createElement('button');

button.innerText = 'Click me';
button.onclick = () => {
  //System is a global variable inside of JS and is part of the es2015 module spec.
  //If the module that we are importing as dependancies, or imports, itself, then those would also get imported and sent back from the server.
  //This is an async call that returns a promise.
  System.import('./image_viewer').then(module => {
    //After the http request is competed. The default method on the module object is executed, which then renders the image to the screen.
    module.default();
  });
};

document.body.appendChild(button);
