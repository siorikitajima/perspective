# Perspective
[*Perspective*](https://siorikitajima.github.io/perspective/) is a generative data visualization animation initially created for the Singapore based mental health resource site [strangersinmyhead.info](https://strangersinmyhead.info) by [Siori Kitajima](https://siorikitajima.com) and [PatternBased](https://patternbased.com)

# 

## v 1.0 ::: What is this?
**"1 in 7 people in SG experience mental disorder."**

This generative animation shows how many people in Singapore have experienced mental health issues in their life. 

20 silhouetted characters walk past the screen randomly, their color generated from this model 'colorArray'. A color ID assigned to each character is picked randomly from the model (in v1.0, 700 samples are in the model) every time. 

These numbers are based on real world stats and adapted a bit to make sense as a whole. The current numbers are set purely for creating a somewhat realistic simulation, but not intended to be scientifically correct, unfortunately. The excuse is that we didn't find a perfect set of numbers that contain all the issues in the same region at the same time period, and had to patch different studies, adjusting to make up for minor conflicts. We are itching to update this with a perfect dataset one day. Please let [us](https://patternbased.com/contact) know if you ever come across a better study.

Below is the break down of the model we used for v1.0.

Mental health issue | Color | Number in 700
------------------- | ----- | -------------
Depression | pink | 23
Bipolar | emerald | 6
Anxiety | yellow | 6
OCD | purple | 12
Alcohol Abuse | Orange | 12
DID | blue | 6
Multiple issues | red | 4
BDD | teal | 7
BPD | coral | 8
PTSD | lavendar | 18
Psychosis | sky | 8
Eating Disorder | maroon | 2
Schizophrenia | green | 2
No issue | gray | 590
**Total** | | **700**


#
## How to use this as a template
If you have a different set of data in a compatible format that can visualize differences of people or things by color, feel free to use this project as a template to make your own. (Shared under [GPL-3.0 License](LICENSE))

We use [p5.play.js](https://molleindustria.github.io/p5.play/docs/classes/p5.play.html) for rendering spritesheet, and [p5.js](https://p5js.org/) v0.5.4 for everything else. *Please note that newer versions of p5.js won't work with p5.play.js.

### ::: The model ::: 
In [strangersPerspective.js](strangersPerspective.js), change 'numbers' value under 'colorList' for each color. If you add more colors, you also have to create spritesheets of all the characters in the color, too.

### ::: The information in the popup ::: 
When the screen is clicked, a popup shows up with a description and corresponding links of the issue on focus. To edit whats inside the popup:
1. Change [issueData.json](json/issueData.json). 'h1' and 'body' are text contents shown in the popup panel. Other two items are used for generating URLs.
2. URLs are managed in [strangersPerspective.js](strangersPerspective.js) under learnLinkOpen() and the three functions underneath.

### ::: Animation spritesheets ::: 
Download [this Adobe Illustror file of all 20 characters](vectorWalkers) in the editable vector format which you can change the color and/or the movements. Export artboards as transparent PNG and add them into [walkers folder](walkers).
These sprites are made in 200px width x 300px height. If you replace spritesheets with your original animation in different dimension, don't forget to update [strangersPerspective.js](strangersPerspective.js) 'CONFIG' section on the top.

### ::: Floor images ::: 
When the color ID (= the issue) changes, the image on the floor is changed accordingly. Since this animation is made in 2D (mimicking 3D), the images have to be in perspective. You can create them manually using image software like Photoshop or Illustrator, or online perspective effectors like [LunaPic](https://www3.lunapic.com/editor/). Add final images into [images folder](images), and update [groundImgData.json](json/groundImgData.json).

### ::: Adding Characters ::: 
There are 20 characters in v1.0. If you want to add more characters:
1. Create spritesheets of the new character in all colors, and add them into [walkers folder](walkers).
2. Update characterList in [strangersPerspective.js](strangersPerspective.js) in the same format.

### ::: Velocity, position, density, frame delay, etc. ::: 
See comments in [strangersPerspective.js](strangersPerspective.js).

#
There are two alternative versions for different mobile environments. 

iOS: https://siorikitajima.github.io/perspective/iOS

Mobile FireFox: https://siorikitajima.github.io/perspective/FF

## iOS version
iOS has 'Canvas memory limit' and won't load anything more than 256 MB or so (depends on the device type). There is a lightweight version of animation optimized for iOS in 'iOS' folder, which has only 3 rows instead of 5 rows with 8 characters instead of 20 (8 characters x 14 colors = 252 images).

## FF version
Mobile Firefox seems to have a problem with detecting tapping on a canvas element, and loads slower in general. This FF version in 'FF' folder works fine on mobile FF. It is based on the iOS version, and the difference is using P5 native mouseClicked() function instead of having a separate DOM element for the same function. Please note this mouseClicked() method also works on most devices, but it is less responsive for tapping gestures on mobile in general.