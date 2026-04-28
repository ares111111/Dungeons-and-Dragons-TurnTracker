# Dungeons-and-Dragons-TurnTracker
Dungeons and Dragons TurnTracker


=========================
PDF READ ME MUCH NICER
=========================





Turn Tracker v2
How to use:
To open the program, double click the index.html (or open with the web browser of your choice).


Use the Add to Initative section to name, add image, and add initiative to a character in combat. Then click Add to Initative to add to the turn tracker. 


Use the Sort button to sort turns by initiative. And use the arrow buttons on screen to cycle though the turns. Alternatively you can use arrow keys (left & right) to move through turn order & F5 can be used to clear the combat



File Structure Reference


🧙Image Presets
If you want to change the image of a preset player or enemy you can do this by doing the following.

Open the “players” or “enemies” folder. 


Add or replace a file inside. 
If replacing make sure to change the name to match the file being replace


If adding new preset you will need to edit the code to include the tag for a new option. 


To do this open the index.html file using notepad and add an additional option to the player or enemy select section. 


Dont forget to save your changes.

Note that the program can accept most image files but .png and .gif look best
(ex: <option value=”players/BloodAxe.png”> Axe Guy </options> )


You will also find in the “Tools” folder a file names “ImageZone_SizeReferance.xcf” which can be used with the GIMP image editor program as an image size reference. This is optional though.


Recommended links.
GIMP Brush Link: If you use the “ImageZone_SizeReferance.xcf” and want to add a backsplash like on many D&D art peaces this prush set can give you that look.
https://www.brusheezy.com/brushes/57023-watercolor-mask-ps-brushes-abr

Simple character make: Used for default players.
https://picrew.me/en/image_maker/2862312

🎶Audio Tracks
If you would like to add a special audio track to a character you can do the following.

Open the “sounds” folder.


Add or replace a file inside.


If replacing make sure to change the name to match the file being replace.


If adding new audio track, simply add a .mp3 file and give it the same name as the image you want it to play alongside. This works best if the audo track is less then 3 sec.

Recommended links.
Sound Cutter: Many sound bites have a few moments of silence before the sound plays. This website allows you to cut the sound to play right away.
https://audiomass.co/

🏞️Background Presets
If you would like to add a background or color them  you can do the following.

Open the “backgrounds” folder.


Add or replace a file inside.


If replacing make sure to change the name to match the file being replace


If adding new background preset you will need to edit the code to include the tag for a new option. 
To do this open the index.html file using notepad and add an additional option to the themeSelect section. This will add an option to the drop down menu (but not work unless the following steps are also done)


Next open the script.js file using notepad and add an additional option to the const theme section. Note that you must name it the same as the value=”X” section from the html file (ex: value=”forest” → forest: )



Copy the following format and add it to the end of the list. Note you only need to end with a “ , “ if it is not the last item in the list. Also note the following yellow is the only things you should be changing, which changes the theme colors and background image.


  name: {
    primary: "#4fc3f7",
    secondary: "#e63946",
    accent: "#ffffff",
    bg: "backgrounds/name.png"
  }

Note that the program can accept most image files but .png and .gif look best
(ex: bg: “background/ IceCave.png” )







