##Readme-SpreadsheetOverview
This is a client side application that uses JavaScript and HTML5 Canvas to represent a sheet of given number of rows and columns highlighting important cells on it. It creates a snapshot of sheet without the data or formulae which makes it easier to represent condition of the sheet. No, this doesn't have excel upload functionality that extracts data out of excel and then parses it for representation. That server-side stuff is done by our client Boardwalktech (http://www.boardwalktech.com/) who came up with this requirement. This is just a prototype in progress for them. But as I'm feeling good about this as a nice JavaScript library, I am posting it out here on github so that I can even blog about it. I hope to make lot of enhancements to this one as this is already my full-time work. :)
##Objective
The aim is to have a client-side tool that 
* Loads snapshot of a spreadsheet as it is invoked,
* Plots all those cells that are important and need to be highlighted
* Provides a zoom functionality that allows to closely watch the plotted cells that are important.
* Beyond a certain zoom, allows to invoke a callback that can be used to fetch cell data from server and display it.

