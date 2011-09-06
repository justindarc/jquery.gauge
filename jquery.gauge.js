/* 
 * jQuery Gauge Plugin
 * Dashboard-style gauge data visualization
 * 
 * Author: Justin D'Arcangelo (http://twitter.com/justindarc)
 * GitHub: https://github.com/justindarc
 * 
 * License:
 *    The MIT License
 * 
 * Revisions:
 *		0.1		- Initial commit
 * 
 * Usage:
 *		var g = $('#gauge').gauge(); // Initialize, where #gauge is a div element
 *    g.gauge.val();               // Get the value as a percentage (0-100)
 *    g.gauge.val(50);             // Set the value as a percentage (0-100)
 * 
 * Options:
 *    foregroundImage - Image to be used in the foreground (e.g. glossy effect)
 *    backgroundImage - Image to be used in the background
 *    pointerImage    - Image to be used for the pointer
 *    pointerOffset.x - X offset for the pointer image
 *    pointerOffset.y - Y offset for the pointer image
 *    startAngle      - Minimum angle for the pointer when the value is set to 0
 *    endAngle        - Maximum angle for the pointer when the value is set to 100
 */
(function($) {

  $.fn.gauge = function(options) {

    // Default plugin options.
    var defaults = {
      foregroundImage: 'foreground.png',
      backgroundImage: 'background.png',
      pointerImage: 'pointer.png',
      pointerOffset: {
        x: 0,
        y: 0
      },
      startAngle: -45,
      endAngle: 225
    };

    // Extend default plugin options with provided options.
    if (options) {
      $.extend(defaults, options);
    }

    // Iterate over matched elements.
    return this.each(function(index, item) {
      var $div = $(item);
      
      // Skip over this matched element if it is not a div element.
      if (!$div.is('div')) return;
      
      var $foreground = $('<img alt="" src="' + defaults.foregroundImage + '"/>');
      var $background = $('<img alt="" src="' + defaults.backgroundImage + '"/>');
      var $pointer = $('<img alt="" src="' + defaults.pointerImage + '"/>');
      
      $div.css('position', 'relative');
      $foreground.css('position', 'absolute');
      $background.css('position', 'absolute');
      $pointer.css({
        'position': 'absolute',
        'left': defaults.pointerOffset.x + 'px',
        'top': defaults.pointerOffset.y + 'px',
        '-webkit-transform': 'rotate(' + defaults.startAngle + 'deg)',
        '-moz-transform': 'rotate(' + defaults.startAngle + 'deg)'
      });
      
      $div.append($background).append($pointer).append($foreground);
      
      var _value = 0;
      
    	// Public function definitions.
    	$.fn.gauge.val = function(value) {
    	  if (value === undefined) {
    	    return _value;
    	  }
    	  
    	  value = (value < 0) ? 0 : (value > 100) ? 100 : value;
    	  
    	  var angleRange = defaults.endAngle - defaults.startAngle;
    	  var angle = defaults.startAngle + (value * angleRange * 0.01);
    	  
    	  $pointer.css({
    	    '-webkit-transform': 'rotate(' + angle + 'deg)',
    	    '-moz-transform': 'rotate(' + angle + 'deg)'
    	  });
    	  
    		return $div;
    	};
    });

  };

})(jQuery);
