function SpreadsheetViewer(defaultOptions) {
  //Setting defaults with custom or default values
  defaultOptions = defaultOptions || {};
  defaultOptions.canvasId = defaultOptions.canvasId || "myCanvas";
  defaultOptions.size = defaultOptions.size || 10;
  defaultOptions.plotColor = defaultOptions.plotColor || "#FF0000";
  defaultOptions.columns = defaultOptions.columns || 0;
  defaultOptions.rows = defaultOptions.rows || 0;
  defaultOptions.gridLineColor = defaultOptions.gridLineColor || "#000000";
  defaultOptions.backgroundColor = defaultOptions.backgroundColor || "#FFFFFF";
  if(defaultOptions.enableHorizontalGridLines == undefined)
    defaultOptions.enableHorizontalGridLines = false;
  if(defaultOptions.enableVerticalGridLines == undefined)
    defaultOptions.enableVerticalGridLines = true;


  /*
   * function: init
   * description: initializes the SpreadsheetViewer by initializing the members and executing certain methods to present the spreadsheet on load.
   * The method is called after method definitions to run the initializations when the object is loaded using "new" keyword.
   */
  this.init = function() {
    //object member initialization
    this.useElement(defaultOptions.canvasId);
    this.radius = defaultOptions.size / 2;
    this.plotColor = defaultOptions.plotColor;
    this.columns = defaultOptions.columns;
    this.extraColumnPixels = this.getWidth() % this.columns;
    this.rows = defaultOptions.rows;
    this.extraRowPixels = this.getHeight() % this.rows;
    this.gridLineColor = defaultOptions.gridLineColor;
    this.backgroundColor = defaultOptions.backgroundColor;
    this.enableHorizontalGridLines = defaultOptions.enableHorizontalGridLines;
    this.enableVerticalGridLines = defaultOptions.enableVerticalGridLines;

    //background color
    this.drawRectangle(0, 0, this.getWidth(), this.getHeight(), this.backgroundColor);
    //Grid lines
    this.drawGridLines();
  }

  this.useElement = function(sElementId) {
    if(sElementId != undefined && sElementId !="") 
      this.canvasElement = document.getElementById(sElementId);
    else
      this.canvasElement = document.getElementById("myCanvas");

    this.canvasContext = this.canvasElement.getContext('2d');
  }

  this.drawCircle = function(x, y, size) {
    if(size != undefined && size !="")
      this.radius = size / 2;

    this.canvasContext.beginPath();
    this.canvasContext.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    this.canvasContext.fillStyle = this.plotColor;
    this.canvasContext.fill();
    this.canvasContext.stroke();
  }

  this.getWidth = function() {
    return this.canvasElement.width;
  }

  this.getHeight = function() {
    return this.canvasElement.height;
  }

  this.getColumnWidth = function() {
    return Math.floor(this.getWidth() / this.columns);
  }

  this.getRowHeight = function() {
    return Math.floor(this.getHeight() / this.rows);
  }

  this.drawGridLines = function() {
    if(this.enableVerticalGridLines)
      this.drawVerticalGridLines();

    if(this.enableHorizontalGridLines)
      this.drawHorizontalGridLines();
  }

  this.drawLine = function(fromX, fromY, toX, toY) {
    this.canvasContext.moveTo(fromX, fromY);
    this.canvasContext.lineTo(toX, toY);
    this.canvasContext.lineWidth = 1;
    this.canvasContext.strokeStyle = this.gridLineColor;
    this.canvasContext.stroke();
  }

  this.drawVerticalGridLines = function() {
    var columnWidth = this.getColumnWidth();
    var previousColumnEndsAt = 0;
    var extraPixels = this.extraColumnPixels;
    //Now draw the virtical grid lines.
    for(var i = 1; i < this.columns; i++) {
      var nextColumnStartsAt = previousColumnEndsAt + columnWidth;
      if(extraPixels != 0) {
        nextColumnStartsAt = nextColumnStartsAt + 1;
        extraPixels = extraPixels - 1;
      }
      this.drawLine(nextColumnStartsAt, 0, nextColumnStartsAt, this.getHeight());
      previousColumnEndsAt = nextColumnStartsAt;
    }
  }

  this.drawHorizontalGridLines = function() {
    var rowHeight = this.getRowHeight();
    var previousRowEndsAt = 0;
    var extraPixels = this.extraRowPixels;
    //Now draw the horizontal grid lines.
    for(var i = 1; i < this.rows; i++) {
      var nextRowStartsAt = previousRowEndsAt + rowHeight;
      if(extraPixels != 0) {
        nextRowStartsAt = nextRowStartsAt + 1;
        extraPixels = extraPixels - 1;
      }
      this.drawLine(0, nextRowStartsAt, this.getWidth(), nextRowStartsAt);
      previousRowEndsAt = nextRowStartsAt;
    }
  }

  this.plotCell = function(columnNumber, rowNumber) {
    var fromX = this.getFromXForCell(columnNumber);
    var fromY = this.getFromYForCell(rowNumber);
    var width = this.getColumnWidth();
    var height = this.getRowHeight();

    if(columnNumber <= this.extraColumnPixels) {
width = width + 1;
    }

    if(rowNumber <= this.extraRowPixels) {
height = height + 1;
    }

    this.drawRectangle(fromX, fromY, width, height, this.plotColor);
  }

  this.drawRectangle = function(fromX, fromY, width, height, color) {
    this.canvasContext.beginPath();
    this.canvasContext.rect(fromX, fromY, width, height);
    this.canvasContext.fillStyle = color;
    this.canvasContext.fill();
    this.canvasContext.stroke();
  }
  this.getFromXForCell = function(columnNumber) {
    if(columnNumber == 1)
      return 0;

    if(columnNumber <= this.extraColumnPixels) {
      return (this.getColumnWidth() * (columnNumber - 1)) + columnNumber - 1;
    } else {
      return (this.getColumnWidth() * (columnNumber - 1)) + this.extraColumnPixels;
    }
  }

  this.getFromYForCell = function(rowNumber) {
    if(rowNumber == 1)
      return 0;

    if(rowNumber <= this.extraRowPixels) {
      return (this.getRowHeight() * (rowNumber - 1)) + rowNumber - 1;
    } else {
      return (this.getRowHeight() * (rowNumber - 1)) + this.extraRowPixels;
    }
  }

  this.getToXForCell = function(columnNumber) {
    if(columnNumber == this.columns)
      return this.getWidth();

    if(columnNumber <= this.extraColumnPixels) {
      return (this.getColumnWidth() * columnNumber) + columnNumber;
    } else {
      return (this.getColumnWidth() * columnNumber) + this.extraColumnPixels;
    }
  }

  this.getToYForCell = function(rowNumber) {
    if(rowNumber == this.rows)
      return this.getRowHeight();

    if(rowNumber <= this.extraRowPixels) {
      return (this.getRowHeight() * rowNumber) + rowNumber;
    } else {
      return (this.getRowHeight() * rowNumber) + this.extraRowPixels;
    }
  }

  this.init();
}
