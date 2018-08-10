/*
 *  A Geolocation object
 *
 *  Note: Uses GPS or similar hardware for data if available through
 *        the browser, but will fall back to using (Google) geolocation
 *        services with current IP address automatically.
 *
 *  @property   {boolean}   supported   If the geolocation functions are available in the current context
 *  @property   {function}  onsuccess   The function to be called if the geolocation services are successful
 *  @property   {function}  onerror     The function to be called if an error occurs
 *  @property   {object}    options     The options {enableHighAccuracy, maximumAge, timeout} to apply to geolocation functions
 *  @property   {object}    position    The last recorded geolocation data (default is 0)
 */

var Geolocation = (function(self) {

    self.supported = ("geolocation" in navigator);

    self.onsuccess = function() {};
    self.onerror = function() {};

    /*
     * The accuracy, maximum age, and timeout for the geolocation data
     */
    self.options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    /*
     * The last recorded geolocation
     */
    self.position = {
      latitude: 0,
      longitude: 0
    };

    /*
     * The watchPosition function ID, if set
     */
    var wpid = null;

    /*
     * Gets the current geolocation position, recording the data
     *  and calling associated functions
     */
    self.getCurrentPosition = function() {
      if (self.supported) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.position.latitude = position.coords.latitude;
          self.position.longitude = position.coords.longitude;
          self.onsuccess.apply(this, arguments);
        }, self.onerror, self.options);
      }
    };

    /*
     * Watches the geolocation position, calling the onsuccess function
     *  according to the maximumAge and timeout options
     */
    self.watchPosition = function() {
      if (self.supported) {
        wpid = navigator.geolocation.watchPosition(function(position) {
          self.position.latitude = position.coords.latitude;
          self.position.longitude = position.coords.longitude;
          self.onsuccess.apply(this, arguments);
        }, self.onerror, self.options);
      }
    };

    /*
     * Clears (if set) the currently watched position function
     */
    self.clearPosition = function() {
      if (self.supported && wpid !== null) {
        navigator.geolocation.clearWatch(wpid);
      }
    };

    return self;

  })(Geolocation || {});
