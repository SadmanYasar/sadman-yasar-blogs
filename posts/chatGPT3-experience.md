---
title: 'Thoughts on ChatGPT/ how to make a JS object to .env variables converter in Svelte'
date: '2022-12-24'
---

So I just tried [ChatGPT](https://chat.openai.com/) and I was shocked! It was able to solve all the problems that I gave it, be it a C++ problem or even a full stack [React](https://reactjs.org/) project with [Firebase](https://firebase.google.com). No matter how tough the problems were for me, it was solving it right after I hit enter on my keyboard. Although I saw many being afraid of it taking our jobs in the future, I see it as a way to develop applications way faster than it is humanly possible, currently.

Whenever I face a problem that I cannot solve, I spend about 15-30 minutes to figure it out. If the problem still persists, I go to [Stackoverflow](https://stackoverflow.com/users/14602088/sadman-yasar-sayem) to find out the solution. This is a five step process - 1) Search on browser 2) Click on the stackoverflow link 3) Go through all the possible answers 4) Understand the code 5) Implement it on the codebase.

But imagine this: you can ask an AI system about the problem and it gives you not only a very accurate answer, but also a brief explanation behind it. This is a 2 step process. This is [ChatGPT](https://chat.openai.com/)!

As I was exploring this game changer, I was also learning about [Firebase Authentication integration with NextJS](https://github.com/SadmanYasar/react-auth-learn) by following [developedbyed's](https://www.youtube.com/@developedbyed) tutorial. During that time, I opened up Firebase console, created a new app and copied the credentials on the project. It is a good practice to store the credentials as environment variables. Thus, I began to copy each field on the .env file.

Suddenly, I realised that there must be someone who made a tool to convert Javascript objects to environment variables. Unfortunately, I could not find a working solution. So I knew I had to make one! Let's see how I made it using ChatGPT and Svelte. You can try it [here](https://svelte.dev/repl/187f2c56f22c428fa14c7043906878d3?version=3.55.0)

---
## Initial Setup

To get started, go to Svelte [REPL](https://svelte.dev/repl/hello-world) and name your project. Setup App.svelte as follows:

\`\`\`jsx

import React from "react";

const CoolComponent = () => <div>I'm a cool component!!</div>;

export default CoolComponent;
\`\`\`

```
<script>
</script>

<main>
</main>

<style>
</style>
```

For the application, we need one textarea for pasting the javascript object and another to show the output as .env variables.

Let's now add two textareas in App.svelte:

```
<script>
    let text = '';
    let output = '';
</script>

<main>
    <textarea 
        bind:value={text} 
        placeholder='Enter JS object'>
    </textarea>
    <textarea 
        bind:value={output} 
        placeholder='ENV Output' 
        disabled={true} 
        readonly={false}>
    </textarea>
    <button>
		Convert
	</button>
</main>

<style>
    main{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
    textarea { 
		flex-grow: 1;
		height: 300px;
		padding: 20px;
		margin: 10px;
	}
    button {
		width: 200px;
	}
</style>
```

Here I have added styles for the main as well as for the textareas so that these two are next to each other using <code>flex-direction: column</code>. I also added a button that we will later use to convert the object.

## Using ChatGPT to create the function

Now comes the fun part! On ChatGPT, I asked the following questions:

- algorithm to convert javascript object to .env values
- javascript convert string to object where keys do not have double quotes in string
- regex delete text and everything after it until a character is reached
- how to add double quotes to keys in a string then convert to object in Javascript?
- javascript convert each key in an object to have underscore after each capital letter then convert to uppercase

Using the answers provided by ChatGPT, I was able to come up with a function that did the conversion: 

```
const objectToEnvString = () => {
		try {
			errorMsg = '';
			output = '';
			// adds double quotes to each key
			// removes semicolon
			const str = text.trim()
						.replace(/([\{,]\s*)([A-Za-z_$][A-Za-z_$0-9]*)\s*:/g, '$1"$2":')
                        .replace(/;/g, '');
			const obj = JSON.parse(str);
			
			// adds underscore after each capital letter
			// converts each key to uppercase
			const formattedObj = Object.keys(obj).reduce((acc, key) => {
				const modifiedKey = key.replace(/([A-Z])/g, '_$1').toUpperCase();
				acc[modifiedKey] = obj[key];
				return acc;
			}, {});
			
			for (const [key, value] of Object.entries(formattedObj)) {
				output += `${key}=${typeof value === 'string' ? value : JSON.stringify(value)} \n`;
			}
		} catch (error) {
			errorMsg='Invalid Object';
		}
	}
```

I asked ChatGPT to explain this code. Here is what it said:

- The function starts by defining an empty string called errorMsg and another empty string called output.
- It then uses the trim and replace methods to modify the input string (stored in the variable text). The trim method removes leading and trailing white spaces from the string, and the replace method adds double quotes to each key and removes semicolons from the string.
- The modified string is then parsed into a JavaScript object using the JSON.parse method.
- The object is then transformed into a new object called formattedObj using the Object.keys and reduce methods. The Object.keys method returns an array of the object's keys, and the reduce method iterates over the array and modifies the keys by adding an underscore after each capital letter and converting them to uppercase.
- Finally, the function uses a for-of loop to iterate over the key-value pairs of the formattedObj object and build a string in the format of an environment variable. The string is stored in the output variable and returned by the function.

Well, this explained it all. Without ChatGPT, it would have taken me quite a while to come up with this function.