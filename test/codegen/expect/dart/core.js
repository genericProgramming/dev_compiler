var core;
(function(exports) {
  'use strict';
  // Function _symbolToString: (Symbol) → String
  function _symbolToString(symbol) {
    return _internal.Symbol.getName(dart.as(symbol, _internal.Symbol));
  }
  // Function _symbolMapToStringMap: (Map<Symbol, dynamic>) → dynamic
  function _symbolMapToStringMap(map) {
    if (map === null)
      return null;
    let result = new Map();
    map.forEach((key, value) => {
      result.set(_symbolToString(key), value);
    });
    return result;
  }
  class _ListConstructorSentinel extends _interceptors.JSInt {
    _ListConstructorSentinel() {
      super.JSInt();
    }
  }
  class Deprecated extends dart.Object {
    Deprecated(expires) {
      this.expires = expires;
    }
    toString() {
      return `Deprecated feature. Will be removed ${this.expires}`;
    }
  }
  class _Override extends dart.Object {
    _Override() {
    }
  }
  let deprecated = new Deprecated("next release");
  let override = new _Override();
  class _Proxy extends dart.Object {
    _Proxy() {
    }
  }
  let proxy = new _Proxy();
  class bool extends dart.Object {
    bool$fromEnvironment(name, opt$) {
      let defaultValue = opt$.defaultValue === void 0 ? false : opt$.defaultValue;
      throw new UnsupportedError('bool.fromEnvironment can only be used as a const constructor');
    }
    toString() {
      return this ? "true" : "false";
    }
  }
  dart.defineNamedConstructor(bool, 'fromEnvironment');
  let Comparable$ = dart.generic(function(T) {
    class Comparable extends dart.Object {
      static compare(a, b) {
        return a.compareTo(b);
      }
    }
    return Comparable;
  });
  let Comparable = Comparable$(dynamic);
  let _fourDigits = Symbol('_fourDigits');
  let _sixDigits = Symbol('_sixDigits');
  let _threeDigits = Symbol('_threeDigits');
  let _twoDigits = Symbol('_twoDigits');
  let _brokenDownDateToMillisecondsSinceEpoch = Symbol('_brokenDownDateToMillisecondsSinceEpoch');
  class DateTime extends dart.Object {
    DateTime(year, month, day, hour, minute, second, millisecond) {
      if (month === void 0)
        month = 1;
      if (day === void 0)
        day = 1;
      if (hour === void 0)
        hour = 0;
      if (minute === void 0)
        minute = 0;
      if (second === void 0)
        second = 0;
      if (millisecond === void 0)
        millisecond = 0;
      this.DateTime$_internal(year, month, day, hour, minute, second, millisecond, false);
    }
    DateTime$utc(year, month, day, hour, minute, second, millisecond) {
      if (month === void 0)
        month = 1;
      if (day === void 0)
        day = 1;
      if (hour === void 0)
        hour = 0;
      if (minute === void 0)
        minute = 0;
      if (second === void 0)
        second = 0;
      if (millisecond === void 0)
        millisecond = 0;
      this.DateTime$_internal(year, month, day, hour, minute, second, millisecond, true);
    }
    DateTime$now() {
      this.DateTime$_now();
    }
    static parse(formattedString) {
      let re = new RegExp('^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)' + '(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(.\\d{1,6})?)?)?' + '( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$');
      let match = re.firstMatch(formattedString);
      if (match !== null) {
        // Function parseIntOrZero: (String) → int
        function parseIntOrZero(matched) {
          if (matched === null)
            return 0;
          return int.parse(matched);
        }
        // Function parseDoubleOrZero: (String) → double
        function parseDoubleOrZero(matched) {
          if (matched === null)
            return 0.0;
          return double.parse(matched);
        }
        let years = int.parse(match.get(1));
        let month = int.parse(match.get(2));
        let day = int.parse(match.get(3));
        let hour = parseIntOrZero(match.get(4));
        let minute = parseIntOrZero(match.get(5));
        let second = parseIntOrZero(match.get(6));
        let addOneMillisecond = false;
        let millisecond = (dart.notNull(parseDoubleOrZero(match.get(7))) * 1000).round();
        if (millisecond === 1000) {
          addOneMillisecond = true;
          millisecond = 999;
        }
        let isUtc = false;
        if (match.get(8) !== null) {
          isUtc = true;
          if (match.get(9) !== null) {
            let sign = dart.equals(match.get(9), '-') ? -1 : 1;
            let hourDifference = int.parse(match.get(10));
            let minuteDifference = parseIntOrZero(match.get(11));
            minuteDifference = 60 * dart.notNull(hourDifference);
            minute = dart.notNull(sign) * dart.notNull(minuteDifference);
          }
        }
        let millisecondsSinceEpoch = _brokenDownDateToMillisecondsSinceEpoch(years, month, day, hour, minute, second, millisecond, isUtc);
        if (millisecondsSinceEpoch === null) {
          throw new FormatException("Time out of range", formattedString);
        }
        if (addOneMillisecond)
          millisecondsSinceEpoch = dart.notNull(millisecondsSinceEpoch) + 1;
        return new DateTime.fromMillisecondsSinceEpoch(millisecondsSinceEpoch, {isUtc: isUtc});
      } else {
        throw new FormatException("Invalid date format", formattedString);
      }
    }
    DateTime$fromMillisecondsSinceEpoch(millisecondsSinceEpoch, opt$) {
      let isUtc = opt$.isUtc === void 0 ? false : opt$.isUtc;
      this.millisecondsSinceEpoch = millisecondsSinceEpoch;
      this.isUtc = isUtc;
      if (dart.notNull(millisecondsSinceEpoch.abs()) > dart.notNull(_MAX_MILLISECONDS_SINCE_EPOCH)) {
        throw new ArgumentError(millisecondsSinceEpoch);
      }
      if (isUtc === null)
        throw new ArgumentError(isUtc);
    }
    ['=='](other) {
      if (!dart.notNull(dart.is(other, DateTime)))
        return false;
      return this.millisecondsSinceEpoch === dart.dload(other, 'millisecondsSinceEpoch') && this.isUtc === dart.dload(other, 'isUtc');
    }
    isBefore(other) {
      return dart.notNull(this.millisecondsSinceEpoch) < dart.notNull(other.millisecondsSinceEpoch);
    }
    isAfter(other) {
      return dart.notNull(this.millisecondsSinceEpoch) > dart.notNull(other.millisecondsSinceEpoch);
    }
    isAtSameMomentAs(other) {
      return this.millisecondsSinceEpoch === other.millisecondsSinceEpoch;
    }
    compareTo(other) {
      return this.millisecondsSinceEpoch.compareTo(other.millisecondsSinceEpoch);
    }
    get hashCode() {
      return this.millisecondsSinceEpoch;
    }
    toLocal() {
      if (this.isUtc) {
        return new DateTime.fromMillisecondsSinceEpoch(this.millisecondsSinceEpoch, {isUtc: false});
      }
      return this;
    }
    toUtc() {
      if (this.isUtc)
        return this;
      return new DateTime.fromMillisecondsSinceEpoch(this.millisecondsSinceEpoch, {isUtc: true});
    }
    static [_fourDigits](n) {
      let absN = n.abs();
      let sign = dart.notNull(n) < 0 ? "-" : "";
      if (dart.notNull(absN) >= 1000)
        return `${n}`;
      if (dart.notNull(absN) >= 100)
        return `${sign}0${absN}`;
      if (dart.notNull(absN) >= 10)
        return `${sign}00${absN}`;
      return `${sign}000${absN}`;
    }
    static [_sixDigits](n) {
      dart.assert(dart.notNull(n) < -9999 || dart.notNull(n) > 9999);
      let absN = n.abs();
      let sign = dart.notNull(n) < 0 ? "-" : "+";
      if (dart.notNull(absN) >= 100000)
        return `${sign}${absN}`;
      return `${sign}0${absN}`;
    }
    static [_threeDigits](n) {
      if (dart.notNull(n) >= 100)
        return `${n}`;
      if (dart.notNull(n) >= 10)
        return `0${n}`;
      return `00${n}`;
    }
    static [_twoDigits](n) {
      if (dart.notNull(n) >= 10)
        return `${n}`;
      return `0${n}`;
    }
    toString() {
      let y = _fourDigits(this.year);
      let m = _twoDigits(this.month);
      let d = _twoDigits(this.day);
      let h = _twoDigits(this.hour);
      let min = _twoDigits(this.minute);
      let sec = _twoDigits(this.second);
      let ms = _threeDigits(this.millisecond);
      if (this.isUtc) {
        return `${y}-${m}-${d} ${h}:${min}:${sec}.${ms}Z`;
      } else {
        return `${y}-${m}-${d} ${h}:${min}:${sec}.${ms}`;
      }
    }
    toIso8601String() {
      let y = dart.notNull(this.year) >= -9999 && dart.notNull(this.year) <= 9999 ? _fourDigits(this.year) : _sixDigits(this.year);
      let m = _twoDigits(this.month);
      let d = _twoDigits(this.day);
      let h = _twoDigits(this.hour);
      let min = _twoDigits(this.minute);
      let sec = _twoDigits(this.second);
      let ms = _threeDigits(this.millisecond);
      if (this.isUtc) {
        return `${y}-${m}-${d}T${h}:${min}:${sec}.${ms}Z`;
      } else {
        return `${y}-${m}-${d}T${h}:${min}:${sec}.${ms}`;
      }
    }
    add(duration) {
      let ms = this.millisecondsSinceEpoch;
      return new DateTime.fromMillisecondsSinceEpoch(dart.notNull(ms) + dart.notNull(duration.inMilliseconds), {isUtc: this.isUtc});
    }
    subtract(duration) {
      let ms = this.millisecondsSinceEpoch;
      return new DateTime.fromMillisecondsSinceEpoch(dart.notNull(ms) - dart.notNull(duration.inMilliseconds), {isUtc: this.isUtc});
    }
    difference(other) {
      let ms = this.millisecondsSinceEpoch;
      let otherMs = other.millisecondsSinceEpoch;
      return new Duration({milliseconds: dart.notNull(ms) - dart.notNull(otherMs)});
    }
    DateTime$_internal(year, month, day, hour, minute, second, millisecond, isUtc) {
      this.isUtc = typeof isUtc == boolean ? isUtc : dart.throw_(new ArgumentError(isUtc));
      this.millisecondsSinceEpoch = dart.as(_js_helper.checkInt(_js_helper.Primitives.valueFromDecomposedDate(year, month, day, hour, minute, second, millisecond, isUtc)), int);
    }
    DateTime$_now() {
      this.isUtc = false;
      this.millisecondsSinceEpoch = _js_helper.Primitives.dateNow();
    }
    static [_brokenDownDateToMillisecondsSinceEpoch](year, month, day, hour, minute, second, millisecond, isUtc) {
      return dart.as(_js_helper.Primitives.valueFromDecomposedDate(year, month, day, hour, minute, second, millisecond, isUtc), int);
    }
    get timeZoneName() {
      if (this.isUtc)
        return "UTC";
      return _js_helper.Primitives.getTimeZoneName(this);
    }
    get timeZoneOffset() {
      if (this.isUtc)
        return new Duration();
      return new Duration({minutes: _js_helper.Primitives.getTimeZoneOffsetInMinutes(this)});
    }
    get year() {
      return dart.as(_js_helper.Primitives.getYear(this), int);
    }
    get month() {
      return dart.as(_js_helper.Primitives.getMonth(this), int);
    }
    get day() {
      return dart.as(_js_helper.Primitives.getDay(this), int);
    }
    get hour() {
      return dart.as(_js_helper.Primitives.getHours(this), int);
    }
    get minute() {
      return dart.as(_js_helper.Primitives.getMinutes(this), int);
    }
    get second() {
      return dart.as(_js_helper.Primitives.getSeconds(this), int);
    }
    get millisecond() {
      return dart.as(_js_helper.Primitives.getMilliseconds(this), int);
    }
    get weekday() {
      return dart.as(_js_helper.Primitives.getWeekday(this), int);
    }
  }
  dart.defineNamedConstructor(DateTime, 'utc');
  dart.defineNamedConstructor(DateTime, 'now');
  dart.defineNamedConstructor(DateTime, 'fromMillisecondsSinceEpoch');
  dart.defineNamedConstructor(DateTime, '_internal');
  dart.defineNamedConstructor(DateTime, '_now');
  DateTime.MONDAY = 1;
  DateTime.TUESDAY = 2;
  DateTime.WEDNESDAY = 3;
  DateTime.THURSDAY = 4;
  DateTime.FRIDAY = 5;
  DateTime.SATURDAY = 6;
  DateTime.SUNDAY = 7;
  DateTime.DAYS_PER_WEEK = 7;
  DateTime.JANUARY = 1;
  DateTime.FEBRUARY = 2;
  DateTime.MARCH = 3;
  DateTime.APRIL = 4;
  DateTime.MAY = 5;
  DateTime.JUNE = 6;
  DateTime.JULY = 7;
  DateTime.AUGUST = 8;
  DateTime.SEPTEMBER = 9;
  DateTime.OCTOBER = 10;
  DateTime.NOVEMBER = 11;
  DateTime.DECEMBER = 12;
  DateTime.MONTHS_PER_YEAR = 12;
  DateTime._MAX_MILLISECONDS_SINCE_EPOCH = 8640000000000000;
  class double extends num {
    static parse(source, onError) {
      if (onError === void 0)
        onError = null;
      return _js_helper.Primitives.parseDouble(source, onError);
    }
  }
  double.NAN = 0.0 / 0.0;
  double.INFINITY = 1.0 / 0.0;
  double.NEGATIVE_INFINITY = -dart.notNull(INFINITY);
  double.MIN_POSITIVE = 5e-324;
  double.MAX_FINITE = 1.7976931348623157e+308;
  let _duration = Symbol('_duration');
  class Duration extends dart.Object {
    Duration(opt$) {
      let days = opt$.days === void 0 ? 0 : opt$.days;
      let hours = opt$.hours === void 0 ? 0 : opt$.hours;
      let minutes = opt$.minutes === void 0 ? 0 : opt$.minutes;
      let seconds = opt$.seconds === void 0 ? 0 : opt$.seconds;
      let milliseconds = opt$.milliseconds === void 0 ? 0 : opt$.milliseconds;
      let microseconds = opt$.microseconds === void 0 ? 0 : opt$.microseconds;
      this.Duration$_microseconds(dart.notNull(days) * dart.notNull(MICROSECONDS_PER_DAY) + dart.notNull(hours) * dart.notNull(MICROSECONDS_PER_HOUR) + dart.notNull(minutes) * dart.notNull(MICROSECONDS_PER_MINUTE) + dart.notNull(seconds) * dart.notNull(MICROSECONDS_PER_SECOND) + dart.notNull(milliseconds) * dart.notNull(MICROSECONDS_PER_MILLISECOND) + dart.notNull(microseconds));
    }
    Duration$_microseconds($_duration) {
      this[_duration] = $_duration;
    }
    ['+'](other) {
      return new Duration._microseconds(dart.notNull(this[_duration]) + dart.notNull(other[_duration]));
    }
    ['-'](other) {
      return new Duration._microseconds(dart.notNull(this[_duration]) - dart.notNull(other[_duration]));
    }
    ['*'](factor) {
      return new Duration._microseconds((dart.notNull(this[_duration]) * dart.notNull(factor)).round());
    }
    ['~/'](quotient) {
      if (quotient === 0)
        throw new IntegerDivisionByZeroException();
      return new Duration._microseconds((dart.notNull(this[_duration]) / dart.notNull(quotient)).truncate());
    }
    ['<'](other) {
      return dart.notNull(this[_duration]) < dart.notNull(other[_duration]);
    }
    ['>'](other) {
      return dart.notNull(this[_duration]) > dart.notNull(other[_duration]);
    }
    ['<='](other) {
      return dart.notNull(this[_duration]) <= dart.notNull(other[_duration]);
    }
    ['>='](other) {
      return dart.notNull(this[_duration]) >= dart.notNull(other[_duration]);
    }
    get inDays() {
      return (dart.notNull(this[_duration]) / dart.notNull(Duration.MICROSECONDS_PER_DAY)).truncate();
    }
    get inHours() {
      return (dart.notNull(this[_duration]) / dart.notNull(Duration.MICROSECONDS_PER_HOUR)).truncate();
    }
    get inMinutes() {
      return (dart.notNull(this[_duration]) / dart.notNull(Duration.MICROSECONDS_PER_MINUTE)).truncate();
    }
    get inSeconds() {
      return (dart.notNull(this[_duration]) / dart.notNull(Duration.MICROSECONDS_PER_SECOND)).truncate();
    }
    get inMilliseconds() {
      return (dart.notNull(this[_duration]) / dart.notNull(Duration.MICROSECONDS_PER_MILLISECOND)).truncate();
    }
    get inMicroseconds() {
      return this[_duration];
    }
    ['=='](other) {
      if (!dart.is(other, Duration))
        return false;
      return this[_duration] === dart.dload(other, '_duration');
    }
    get hashCode() {
      return this[_duration].hashCode;
    }
    compareTo(other) {
      return this[_duration].compareTo(other[_duration]);
    }
    toString() {
      // Function sixDigits: (int) → String
      function sixDigits(n) {
        if (dart.notNull(n) >= 100000)
          return `${n}`;
        if (dart.notNull(n) >= 10000)
          return `0${n}`;
        if (dart.notNull(n) >= 1000)
          return `00${n}`;
        if (dart.notNull(n) >= 100)
          return `000${n}`;
        if (dart.notNull(n) >= 10)
          return `0000${n}`;
        return `00000${n}`;
      }
      // Function twoDigits: (int) → String
      function twoDigits(n) {
        if (dart.notNull(n) >= 10)
          return `${n}`;
        return `0${n}`;
      }
      if (dart.notNull(this.inMicroseconds) < 0) {
        return `-${this['unary-']()}`;
      }
      let twoDigitMinutes = twoDigits(this.inMinutes.remainder(MINUTES_PER_HOUR));
      let twoDigitSeconds = twoDigits(this.inSeconds.remainder(SECONDS_PER_MINUTE));
      let sixDigitUs = sixDigits(this.inMicroseconds.remainder(MICROSECONDS_PER_SECOND));
      return `${this.inHours}:${twoDigitMinutes}:${twoDigitSeconds}.${sixDigitUs}`;
    }
    get isNegative() {
      return dart.notNull(this[_duration]) < 0;
    }
    abs() {
      return new Duration._microseconds(this[_duration].abs());
    }
    ['-']() {
      return new Duration._microseconds(-dart.notNull(this[_duration]));
    }
  }
  dart.defineNamedConstructor(Duration, '_microseconds');
  Duration.MICROSECONDS_PER_MILLISECOND = 1000;
  Duration.MILLISECONDS_PER_SECOND = 1000;
  Duration.SECONDS_PER_MINUTE = 60;
  Duration.MINUTES_PER_HOUR = 60;
  Duration.HOURS_PER_DAY = 24;
  Duration.MICROSECONDS_PER_SECOND = dart.notNull(MICROSECONDS_PER_MILLISECOND) * dart.notNull(MILLISECONDS_PER_SECOND);
  Duration.MICROSECONDS_PER_MINUTE = dart.notNull(MICROSECONDS_PER_SECOND) * dart.notNull(SECONDS_PER_MINUTE);
  Duration.MICROSECONDS_PER_HOUR = dart.notNull(MICROSECONDS_PER_MINUTE) * dart.notNull(MINUTES_PER_HOUR);
  Duration.MICROSECONDS_PER_DAY = dart.notNull(MICROSECONDS_PER_HOUR) * dart.notNull(HOURS_PER_DAY);
  Duration.MILLISECONDS_PER_MINUTE = dart.notNull(MILLISECONDS_PER_SECOND) * dart.notNull(SECONDS_PER_MINUTE);
  Duration.MILLISECONDS_PER_HOUR = dart.notNull(MILLISECONDS_PER_MINUTE) * dart.notNull(MINUTES_PER_HOUR);
  Duration.MILLISECONDS_PER_DAY = dart.notNull(MILLISECONDS_PER_HOUR) * dart.notNull(HOURS_PER_DAY);
  Duration.SECONDS_PER_HOUR = dart.notNull(SECONDS_PER_MINUTE) * dart.notNull(MINUTES_PER_HOUR);
  Duration.SECONDS_PER_DAY = dart.notNull(SECONDS_PER_HOUR) * dart.notNull(HOURS_PER_DAY);
  Duration.MINUTES_PER_DAY = dart.notNull(MINUTES_PER_HOUR) * dart.notNull(HOURS_PER_DAY);
  Duration.ZERO = new Duration({seconds: 0});
  let _stringToSafeString = Symbol('_stringToSafeString');
  let _objectToString = Symbol('_objectToString');
  class Error extends dart.Object {
    Error() {
    }
    static safeToString(object) {
      if (dart.notNull(dart.is(object, num)) || dart.notNull(typeof object == boolean) || dart.notNull(null === object)) {
        return object.toString();
      }
      if (typeof object == string) {
        return _stringToSafeString(object);
      }
      return _objectToString(object);
    }
    static [_stringToSafeString](string) {
      return _js_helper.jsonEncodeNative(string);
    }
    static [_objectToString](object) {
      return _js_helper.Primitives.objectToString(object);
    }
    get stackTrace() {
      return _js_helper.Primitives.extractStackTrace(this);
    }
  }
  class AssertionError extends Error {
  }
  class TypeError extends AssertionError {
  }
  class CastError extends Error {
  }
  class NullThrownError extends Error {
    toString() {
      return "Throw of null.";
    }
  }
  let _hasValue = Symbol('_hasValue');
  class ArgumentError extends Error {
    ArgumentError(message) {
      if (message === void 0)
        message = null;
      this.message = message;
      this.invalidValue = null;
      this[_hasValue] = false;
      this.name = null;
      super.Error();
    }
    ArgumentError$value(value, name, message) {
      if (name === void 0)
        name = null;
      if (message === void 0)
        message = "Invalid argument";
      this.name = name;
      this.message = message;
      this.invalidValue = value;
      this[_hasValue] = true;
      super.Error();
    }
    ArgumentError$notNull(name) {
      if (name === void 0)
        name = null;
      this.ArgumentError$value(null, name, "Must not be null");
    }
    toString() {
      if (!dart.notNull(this[_hasValue])) {
        let result = "Invalid arguments(s)";
        if (this.message !== null) {
          result = `${result}: ${this.message}`;
        }
        return result;
      }
      let nameString = "";
      if (this.name !== null) {
        nameString = ` (${this.name})`;
      }
      return `${this.message}${nameString}: ${Error.safeToString(this.invalidValue)}`;
    }
  }
  dart.defineNamedConstructor(ArgumentError, 'value');
  dart.defineNamedConstructor(ArgumentError, 'notNull');
  class RangeError extends ArgumentError {
    RangeError(message) {
      this.start = null;
      this.end = null;
      super.ArgumentError(message);
    }
    RangeError$value(value, name, message) {
      if (name === void 0)
        name = null;
      if (message === void 0)
        message = null;
      this.start = null;
      this.end = null;
      super.ArgumentError$value(value, name, message !== null ? message : "Value not in range");
    }
    RangeError$range(invalidValue, minValue, maxValue, name, message) {
      if (name === void 0)
        name = null;
      if (message === void 0)
        message = null;
      this.start = minValue;
      this.end = maxValue;
      super.ArgumentError$value(invalidValue, name, message !== null ? message : "Invalid value");
    }
    RangeError$index(index, indexable, name, message, length) {
      return new IndexError(index, indexable, name, message, length);
    }
    static checkValueInInterval(value, minValue, maxValue, name, message) {
      if (name === void 0)
        name = null;
      if (message === void 0)
        message = null;
      if (dart.notNull(value) < dart.notNull(minValue) || dart.notNull(value) > dart.notNull(maxValue)) {
        throw new RangeError.range(value, minValue, maxValue, name, message);
      }
    }
    static checkValidIndex(index, indexable, name, length, message) {
      if (name === void 0)
        name = null;
      if (length === void 0)
        length = null;
      if (message === void 0)
        message = null;
      if (length === null)
        length = dart.as(dart.dload(indexable, 'length'), int);
      if (dart.notNull(index) < 0 || dart.notNull(index) >= dart.notNull(length)) {
        if (name === null)
          name = "index";
        throw new RangeError.index(index, indexable, name, message, length);
      }
    }
    static checkValidRange(start, end, length, startName, endName, message) {
      if (startName === void 0)
        startName = null;
      if (endName === void 0)
        endName = null;
      if (message === void 0)
        message = null;
      if (dart.notNull(start) < 0 || dart.notNull(start) > dart.notNull(length)) {
        if (startName === null)
          startName = "start";
        throw new RangeError.range(start, 0, length, startName, message);
      }
      if (end !== null && (dart.notNull(end) < dart.notNull(start) || dart.notNull(end) > dart.notNull(length))) {
        if (endName === null)
          endName = "end";
        throw new RangeError.range(end, start, length, endName, message);
      }
    }
    static checkNotNegative(value, name, message) {
      if (name === void 0)
        name = null;
      if (message === void 0)
        message = null;
      if (dart.notNull(value) < 0)
        throw new RangeError.range(value, 0, null, name, message);
    }
    toString() {
      if (!dart.notNull(this[_hasValue]))
        return `RangeError: ${this.message}`;
      let value = Error.safeToString(this.invalidValue);
      let explanation = "";
      if (this.start === null) {
        if (this.end !== null) {
          explanation = `: Not less than or equal to ${this.end}`;
        }
      } else if (this.end === null) {
        explanation = `: Not greater than or equal to ${this.start}`;
      } else if (dart.notNull(this.end) > dart.notNull(this.start)) {
        explanation = `: Not in range ${this.start}..${this.end}, inclusive.`;
      } else if (dart.notNull(this.end) < dart.notNull(this.start)) {
        explanation = ": Valid value range is empty";
      } else {
        explanation = `: Only valid value is ${this.start}`;
      }
      return `RangeError: ${this.message} (${value})${explanation}`;
    }
  }
  dart.defineNamedConstructor(RangeError, 'value');
  dart.defineNamedConstructor(RangeError, 'range');
  dart.defineNamedConstructor(RangeError, 'index');
  class IndexError extends ArgumentError {
    IndexError(invalidValue, indexable, name, message, length) {
      if (name === void 0)
        name = null;
      if (message === void 0)
        message = null;
      if (length === void 0)
        length = null;
      this.indexable = indexable;
      this.length = dart.as(length !== null ? length : dart.dload(indexable, 'length'), int);
      super.ArgumentError$value(invalidValue, name, message !== null ? message : "Index out of range");
    }
    get start() {
      return 0;
    }
    get end() {
      return dart.notNull(this.length) - 1;
    }
    toString() {
      dart.assert(this[_hasValue]);
      let target = Error.safeToString(this.indexable);
      let explanation = `index should be less than ${this.length}`;
      if (dart.dbinary(this.invalidValue, '<', 0)) {
        explanation = "index must not be negative";
      }
      return `RangeError: ${this.message} (${target}[${this.invalidValue}]): ${explanation}`;
    }
  }
  class FallThroughError extends Error {
    FallThroughError() {
      super.Error();
    }
  }
  let _className = Symbol('_className');
  class AbstractClassInstantiationError extends Error {
    AbstractClassInstantiationError($_className) {
      this[_className] = $_className;
      super.Error();
    }
    toString() {
      return `Cannot instantiate abstract class: '${this[_className]}'`;
    }
  }
  let _receiver = Symbol('_receiver');
  let _memberName = Symbol('_memberName');
  let _arguments = Symbol('_arguments');
  let _namedArguments = Symbol('_namedArguments');
  let _existingArgumentNames = Symbol('_existingArgumentNames');
  class NoSuchMethodError extends Error {
    NoSuchMethodError(receiver, memberName, positionalArguments, namedArguments, existingArgumentNames) {
      if (existingArgumentNames === void 0)
        existingArgumentNames = null;
      this[_receiver] = receiver;
      this[_memberName] = memberName;
      this[_arguments] = positionalArguments;
      this[_namedArguments] = namedArguments;
      this[_existingArgumentNames] = existingArgumentNames;
      super.Error();
    }
    toString() {
      let sb = new StringBuffer();
      let i = 0;
      if (this[_arguments] !== null) {
        for (; dart.notNull(i) < dart.notNull(this[_arguments].length); i = dart.notNull(i) + 1) {
          if (dart.notNull(i) > 0) {
            sb.write(", ");
          }
          sb.write(Error.safeToString(this[_arguments].get(i)));
        }
      }
      if (this[_namedArguments] !== null) {
        this[_namedArguments].forEach(((key, value) => {
          if (dart.notNull(i) > 0) {
            sb.write(", ");
          }
          sb.write(_symbolToString(key));
          sb.write(": ");
          sb.write(Error.safeToString(value));
          i = dart.notNull(i) + 1;
        }).bind(this));
      }
      if (this[_existingArgumentNames] === null) {
        return `NoSuchMethodError : method not found: '${this[_memberName]}'\n` + `Receiver: ${Error.safeToString(this[_receiver])}\n` + `Arguments: [${sb}]`;
      } else {
        let actualParameters = sb.toString();
        sb = new StringBuffer();
        for (let i = 0; dart.notNull(i) < dart.notNull(this[_existingArgumentNames].length); i = dart.notNull(i) + 1) {
          if (dart.notNull(i) > 0) {
            sb.write(", ");
          }
          sb.write(this[_existingArgumentNames].get(i));
        }
        let formalParameters = sb.toString();
        return "NoSuchMethodError: incorrect number of arguments passed to " + `method named '${this[_memberName]}'\n` + `Receiver: ${Error.safeToString(this[_receiver])}\n` + `Tried calling: ${this[_memberName]}(${actualParameters})\n` + `Found: ${this[_memberName]}(${formalParameters})`;
      }
    }
  }
  class UnsupportedError extends Error {
    UnsupportedError(message) {
      this.message = message;
      super.Error();
    }
    toString() {
      return `Unsupported operation: ${this.message}`;
    }
  }
  class UnimplementedError extends Error {
    UnimplementedError(message) {
      if (message === void 0)
        message = null;
      this.message = message;
      super.Error();
    }
    toString() {
      return this.message !== null ? `UnimplementedError: ${this.message}` : "UnimplementedError";
    }
  }
  class StateError extends Error {
    StateError(message) {
      this.message = message;
      super.Error();
    }
    toString() {
      return `Bad state: ${this.message}`;
    }
  }
  class ConcurrentModificationError extends Error {
    ConcurrentModificationError(modifiedObject) {
      if (modifiedObject === void 0)
        modifiedObject = null;
      this.modifiedObject = modifiedObject;
      super.Error();
    }
    toString() {
      if (this.modifiedObject === null) {
        return "Concurrent modification during iteration.";
      }
      return "Concurrent modification during iteration: " + `${Error.safeToString(this.modifiedObject)}.`;
    }
  }
  class OutOfMemoryError extends dart.Object {
    OutOfMemoryError() {
    }
    toString() {
      return "Out of Memory";
    }
    get stackTrace() {
      return null;
    }
  }
  class StackOverflowError extends dart.Object {
    StackOverflowError() {
    }
    toString() {
      return "Stack Overflow";
    }
    get stackTrace() {
      return null;
    }
  }
  class CyclicInitializationError extends Error {
    CyclicInitializationError(variableName) {
      if (variableName === void 0)
        variableName = null;
      this.variableName = variableName;
      super.Error();
    }
    toString() {
      return this.variableName === null ? "Reading static variable during its initialization" : `Reading static variable '${this.variableName}' during its initialization`;
    }
  }
  class Exception extends dart.Object {
    Exception(message) {
      if (message === void 0)
        message = null;
      return new _ExceptionImplementation(message);
    }
  }
  class _ExceptionImplementation extends dart.Object {
    _ExceptionImplementation(message) {
      if (message === void 0)
        message = null;
      this.message = message;
    }
    toString() {
      if (this.message === null)
        return "Exception";
      return `Exception: ${this.message}`;
    }
  }
  class FormatException extends dart.Object {
    FormatException(message, source, offset) {
      if (message === void 0)
        message = "";
      if (source === void 0)
        source = null;
      if (offset === void 0)
        offset = -1;
      this.message = message;
      this.source = source;
      this.offset = offset;
    }
    toString() {
      let report = "FormatException";
      if (dart.notNull(this.message !== null) && dart.notNull(!dart.equals("", this.message))) {
        report = `${report}: ${this.message}`;
      }
      let offset = this.offset;
      if (!(typeof this.source == string)) {
        if (offset !== -1) {
          report = ` (at offset ${offset})`;
        }
        return report;
      }
      if (offset !== -1 && (dart.notNull(offset) < 0 || offset['>'](dart.dload(this.source, 'length')))) {
        offset = -1;
      }
      if (offset === -1) {
        let source = dart.as(this.source, String);
        if (dart.notNull(source.length) > 78) {
          source = String['+'](source.substring(0, 75), "...");
        }
        return `${report}\n${source}`;
      }
      let lineNum = 1;
      let lineStart = 0;
      let lastWasCR = null;
      for (let i = 0; dart.notNull(i) < dart.notNull(offset); i = dart.notNull(i) + 1) {
        let char = dart.as(dart.dinvoke(this.source, 'codeUnitAt', i), int);
        if (char === 10) {
          if (lineStart !== i || !dart.notNull(lastWasCR)) {
            lineNum = dart.notNull(lineNum) + 1;
          }
          lineStart = dart.notNull(i) + 1;
          lastWasCR = false;
        } else if (char === 13) {
          lineNum = dart.notNull(lineNum) + 1;
          lineStart = dart.notNull(i) + 1;
          lastWasCR = true;
        }
      }
      if (dart.notNull(lineNum) > 1) {
        report = ` (at line ${lineNum}, character ${dart.notNull(offset) - dart.notNull(lineStart) + 1})\n`;
      } else {
        report = ` (at character ${dart.notNull(offset) + 1})\n`;
      }
      let lineEnd = dart.as(dart.dload(this.source, 'length'), int);
      for (let i = offset; i['<'](dart.dload(this.source, 'length')); i = dart.notNull(i) + 1) {
        let char = dart.as(dart.dinvoke(this.source, 'codeUnitAt', i), int);
        if (char === 10 || char === 13) {
          lineEnd = i;
          break;
        }
      }
      let length = dart.notNull(lineEnd) - dart.notNull(lineStart);
      let start = lineStart;
      let end = lineEnd;
      let prefix = "";
      let postfix = "";
      if (dart.notNull(length) > 78) {
        let index = dart.notNull(offset) - dart.notNull(lineStart);
        if (dart.notNull(index) < 75) {
          end = dart.notNull(start) + 75;
          postfix = "...";
        } else if (dart.notNull(end) - dart.notNull(offset) < 75) {
          start = dart.notNull(end) - 75;
          prefix = "...";
        } else {
          start = dart.notNull(offset) - 36;
          end = dart.notNull(offset) + 36;
          prefix = postfix = "...";
        }
      }
      let slice = dart.as(dart.dinvoke(this.source, 'substring', start, end), String);
      let markOffset = dart.notNull(offset) - dart.notNull(start) + dart.notNull(prefix.length);
      return `${report}${prefix}${slice}${postfix}\n${String['*'](" ", markOffset)}^\n`;
    }
  }
  class IntegerDivisionByZeroException extends dart.Object {
    IntegerDivisionByZeroException() {
    }
    toString() {
      return "IntegerDivisionByZeroException";
    }
  }
  let _getKey = Symbol('_getKey');
  let Expando$ = dart.generic(function(T) {
    class Expando extends dart.Object {
      Expando(name) {
        if (name === void 0)
          name = null;
        this.name = name;
      }
      toString() {
        return `Expando:${this.name}`;
      }
      get(object) {
        let values = _js_helper.Primitives.getProperty(object, _EXPANDO_PROPERTY_NAME);
        return dart.as(values === null ? null : _js_helper.Primitives.getProperty(values, this[_getKey]()), T);
      }
      set(object, value) {
        let values = _js_helper.Primitives.getProperty(object, _EXPANDO_PROPERTY_NAME);
        if (values === null) {
          values = new Object();
          _js_helper.Primitives.setProperty(object, _EXPANDO_PROPERTY_NAME, values);
        }
        _js_helper.Primitives.setProperty(values, this[_getKey](), value);
      }
      [_getKey]() {
        let key = dart.as(_js_helper.Primitives.getProperty(this, _KEY_PROPERTY_NAME), String);
        if (key === null) {
          key = `expando$key$${(($tmp) => _keyCount = dart.notNull($tmp) + 1, $tmp)(_keyCount)}`;
          _js_helper.Primitives.setProperty(this, _KEY_PROPERTY_NAME, key);
        }
        return key;
      }
    }
    Expando._KEY_PROPERTY_NAME = 'expando$key';
    Expando._EXPANDO_PROPERTY_NAME = 'expando$values';
    Expando._keyCount = 0;
    return Expando;
  });
  let Expando = Expando$(dynamic);
  let _toMangledNames = Symbol('_toMangledNames');
  class Function extends dart.Object {
    static apply(function, positionalArguments, namedArguments) {
      if (namedArguments === void 0)
        namedArguments = null;
      return _js_helper.Primitives.applyFunction(function, positionalArguments, namedArguments === null ? null : _toMangledNames(namedArguments));
    }
    static [_toMangledNames](namedArguments) {
      let result = dart.as(dart.map(), Map$(String, dynamic));
      namedArguments.forEach((symbol, value) => {
        result.set(_symbolToString(dart.as(symbol, Symbol)), value);
      });
      return result;
    }
  }
  // Function identical: (Object, Object) → bool
  function identical(a, b) {
    return _js_helper.Primitives.identicalImplementation(a, b);
  }
  // Function identityHashCode: (Object) → int
  function identityHashCode(object) {
    return _js_helper.objectHashCode(object);
  }
  class int extends num {
    int$fromEnvironment(name, opt$) {
      let defaultValue = opt$.defaultValue === void 0 ? null : opt$.defaultValue;
      throw new UnsupportedError('int.fromEnvironment can only be used as a const constructor');
    }
    static parse(source, opt$) {
      let radix = opt$.radix === void 0 ? null : opt$.radix;
      let onError = opt$.onError === void 0 ? null : opt$.onError;
      return _js_helper.Primitives.parseInt(source, radix, onError);
    }
  }
  dart.defineNamedConstructor(int, 'fromEnvironment');
  class Invocation extends dart.Object {
    get isAccessor() {
      return dart.notNull(this.isGetter) || dart.notNull(this.isSetter);
    }
  }
  let Iterable$ = dart.generic(function(E) {
    class Iterable extends dart.Object {
      Iterable() {
      }
      Iterable$generate(count, generator) {
        if (generator === void 0)
          generator = null;
        if (dart.notNull(count) <= 0)
          return new _internal.EmptyIterable();
        return new _GeneratorIterable(count, generator);
      }
      join(separator) {
        if (separator === void 0)
          separator = "";
        let buffer = new StringBuffer();
        buffer.writeAll(this, separator);
        return buffer.toString();
      }
      [Symbol.iterator]() {
        var iterator = this.iterator;
        return {
          next() {
            var done = iterator.moveNext();
            return {done: done, current: done ? void 0 : iterator.current};
          }
        };
      }
    }
    dart.defineNamedConstructor(Iterable, 'generate');
    return Iterable;
  });
  let Iterable = Iterable$(dynamic);
  let _end = Symbol('_end');
  let _start = Symbol('_start');
  let _generator = Symbol('_generator');
  let _id = Symbol('_id');
  let _GeneratorIterable$ = dart.generic(function(E) {
    class _GeneratorIterable extends collection.IterableBase$(E) {
      _GeneratorIterable($_end, generator) {
        this[_end] = $_end;
        this[_start] = 0;
        this[_generator] = dart.as(generator !== null ? generator : _id, _Generator);
        super.IterableBase();
      }
      _GeneratorIterable$slice($_start, $_end, $_generator) {
        this[_start] = $_start;
        this[_end] = $_end;
        this[_generator] = $_generator;
        super.IterableBase();
      }
      get iterator() {
        return new _GeneratorIterator(this[_start], this[_end], this[_generator]);
      }
      get length() {
        return dart.notNull(this[_end]) - dart.notNull(this[_start]);
      }
      skip(count) {
        RangeError.checkNotNegative(count, "count");
        if (count === 0)
          return this;
        let newStart = dart.notNull(this[_start]) + dart.notNull(count);
        if (dart.notNull(newStart) >= dart.notNull(this[_end]))
          return new _internal.EmptyIterable();
        return new _GeneratorIterable.slice(newStart, this[_end], this[_generator]);
      }
      take(count) {
        RangeError.checkNotNegative(count, "count");
        if (count === 0)
          return new _internal.EmptyIterable();
        let newEnd = dart.notNull(this[_start]) + dart.notNull(count);
        if (dart.notNull(newEnd) >= dart.notNull(this[_end]))
          return this;
        return new _GeneratorIterable.slice(this[_start], newEnd, this[_generator]);
      }
      static [_id](n) {
        return n;
      }
    }
    dart.defineNamedConstructor(_GeneratorIterable, 'slice');
    return _GeneratorIterable;
  });
  let _GeneratorIterable = _GeneratorIterable$(dynamic);
  let _index = Symbol('_index');
  let _current = Symbol('_current');
  let _GeneratorIterator$ = dart.generic(function(E) {
    class _GeneratorIterator extends dart.Object {
      _GeneratorIterator($_index, $_end, $_generator) {
        this[_index] = $_index;
        this[_end] = $_end;
        this[_generator] = $_generator;
        this[_current] = null;
      }
      moveNext() {
        if (dart.notNull(this[_index]) < dart.notNull(this[_end])) {
          this[_current] = this[_generator](this[_index]);
          this[_index] = dart.notNull(this[_index]) + 1;
          return true;
        } else {
          this[_current] = null;
          return false;
        }
      }
      get current() {
        return this[_current];
      }
    }
    return _GeneratorIterator;
  });
  let _GeneratorIterator = _GeneratorIterator$(dynamic);
  let BidirectionalIterator$ = dart.generic(function(E) {
    class BidirectionalIterator extends dart.Object {
    }
    return BidirectionalIterator;
  });
  let BidirectionalIterator = BidirectionalIterator$(dynamic);
  let Iterator$ = dart.generic(function(E) {
    class Iterator extends dart.Object {
    }
    return Iterator;
  });
  let Iterator = Iterator$(dynamic);
  let List$ = dart.generic(function(E) {
    class List extends dart.Object {
      List(length) {
        if (length === void 0)
          length = new _ListConstructorSentinel();
        if (length === new _ListConstructorSentinel()) {
          return new _interceptors.JSArray.emptyGrowable();
        }
        return new _interceptors.JSArray.fixed(length);
      }
      List$filled(length, fill) {
        let result = new _interceptors.JSArray.fixed(length);
        if (length !== 0 && dart.notNull(fill !== null)) {
          for (let i = 0; dart.notNull(i) < dart.notNull(result.length); i = dart.notNull(i) + 1) {
            result.set(i, fill);
          }
        }
        return dart.as(result, List$(E));
      }
      List$from(elements, opt$) {
        let growable = opt$.growable === void 0 ? true : opt$.growable;
        let list = new List();
        for (let e of elements) {
          list.add(e);
        }
        if (growable)
          return list;
        return dart.as(_internal.makeListFixedLength(list), List$(E));
      }
      List$generate(length, generator, opt$) {
        let growable = opt$.growable === void 0 ? true : opt$.growable;
        let result = null;
        if (growable) {
          result = ((_) => {
            _.length = length;
            return _;
          }).bind(this)(new List.from([]));
        } else {
          result = new List(length);
        }
        for (let i = 0; dart.notNull(i) < dart.notNull(length); i = dart.notNull(i) + 1) {
          result.set(i, generator(i));
        }
        return result;
      }
    }
    dart.defineNamedConstructor(List, 'filled');
    dart.defineNamedConstructor(List, 'from');
    dart.defineNamedConstructor(List, 'generate');
    return List;
  });
  let List = List$(dynamic);
  let Map$ = dart.generic(function(K, V) {
    class Map extends dart.Object {
      Map() {
        return new collection.LinkedHashMap();
      }
      Map$from(other) {
        return new collection.LinkedHashMap.from(other);
      }
      Map$identity() {
        return new collection.LinkedHashMap.identity();
      }
      Map$fromIterable(iterable, opt$) {
        return new collection.LinkedHashMap.fromIterable(iterable, opt$);
      }
      Map$fromIterables(keys, values) {
        return new collection.LinkedHashMap.fromIterables(keys, values);
      }
    }
    dart.defineNamedConstructor(Map, 'from');
    dart.defineNamedConstructor(Map, 'identity');
    dart.defineNamedConstructor(Map, 'fromIterable');
    dart.defineNamedConstructor(Map, 'fromIterables');
    return Map;
  });
  let Map = Map$(dynamic, dynamic);
  class Null extends dart.Object {
    Null$_uninstantiable() {
      throw new UnsupportedError('class Null cannot be instantiated');
    }
    toString() {
      return "null";
    }
  }
  dart.defineNamedConstructor(Null, '_uninstantiable');
  let _onParseErrorInt = Symbol('_onParseErrorInt');
  let _onParseErrorDouble = Symbol('_onParseErrorDouble');
  class num extends dart.Object {
    static parse(input, onError) {
      if (onError === void 0)
        onError = null;
      let source = input.trim();
      _parseError = false;
      let result = int.parse(source, {onError: _onParseErrorInt});
      if (!dart.notNull(_parseError))
        return result;
      _parseError = false;
      result = double.parse(source, _onParseErrorDouble);
      if (!dart.notNull(_parseError))
        return result;
      if (onError === null)
        throw new FormatException(input);
      return onError(input);
    }
    static [_onParseErrorInt](_) {
      _parseError = true;
      return 0;
    }
    static [_onParseErrorDouble](_) {
      _parseError = true;
      return 0.0;
    }
  }
  num._parseError = false;
  class Object extends dart.Object {
    Object() {
    }
    ['=='](other) {
      return identical(this, other);
    }
    get hashCode() {
      return _js_helper.Primitives.objectHashCode(this);
    }
    toString() {
      return _js_helper.Primitives.objectToString(this);
    }
    noSuchMethod(invocation) {
      throw new NoSuchMethodError(this, invocation.memberName, invocation.positionalArguments, invocation.namedArguments);
    }
    get runtimeType() {
      return _js_helper.getRuntimeType(this);
    }
  }
  class Pattern extends dart.Object {
  }
  // Function print: (Object) → void
  function print(object) {
    let line = `${object}`;
    if (_internal.printToZone === null) {
      _internal.printToConsole(line);
    } else {
      dart.dinvokef(_internal.printToZone, line);
    }
  }
  class Match extends dart.Object {
  }
  class RegExp extends dart.Object {
    RegExp(source, opt$) {
      let multiLine = opt$.multiLine === void 0 ? false : opt$.multiLine;
      let caseSensitive = opt$.caseSensitive === void 0 ? true : opt$.caseSensitive;
      return new _js_helper.JSSyntaxRegExp(source, {multiLine: multiLine, caseSensitive: caseSensitive});
    }
  }
  let Set$ = dart.generic(function(E) {
    class Set extends collection.IterableBase$(E) {
      Set() {
        return new collection.LinkedHashSet();
      }
      Set$identity() {
        return new collection.LinkedHashSet.identity();
      }
      Set$from(elements) {
        return new collection.LinkedHashSet.from(elements);
      }
    }
    dart.defineNamedConstructor(Set, 'identity');
    dart.defineNamedConstructor(Set, 'from');
    return Set;
  });
  let Set = Set$(dynamic);
  let Sink$ = dart.generic(function(T) {
    class Sink extends dart.Object {
    }
    return Sink;
  });
  let Sink = Sink$(dynamic);
  class StackTrace extends dart.Object {
  }
  let _stop = Symbol('_stop');
  let _initTicker = Symbol('_initTicker');
  let _now = Symbol('_now');
  class Stopwatch extends dart.Object {
    get frequency() {
      return _frequency;
    }
    Stopwatch() {
      this[_start] = null;
      this[_stop] = null;
      _initTicker();
    }
    start() {
      if (this.isRunning)
        return;
      if (this[_start] === null) {
        this[_start] = _now();
      } else {
        this[_start] = dart.notNull(_now()) - (dart.notNull(this[_stop]) - dart.notNull(this[_start]));
        this[_stop] = null;
      }
    }
    stop() {
      if (!dart.notNull(this.isRunning))
        return;
      this[_stop] = _now();
    }
    reset() {
      if (this[_start] === null)
        return;
      this[_start] = _now();
      if (this[_stop] !== null) {
        this[_stop] = this[_start];
      }
    }
    get elapsedTicks() {
      if (this[_start] === null) {
        return 0;
      }
      return this[_stop] === null ? dart.notNull(_now()) - dart.notNull(this[_start]) : dart.notNull(this[_stop]) - dart.notNull(this[_start]);
    }
    get elapsed() {
      return new Duration({microseconds: this.elapsedMicroseconds});
    }
    get elapsedMicroseconds() {
      return (dart.notNull(this.elapsedTicks) * 1000000 / dart.notNull(this.frequency)).truncate();
    }
    get elapsedMilliseconds() {
      return (dart.notNull(this.elapsedTicks) * 1000 / dart.notNull(this.frequency)).truncate();
    }
    get isRunning() {
      return this[_start] !== null && this[_stop] === null;
    }
    static [_initTicker]() {
      _js_helper.Primitives.initTicker();
      _frequency = _js_helper.Primitives.timerFrequency;
    }
    static [_now]() {
      return dart.as(dart.dinvoke(_js_helper.Primitives, 'timerTicks'), int);
    }
  }
  Stopwatch._frequency = null;
  let _stringFromIterable = Symbol('_stringFromIterable');
  class String extends dart.Object {
    String$fromCharCodes(charCodes, start, end) {
      if (start === void 0)
        start = 0;
      if (end === void 0)
        end = null;
      if (!dart.is(charCodes, _interceptors.JSArray)) {
        return _stringFromIterable(charCodes, start, end);
      }
      let list = dart.as(charCodes, List);
      let len = list.length;
      if (dart.notNull(start) < 0 || dart.notNull(start) > dart.notNull(len)) {
        throw new RangeError.range(start, 0, len);
      }
      if (end === null) {
        end = len;
      } else if (dart.notNull(end) < dart.notNull(start) || dart.notNull(end) > dart.notNull(len)) {
        throw new RangeError.range(end, start, len);
      }
      if (dart.notNull(start) > 0 || dart.notNull(end) < dart.notNull(len)) {
        list = list.sublist(start, end);
      }
      return _js_helper.Primitives.stringFromCharCodes(list);
    }
    String$fromCharCode(charCode) {
      return _js_helper.Primitives.stringFromCharCode(charCode);
    }
    String$fromEnvironment(name, opt$) {
      let defaultValue = opt$.defaultValue === void 0 ? null : opt$.defaultValue;
      throw new UnsupportedError('String.fromEnvironment can only be used as a const constructor');
    }
    static [_stringFromIterable](charCodes, start, end) {
      if (dart.notNull(start) < 0)
        throw new RangeError.range(start, 0, charCodes.length);
      if (end !== null && dart.notNull(end) < dart.notNull(start)) {
        throw new RangeError.range(end, start, charCodes.length);
      }
      let it = charCodes.iterator;
      for (let i = 0; dart.notNull(i) < dart.notNull(start); i = dart.notNull(i) + 1) {
        if (!dart.notNull(it.moveNext())) {
          throw new RangeError.range(start, 0, i);
        }
      }
      let list = new List.from([]);
      if (end === null) {
        while (it.moveNext())
          list.add(it.current);
      } else {
        for (let i = start; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
          if (!dart.notNull(it.moveNext())) {
            throw new RangeError.range(end, start, i);
          }
          list.add(it.current);
        }
      }
      return _js_helper.Primitives.stringFromCharCodes(list);
    }
  }
  dart.defineNamedConstructor(String, 'fromCharCodes');
  dart.defineNamedConstructor(String, 'fromCharCode');
  dart.defineNamedConstructor(String, 'fromEnvironment');
  class Runes extends collection.IterableBase$(int) {
    Runes(string) {
      this.string = string;
      super.IterableBase();
    }
    get iterator() {
      return new RuneIterator(this.string);
    }
    get last() {
      if (this.string.length === 0) {
        throw new StateError('No elements.');
      }
      let length = this.string.length;
      let code = this.string.codeUnitAt(dart.notNull(length) - 1);
      if (dart.notNull(_isTrailSurrogate(code)) && dart.notNull(this.string.length) > 1) {
        let previousCode = this.string.codeUnitAt(dart.notNull(length) - 2);
        if (_isLeadSurrogate(previousCode)) {
          return _combineSurrogatePair(previousCode, code);
        }
      }
      return code;
    }
  }
  // Function _isLeadSurrogate: (int) → bool
  function _isLeadSurrogate(code) {
    return (dart.notNull(code) & 64512) === 55296;
  }
  // Function _isTrailSurrogate: (int) → bool
  function _isTrailSurrogate(code) {
    return (dart.notNull(code) & 64512) === 56320;
  }
  // Function _combineSurrogatePair: (int, int) → int
  function _combineSurrogatePair(start, end) {
    return 65536 + ((dart.notNull(start) & 1023) << 10) + (dart.notNull(end) & 1023);
  }
  let _position = Symbol('_position');
  let _nextPosition = Symbol('_nextPosition');
  let _currentCodePoint = Symbol('_currentCodePoint');
  let _checkSplitSurrogate = Symbol('_checkSplitSurrogate');
  class RuneIterator extends dart.Object {
    RuneIterator(string) {
      this.string = string;
      this[_position] = 0;
      this[_nextPosition] = 0;
      this[_currentCodePoint] = null;
    }
    RuneIterator$at(string, index) {
      this.string = string;
      this[_position] = index;
      this[_nextPosition] = index;
      this[_currentCodePoint] = null;
      RangeError.checkValueInInterval(index, 0, string.length);
      this[_checkSplitSurrogate](index);
    }
    [_checkSplitSurrogate](index) {
      if (dart.notNull(index) > 0 && dart.notNull(index) < dart.notNull(this.string.length) && dart.notNull(_isLeadSurrogate(this.string.codeUnitAt(dart.notNull(index) - 1))) && dart.notNull(_isTrailSurrogate(this.string.codeUnitAt(index)))) {
        throw new ArgumentError(`Index inside surrogate pair: ${index}`);
      }
    }
    get rawIndex() {
      return this[_position] !== this[_nextPosition] ? this[_position] : null;
    }
    set rawIndex(rawIndex) {
      RangeError.checkValidIndex(rawIndex, this.string, "rawIndex");
      this.reset(rawIndex);
      this.moveNext();
    }
    reset(rawIndex) {
      if (rawIndex === void 0)
        rawIndex = 0;
      RangeError.checkValueInInterval(rawIndex, 0, this.string.length, "rawIndex");
      this[_checkSplitSurrogate](rawIndex);
      this[_position] = this[_nextPosition] = rawIndex;
      this[_currentCodePoint] = null;
    }
    get current() {
      return this[_currentCodePoint];
    }
    get currentSize() {
      return dart.notNull(this[_nextPosition]) - dart.notNull(this[_position]);
    }
    get currentAsString() {
      if (this[_position] === this[_nextPosition])
        return null;
      if (dart.notNull(this[_position]) + 1 === this[_nextPosition])
        return this.string.get(this[_position]);
      return this.string.substring(this[_position], this[_nextPosition]);
    }
    moveNext() {
      this[_position] = this[_nextPosition];
      if (this[_position] === this.string.length) {
        this[_currentCodePoint] = null;
        return false;
      }
      let codeUnit = this.string.codeUnitAt(this[_position]);
      let nextPosition = dart.notNull(this[_position]) + 1;
      if (dart.notNull(_isLeadSurrogate(codeUnit)) && dart.notNull(nextPosition) < dart.notNull(this.string.length)) {
        let nextCodeUnit = this.string.codeUnitAt(nextPosition);
        if (_isTrailSurrogate(nextCodeUnit)) {
          this[_nextPosition] = dart.notNull(nextPosition) + 1;
          this[_currentCodePoint] = _combineSurrogatePair(codeUnit, nextCodeUnit);
          return true;
        }
      }
      this[_nextPosition] = nextPosition;
      this[_currentCodePoint] = codeUnit;
      return true;
    }
    movePrevious() {
      this[_nextPosition] = this[_position];
      if (this[_position] === 0) {
        this[_currentCodePoint] = null;
        return false;
      }
      let position = dart.notNull(this[_position]) - 1;
      let codeUnit = this.string.codeUnitAt(position);
      if (dart.notNull(_isTrailSurrogate(codeUnit)) && dart.notNull(position) > 0) {
        let prevCodeUnit = this.string.codeUnitAt(dart.notNull(position) - 1);
        if (_isLeadSurrogate(prevCodeUnit)) {
          this[_position] = dart.notNull(position) - 1;
          this[_currentCodePoint] = _combineSurrogatePair(prevCodeUnit, codeUnit);
          return true;
        }
      }
      this[_position] = position;
      this[_currentCodePoint] = codeUnit;
      return true;
    }
  }
  dart.defineNamedConstructor(RuneIterator, 'at');
  let _contents = Symbol('_contents');
  let _writeString = Symbol('_writeString');
  class StringBuffer extends dart.Object {
    StringBuffer(content) {
      if (content === void 0)
        content = "";
      this[_contents] = `${content}`;
    }
    get length() {
      return this[_contents].length;
    }
    get isEmpty() {
      return this.length === 0;
    }
    get isNotEmpty() {
      return !dart.notNull(this.isEmpty);
    }
    write(obj) {
      this[_writeString](`${obj}`);
    }
    writeCharCode(charCode) {
      this[_writeString](new String.fromCharCode(charCode));
    }
    writeAll(objects, separator) {
      if (separator === void 0)
        separator = "";
      let iterator = objects.iterator;
      if (!dart.notNull(iterator.moveNext()))
        return;
      if (separator.isEmpty) {
        do {
          this.write(iterator.current);
        } while (iterator.moveNext());
      } else {
        this.write(iterator.current);
        while (iterator.moveNext()) {
          this.write(separator);
          this.write(iterator.current);
        }
      }
    }
    writeln(obj) {
      if (obj === void 0)
        obj = "";
      this.write(obj);
      this.write("\n");
    }
    clear() {
      this[_contents] = "";
    }
    toString() {
      return _js_helper.Primitives.flattenString(this[_contents]);
    }
    [_writeString](str) {
      this[_contents] = _js_helper.Primitives.stringConcatUnchecked(this[_contents], dart.as(str, String));
    }
  }
  class StringSink extends dart.Object {
  }
  class Symbol extends dart.Object {
    Symbol(name) {
      return new _internal.Symbol(name);
    }
  }
  class Type extends dart.Object {
  }
  let _writeAuthority = Symbol('_writeAuthority');
  let _userInfo = Symbol('_userInfo');
  let _host = Symbol('_host');
  let _port = Symbol('_port');
  let _defaultPort = Symbol('_defaultPort');
  let _path = Symbol('_path');
  let _query = Symbol('_query');
  let _fragment = Symbol('_fragment');
  let _fail = Symbol('_fail');
  let _pathSegments = Symbol('_pathSegments');
  let _queryParameters = Symbol('_queryParameters');
  let _makeHttpUri = Symbol('_makeHttpUri');
  let _isWindows = Symbol('_isWindows');
  let _checkNonWindowsPathReservedCharacters = Symbol('_checkNonWindowsPathReservedCharacters');
  let _checkWindowsPathReservedCharacters = Symbol('_checkWindowsPathReservedCharacters');
  let _checkWindowsDriveLetter = Symbol('_checkWindowsDriveLetter');
  let _makeFileUri = Symbol('_makeFileUri');
  let _makeWindowsFileUrl = Symbol('_makeWindowsFileUrl');
  let _makePort = Symbol('_makePort');
  let _makeHost = Symbol('_makeHost');
  let _isRegNameChar = Symbol('_isRegNameChar');
  let _normalizeRegName = Symbol('_normalizeRegName');
  let _makeScheme = Symbol('_makeScheme');
  let _makeUserInfo = Symbol('_makeUserInfo');
  let _makePath = Symbol('_makePath');
  let _makeQuery = Symbol('_makeQuery');
  let _makeFragment = Symbol('_makeFragment');
  let _stringOrNullLength = Symbol('_stringOrNullLength');
  let _isHexDigit = Symbol('_isHexDigit');
  let _hexValue = Symbol('_hexValue');
  let _normalizeEscape = Symbol('_normalizeEscape');
  let _isUnreservedChar = Symbol('_isUnreservedChar');
  let _escapeChar = Symbol('_escapeChar');
  let _normalize = Symbol('_normalize');
  let _isSchemeCharacter = Symbol('_isSchemeCharacter');
  let _isGeneralDelimiter = Symbol('_isGeneralDelimiter');
  let _merge = Symbol('_merge');
  let _hasDotSegments = Symbol('_hasDotSegments');
  let _removeDotSegments = Symbol('_removeDotSegments');
  let _toWindowsFilePath = Symbol('_toWindowsFilePath');
  let _toFilePath = Symbol('_toFilePath');
  let _isPathAbsolute = Symbol('_isPathAbsolute');
  let _addIfNonEmpty = Symbol('_addIfNonEmpty');
  let _uriEncode = Symbol('_uriEncode');
  let _hexCharPairToByte = Symbol('_hexCharPairToByte');
  let _uriDecode = Symbol('_uriDecode');
  let _isAlphabeticCharacter = Symbol('_isAlphabeticCharacter');
  class Uri extends dart.Object {
    get authority() {
      if (!dart.notNull(this.hasAuthority))
        return "";
      let sb = new StringBuffer();
      this[_writeAuthority](sb);
      return sb.toString();
    }
    get userInfo() {
      return this[_userInfo];
    }
    get host() {
      if (this[_host] === null)
        return "";
      if (this[_host].startsWith('[')) {
        return this[_host].substring(1, dart.notNull(this[_host].length) - 1);
      }
      return this[_host];
    }
    get port() {
      if (this[_port] === null)
        return _defaultPort(this.scheme);
      return this[_port];
    }
    static [_defaultPort](scheme) {
      if (dart.equals(scheme, "http"))
        return 80;
      if (dart.equals(scheme, "https"))
        return 443;
      return 0;
    }
    get path() {
      return this[_path];
    }
    get query() {
      return this[_query] === null ? "" : this[_query];
    }
    get fragment() {
      return this[_fragment] === null ? "" : this[_fragment];
    }
    static parse(uri) {
      // Function isRegName: (int) → bool
      function isRegName(ch) {
        return dart.notNull(ch) < 128 && dart.notNull(!dart.equals(dart.dbinary(dart.dindex(_regNameTable, dart.notNull(ch) >> 4), '&', 1 << (dart.notNull(ch) & 15)), 0));
      }
      let EOI = -1;
      let scheme = "";
      let userinfo = "";
      let host = null;
      let port = null;
      let path = null;
      let query = null;
      let fragment = null;
      let index = 0;
      let pathStart = 0;
      let char = EOI;
      // Function parseAuth: () → void
      function parseAuth() {
        if (index === uri.length) {
          char = EOI;
          return;
        }
        let authStart = index;
        let lastColon = -1;
        let lastAt = -1;
        char = uri.codeUnitAt(index);
        while (dart.notNull(index) < dart.notNull(uri.length)) {
          char = uri.codeUnitAt(index);
          if (char === _SLASH || char === _QUESTION || char === _NUMBER_SIGN) {
            break;
          }
          if (char === _AT_SIGN) {
            lastAt = index;
            lastColon = -1;
          } else if (char === _COLON) {
            lastColon = index;
          } else if (char === _LEFT_BRACKET) {
            lastColon = -1;
            let endBracket = uri.indexOf(']', dart.notNull(index) + 1);
            if (endBracket === -1) {
              index = uri.length;
              char = EOI;
              break;
            } else {
              index = endBracket;
            }
          }
          index = dart.notNull(index) + 1;
          char = EOI;
        }
        let hostStart = authStart;
        let hostEnd = index;
        if (dart.notNull(lastAt) >= 0) {
          userinfo = _makeUserInfo(uri, authStart, lastAt);
          hostStart = dart.notNull(lastAt) + 1;
        }
        if (dart.notNull(lastColon) >= 0) {
          let portNumber = null;
          if (dart.notNull(lastColon) + 1 < dart.notNull(index)) {
            portNumber = 0;
            for (let i = dart.notNull(lastColon) + 1; dart.notNull(i) < dart.notNull(index); i = dart.notNull(i) + 1) {
              let digit = uri.codeUnitAt(i);
              if (dart.notNull(_ZERO) > dart.notNull(digit) || dart.notNull(_NINE) < dart.notNull(digit)) {
                _fail(uri, i, "Invalid port number");
              }
              portNumber = dart.notNull(portNumber) * 10 + (dart.notNull(digit) - dart.notNull(_ZERO));
            }
          }
          port = _makePort(portNumber, scheme);
          hostEnd = lastColon;
        }
        host = _makeHost(uri, hostStart, hostEnd, true);
        if (dart.notNull(index) < dart.notNull(uri.length)) {
          char = uri.codeUnitAt(index);
        }
      }
      let NOT_IN_PATH = 0;
      let IN_PATH = 1;
      let ALLOW_AUTH = 2;
      let state = NOT_IN_PATH;
      let i = index;
      while (dart.notNull(i) < dart.notNull(uri.length)) {
        char = uri.codeUnitAt(i);
        if (char === _QUESTION || char === _NUMBER_SIGN) {
          state = NOT_IN_PATH;
          break;
        }
        if (char === _SLASH) {
          state = i === 0 ? ALLOW_AUTH : IN_PATH;
          break;
        }
        if (char === _COLON) {
          if (i === 0)
            _fail(uri, 0, "Invalid empty scheme");
          scheme = _makeScheme(uri, i);
          i = dart.notNull(i) + 1;
          pathStart = i;
          if (i === uri.length) {
            char = EOI;
            state = NOT_IN_PATH;
          } else {
            char = uri.codeUnitAt(i);
            if (char === _QUESTION || char === _NUMBER_SIGN) {
              state = NOT_IN_PATH;
            } else if (char === _SLASH) {
              state = ALLOW_AUTH;
            } else {
              state = IN_PATH;
            }
          }
          break;
        }
        i = dart.notNull(i) + 1;
        char = EOI;
      }
      index = i;
      if (state === ALLOW_AUTH) {
        dart.assert(char === _SLASH);
        index = dart.notNull(index) + 1;
        if (index === uri.length) {
          char = EOI;
          state = NOT_IN_PATH;
        } else {
          char = uri.codeUnitAt(index);
          if (char === _SLASH) {
            index = dart.notNull(index) + 1;
            parseAuth();
            pathStart = index;
          }
          if (char === _QUESTION || char === _NUMBER_SIGN || char === EOI) {
            state = NOT_IN_PATH;
          } else {
            state = IN_PATH;
          }
        }
      }
      dart.assert(state === IN_PATH || state === NOT_IN_PATH);
      if (state === IN_PATH) {
        while ((index = dart.notNull(index) + 1) < dart.notNull(uri.length)) {
          char = uri.codeUnitAt(index);
          if (char === _QUESTION || char === _NUMBER_SIGN) {
            break;
          }
          char = EOI;
        }
        state = NOT_IN_PATH;
      }
      dart.assert(state === NOT_IN_PATH);
      let isFile = dart.equals(scheme, "file");
      let ensureLeadingSlash = host !== null;
      path = _makePath(uri, pathStart, index, null, ensureLeadingSlash, isFile);
      if (char === _QUESTION) {
        let numberSignIndex = uri.indexOf('#', dart.notNull(index) + 1);
        if (dart.notNull(numberSignIndex) < 0) {
          query = _makeQuery(uri, dart.notNull(index) + 1, uri.length, null);
        } else {
          query = _makeQuery(uri, dart.notNull(index) + 1, numberSignIndex, null);
          fragment = _makeFragment(uri, dart.notNull(numberSignIndex) + 1, uri.length);
        }
      } else if (char === _NUMBER_SIGN) {
        fragment = _makeFragment(uri, dart.notNull(index) + 1, uri.length);
      }
      return new Uri._internal(scheme, userinfo, host, port, path, query, fragment);
    }
    static [_fail](uri, index, message) {
      throw new FormatException(message, uri, index);
    }
    Uri$_internal(scheme, $_userInfo, $_host, $_port, $_path, $_query, $_fragment) {
      this.scheme = scheme;
      this[_userInfo] = $_userInfo;
      this[_host] = $_host;
      this[_port] = $_port;
      this[_path] = $_path;
      this[_query] = $_query;
      this[_fragment] = $_fragment;
      this[_pathSegments] = null;
      this[_queryParameters] = null;
    }
    Uri(opt$) {
      let scheme = opt$.scheme === void 0 ? "" : opt$.scheme;
      let userInfo = opt$.userInfo === void 0 ? "" : opt$.userInfo;
      let host = opt$.host === void 0 ? null : opt$.host;
      let port = opt$.port === void 0 ? null : opt$.port;
      let path = opt$.path === void 0 ? null : opt$.path;
      let pathSegments = opt$.pathSegments === void 0 ? null : opt$.pathSegments;
      let query = opt$.query === void 0 ? null : opt$.query;
      let queryParameters = opt$.queryParameters === void 0 ? null : opt$.queryParameters;
      let fragment = opt$.fragment === void 0 ? null : opt$.fragment;
      scheme = _makeScheme(scheme, _stringOrNullLength(scheme));
      userInfo = _makeUserInfo(userInfo, 0, _stringOrNullLength(userInfo));
      host = _makeHost(host, 0, _stringOrNullLength(host), false);
      if (dart.equals(query, ""))
        query = null;
      query = _makeQuery(query, 0, _stringOrNullLength(query), queryParameters);
      fragment = _makeFragment(fragment, 0, _stringOrNullLength(fragment));
      port = _makePort(port, scheme);
      let isFile = dart.equals(scheme, "file");
      if (dart.notNull(host === null) && (dart.notNull(userInfo.isNotEmpty) || port !== null || dart.notNull(isFile))) {
        host = "";
      }
      let ensureLeadingSlash = host !== null;
      path = _makePath(path, 0, _stringOrNullLength(path), pathSegments, ensureLeadingSlash, isFile);
      return new Uri._internal(scheme, userInfo, host, port, path, query, fragment);
    }
    Uri$http(authority, unencodedPath, queryParameters) {
      if (queryParameters === void 0)
        queryParameters = null;
      return _makeHttpUri("http", authority, unencodedPath, queryParameters);
    }
    Uri$https(authority, unencodedPath, queryParameters) {
      if (queryParameters === void 0)
        queryParameters = null;
      return _makeHttpUri("https", authority, unencodedPath, queryParameters);
    }
    static [_makeHttpUri](scheme, authority, unencodedPath, queryParameters) {
      let userInfo = "";
      let host = null;
      let port = null;
      if (dart.notNull(authority !== null) && dart.notNull(authority.isNotEmpty)) {
        let hostStart = 0;
        let hasUserInfo = false;
        for (let i = 0; dart.notNull(i) < dart.notNull(authority.length); i = dart.notNull(i) + 1) {
          if (authority.codeUnitAt(i) === _AT_SIGN) {
            hasUserInfo = true;
            userInfo = authority.substring(0, i);
            hostStart = dart.notNull(i) + 1;
            break;
          }
        }
        let hostEnd = hostStart;
        if (dart.notNull(hostStart) < dart.notNull(authority.length) && authority.codeUnitAt(hostStart) === _LEFT_BRACKET) {
          for (; dart.notNull(hostEnd) < dart.notNull(authority.length); hostEnd = dart.notNull(hostEnd) + 1) {
            if (authority.codeUnitAt(hostEnd) === _RIGHT_BRACKET)
              break;
          }
          if (hostEnd === authority.length) {
            throw new FormatException("Invalid IPv6 host entry.", authority, hostStart);
          }
          parseIPv6Address(authority, dart.notNull(hostStart) + 1, hostEnd);
          hostEnd = dart.notNull(hostEnd) + 1;
          if (hostEnd !== authority.length && authority.codeUnitAt(hostEnd) !== _COLON) {
            throw new FormatException("Invalid end of authority", authority, hostEnd);
          }
        }
        let hasPort = false;
        for (; dart.notNull(hostEnd) < dart.notNull(authority.length); hostEnd = dart.notNull(hostEnd) + 1) {
          if (authority.codeUnitAt(hostEnd) === _COLON) {
            let portString = authority.substring(dart.notNull(hostEnd) + 1);
            if (portString.isNotEmpty)
              port = int.parse(portString);
            break;
          }
        }
        host = authority.substring(hostStart, hostEnd);
      }
      return new Uri({scheme: scheme, userInfo: userInfo, host: dart.as(host, String), port: dart.as(port, int), pathSegments: unencodedPath.split("/"), queryParameters: queryParameters});
    }
    Uri$file(path, opt$) {
      let windows = opt$.windows === void 0 ? null : opt$.windows;
      windows = windows === null ? Uri[_isWindows] : windows;
      return dart.as(windows ? _makeWindowsFileUrl(path) : _makeFileUri(path), Uri);
    }
    static get base() {
      let uri = _js_helper.Primitives.currentUri();
      if (uri !== null)
        return Uri.parse(uri);
      throw new UnsupportedError("'Uri.base' is not supported");
    }
    static get [_isWindows]() {
      return false;
    }
    static [_checkNonWindowsPathReservedCharacters](segments, argumentError) {
      segments.forEach((segment) => {
        if (dart.dinvoke(segment, 'contains', "/")) {
          if (argumentError) {
            throw new ArgumentError(`Illegal path character ${segment}`);
          } else {
            throw new UnsupportedError(`Illegal path character ${segment}`);
          }
        }
      });
    }
    static [_checkWindowsPathReservedCharacters](segments, argumentError, firstSegment) {
      if (firstSegment === void 0)
        firstSegment = 0;
      segments.skip(firstSegment).forEach((segment) => {
        if (dart.dinvoke(segment, 'contains', new RegExp('["*/:<>?\\\\|]'))) {
          if (argumentError) {
            throw new ArgumentError("Illegal character in path");
          } else {
            throw new UnsupportedError("Illegal character in path");
          }
        }
      });
    }
    static [_checkWindowsDriveLetter](charCode, argumentError) {
      if (dart.notNull(_UPPER_CASE_A) <= dart.notNull(charCode) && dart.notNull(charCode) <= dart.notNull(_UPPER_CASE_Z) || dart.notNull(_LOWER_CASE_A) <= dart.notNull(charCode) && dart.notNull(charCode) <= dart.notNull(_LOWER_CASE_Z)) {
        return;
      }
      if (argumentError) {
        throw new ArgumentError(String['+']("Illegal drive letter ", new String.fromCharCode(charCode)));
      } else {
        throw new UnsupportedError(String['+']("Illegal drive letter ", new String.fromCharCode(charCode)));
      }
    }
    static [_makeFileUri](path) {
      let sep = "/";
      if (path.startsWith(sep)) {
        return new Uri({scheme: "file", pathSegments: path.split(sep)});
      } else {
        return new Uri({pathSegments: path.split(sep)});
      }
    }
    static [_makeWindowsFileUrl](path) {
      if (path.startsWith("\\\\?\\")) {
        if (path.startsWith("\\\\?\\UNC\\")) {
          path = `\\${path.substring(7)}`;
        } else {
          path = path.substring(4);
          if (dart.notNull(path.length) < 3 || path.codeUnitAt(1) !== _COLON || path.codeUnitAt(2) !== _BACKSLASH) {
            throw new ArgumentError("Windows paths with \\\\?\\ prefix must be absolute");
          }
        }
      } else {
        path = path.replaceAll("/", "\\");
      }
      let sep = "\\";
      if (dart.notNull(path.length) > 1 && dart.notNull(dart.equals(path.get(1), ":"))) {
        _checkWindowsDriveLetter(path.codeUnitAt(0), true);
        if (path.length === 2 || path.codeUnitAt(2) !== _BACKSLASH) {
          throw new ArgumentError("Windows paths with drive letter must be absolute");
        }
        let pathSegments = path.split(sep);
        _checkWindowsPathReservedCharacters(pathSegments, true, 1);
        return new Uri({scheme: "file", pathSegments: pathSegments});
      }
      if (dart.notNull(path.length) > 0 && dart.notNull(dart.equals(path.get(0), sep))) {
        if (dart.notNull(path.length) > 1 && dart.notNull(dart.equals(path.get(1), sep))) {
          let pathStart = path.indexOf("\\", 2);
          let hostPart = pathStart === -1 ? path.substring(2) : path.substring(2, pathStart);
          let pathPart = pathStart === -1 ? "" : path.substring(dart.notNull(pathStart) + 1);
          let pathSegments = pathPart.split(sep);
          _checkWindowsPathReservedCharacters(pathSegments, true);
          return new Uri({scheme: "file", host: hostPart, pathSegments: pathSegments});
        } else {
          let pathSegments = path.split(sep);
          _checkWindowsPathReservedCharacters(pathSegments, true);
          return new Uri({scheme: "file", pathSegments: pathSegments});
        }
      } else {
        let pathSegments = path.split(sep);
        _checkWindowsPathReservedCharacters(pathSegments, true);
        return new Uri({pathSegments: pathSegments});
      }
    }
    replace(opt$) {
      let scheme = opt$.scheme === void 0 ? null : opt$.scheme;
      let userInfo = opt$.userInfo === void 0 ? null : opt$.userInfo;
      let host = opt$.host === void 0 ? null : opt$.host;
      let port = opt$.port === void 0 ? null : opt$.port;
      let path = opt$.path === void 0 ? null : opt$.path;
      let pathSegments = opt$.pathSegments === void 0 ? null : opt$.pathSegments;
      let query = opt$.query === void 0 ? null : opt$.query;
      let queryParameters = opt$.queryParameters === void 0 ? null : opt$.queryParameters;
      let fragment = opt$.fragment === void 0 ? null : opt$.fragment;
      let schemeChanged = false;
      if (scheme !== null) {
        scheme = _makeScheme(scheme, scheme.length);
        schemeChanged = true;
      } else {
        scheme = this.scheme;
      }
      let isFile = dart.equals(scheme, "file");
      if (userInfo !== null) {
        userInfo = _makeUserInfo(userInfo, 0, userInfo.length);
      } else {
        userInfo = this.userInfo;
      }
      if (port !== null) {
        port = _makePort(port, scheme);
      } else {
        port = this[_port];
        if (schemeChanged) {
          port = _makePort(port, scheme);
        }
      }
      if (host !== null) {
        host = _makeHost(host, 0, host.length, false);
      } else if (this.hasAuthority) {
        host = this.host;
      } else if (dart.notNull(userInfo.isNotEmpty) || port !== null || dart.notNull(isFile)) {
        host = "";
      }
      let ensureLeadingSlash = host !== null;
      if (dart.notNull(path !== null) || dart.notNull(pathSegments !== null)) {
        path = _makePath(path, 0, _stringOrNullLength(path), pathSegments, ensureLeadingSlash, isFile);
      } else {
        path = this.path;
        if ((dart.notNull(isFile) || dart.notNull(ensureLeadingSlash) && !dart.notNull(path.isEmpty)) && !dart.notNull(path.startsWith('/'))) {
          path = `/${path}`;
        }
      }
      if (dart.notNull(query !== null) || dart.notNull(queryParameters !== null)) {
        query = _makeQuery(query, 0, _stringOrNullLength(query), queryParameters);
      } else if (this.hasQuery) {
        query = this.query;
      }
      if (fragment !== null) {
        fragment = _makeFragment(fragment, 0, fragment.length);
      } else if (this.hasFragment) {
        fragment = this.fragment;
      }
      return new Uri._internal(scheme, userInfo, host, port, path, query, fragment);
    }
    get pathSegments() {
      if (this[_pathSegments] === null) {
        let pathToSplit = !dart.notNull(this.path.isEmpty) && this.path.codeUnitAt(0) === _SLASH ? this.path.substring(1) : this.path;
        this[_pathSegments] = dart.as(new collection.UnmodifiableListView(dart.equals(pathToSplit, "") ? /* Unimplemented const */new List.from([]) : pathToSplit.split("/").map(Uri.decodeComponent).toList({growable: false})), List$(String));
      }
      return this[_pathSegments];
    }
    get queryParameters() {
      if (this[_queryParameters] === null) {
        this[_queryParameters] = dart.as(new collection.UnmodifiableMapView(splitQueryString(this.query)), Map$(String, String));
      }
      return this[_queryParameters];
    }
    static [_makePort](port, scheme) {
      if (port !== null && port === _defaultPort(scheme))
        return null;
      return port;
    }
    static [_makeHost](host, start, end, strictIPv6) {
      if (host === null)
        return null;
      if (start === end)
        return "";
      if (host.codeUnitAt(start) === _LEFT_BRACKET) {
        if (host.codeUnitAt(dart.notNull(end) - 1) !== _RIGHT_BRACKET) {
          _fail(host, start, 'Missing end `]` to match `[` in host');
        }
        parseIPv6Address(host, dart.notNull(start) + 1, dart.notNull(end) - 1);
        return host.substring(start, end).toLowerCase();
      }
      if (!dart.notNull(strictIPv6)) {
        for (let i = start; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
          if (host.codeUnitAt(i) === _COLON) {
            parseIPv6Address(host, start, end);
            return `[${host}]`;
          }
        }
      }
      return _normalizeRegName(host, start, end);
    }
    static [_isRegNameChar](char) {
      return dart.notNull(char) < 127 && dart.notNull(!dart.equals(dart.dbinary(dart.dindex(_regNameTable, dart.notNull(char) >> 4), '&', 1 << (dart.notNull(char) & 15)), 0));
    }
    static [_normalizeRegName](host, start, end) {
      let buffer = null;
      let sectionStart = start;
      let index = start;
      let isNormalized = true;
      while (dart.notNull(index) < dart.notNull(end)) {
        let char = host.codeUnitAt(index);
        if (char === _PERCENT) {
          let replacement = _normalizeEscape(host, index, true);
          if (dart.notNull(replacement === null) && dart.notNull(isNormalized)) {
            index = 3;
            continue;
          }
          if (buffer === null)
            buffer = new StringBuffer();
          let slice = host.substring(sectionStart, index);
          if (!dart.notNull(isNormalized))
            slice = slice.toLowerCase();
          buffer.write(slice);
          let sourceLength = 3;
          if (replacement === null) {
            replacement = host.substring(index, dart.notNull(index) + 3);
          } else if (dart.equals(replacement, "%")) {
            replacement = "%25";
            sourceLength = 1;
          }
          buffer.write(replacement);
          index = sourceLength;
          sectionStart = index;
          isNormalized = true;
        } else if (_isRegNameChar(char)) {
          if (dart.notNull(isNormalized) && dart.notNull(_UPPER_CASE_A) <= dart.notNull(char) && dart.notNull(_UPPER_CASE_Z) >= dart.notNull(char)) {
            if (buffer === null)
              buffer = new StringBuffer();
            if (dart.notNull(sectionStart) < dart.notNull(index)) {
              buffer.write(host.substring(sectionStart, index));
              sectionStart = index;
            }
            isNormalized = false;
          }
          index = dart.notNull(index) + 1;
        } else if (_isGeneralDelimiter(char)) {
          _fail(host, index, "Invalid character");
        } else {
          let sourceLength = 1;
          if ((dart.notNull(char) & 64512) === 55296 && dart.notNull(index) + 1 < dart.notNull(end)) {
            let tail = host.codeUnitAt(dart.notNull(index) + 1);
            if ((dart.notNull(tail) & 64512) === 56320) {
              char = 65536 | (dart.notNull(char) & 1023) << 10 | dart.notNull(tail) & 1023;
              sourceLength = 2;
            }
          }
          if (buffer === null)
            buffer = new StringBuffer();
          let slice = host.substring(sectionStart, index);
          if (!dart.notNull(isNormalized))
            slice = slice.toLowerCase();
          buffer.write(slice);
          buffer.write(_escapeChar(char));
          index = sourceLength;
          sectionStart = index;
        }
      }
      if (buffer === null)
        return host.substring(start, end);
      if (dart.notNull(sectionStart) < dart.notNull(end)) {
        let slice = host.substring(sectionStart, end);
        if (!dart.notNull(isNormalized))
          slice = slice.toLowerCase();
        buffer.write(slice);
      }
      return buffer.toString();
    }
    static [_makeScheme](scheme, end) {
      if (end === 0)
        return "";
      let firstCodeUnit = scheme.codeUnitAt(0);
      if (!dart.notNull(_isAlphabeticCharacter(firstCodeUnit))) {
        _fail(scheme, 0, "Scheme not starting with alphabetic character");
      }
      let allLowercase = dart.notNull(firstCodeUnit) >= dart.notNull(_LOWER_CASE_A);
      for (let i = 0; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
        let codeUnit = scheme.codeUnitAt(i);
        if (!dart.notNull(_isSchemeCharacter(codeUnit))) {
          _fail(scheme, i, "Illegal scheme character");
        }
        if (dart.notNull(codeUnit) < dart.notNull(_LOWER_CASE_A) || dart.notNull(codeUnit) > dart.notNull(_LOWER_CASE_Z)) {
          allLowercase = false;
        }
      }
      scheme = scheme.substring(0, end);
      if (!dart.notNull(allLowercase))
        scheme = scheme.toLowerCase();
      return scheme;
    }
    static [_makeUserInfo](userInfo, start, end) {
      if (userInfo === null)
        return "";
      return _normalize(userInfo, start, end, dart.as(_userinfoTable, List$(int)));
    }
    static [_makePath](path, start, end, pathSegments, ensureLeadingSlash, isFile) {
      if (dart.notNull(path === null) && dart.notNull(pathSegments === null))
        return isFile ? "/" : "";
      if (dart.notNull(path !== null) && dart.notNull(pathSegments !== null)) {
        throw new ArgumentError('Both path and pathSegments specified');
      }
      let result = null;
      if (path !== null) {
        result = _normalize(path, start, end, dart.as(_pathCharOrSlashTable, List$(int)));
      } else {
        result = pathSegments.map((s) => _uriEncode(dart.as(_pathCharTable, List$(int)), dart.as(s, String))).join("/");
      }
      if (dart.dload(result, 'isEmpty')) {
        if (isFile)
          return "/";
      } else if ((dart.notNull(isFile) || dart.notNull(ensureLeadingSlash)) && dart.notNull(!dart.equals(dart.dinvoke(result, 'codeUnitAt', 0), _SLASH))) {
        return `/${result}`;
      }
      return dart.as(result, String);
    }
    static [_makeQuery](query, start, end, queryParameters) {
      if (dart.notNull(query === null) && dart.notNull(queryParameters === null))
        return null;
      if (dart.notNull(query !== null) && dart.notNull(queryParameters !== null)) {
        throw new ArgumentError('Both query and queryParameters specified');
      }
      if (query !== null)
        return _normalize(query, start, end, dart.as(_queryCharTable, List$(int)));
      let result = new StringBuffer();
      let first = true;
      queryParameters.forEach(((key, value) => {
        if (!dart.notNull(first)) {
          result.write("&");
        }
        first = false;
        result.write(Uri.encodeQueryComponent(dart.as(key, String)));
        if (dart.notNull(value !== null) && dart.notNull(dart.dunary('!', dart.dload(value, 'isEmpty')))) {
          result.write("=");
          result.write(Uri.encodeQueryComponent(dart.as(value, String)));
        }
      }).bind(this));
      return result.toString();
    }
    static [_makeFragment](fragment, start, end) {
      if (fragment === null)
        return null;
      return _normalize(fragment, start, end, dart.as(_queryCharTable, List$(int)));
    }
    static [_stringOrNullLength](s) {
      return s === null ? 0 : s.length;
    }
    static [_isHexDigit](char) {
      if (dart.notNull(_NINE) >= dart.notNull(char))
        return dart.notNull(_ZERO) <= dart.notNull(char);
      char = 32;
      return dart.notNull(_LOWER_CASE_A) <= dart.notNull(char) && dart.notNull(_LOWER_CASE_F) >= dart.notNull(char);
    }
    static [_hexValue](char) {
      dart.assert(_isHexDigit(char));
      if (dart.notNull(_NINE) >= dart.notNull(char))
        return dart.notNull(char) - dart.notNull(_ZERO);
      char = 32;
      return dart.notNull(char) - (dart.notNull(_LOWER_CASE_A) - 10);
    }
    static [_normalizeEscape](source, index, lowerCase) {
      dart.assert(source.codeUnitAt(index) === _PERCENT);
      if (dart.notNull(index) + 2 >= dart.notNull(source.length)) {
        return "%";
      }
      let firstDigit = source.codeUnitAt(dart.notNull(index) + 1);
      let secondDigit = source.codeUnitAt(dart.notNull(index) + 2);
      if (!dart.notNull(_isHexDigit(firstDigit)) || !dart.notNull(_isHexDigit(secondDigit))) {
        return "%";
      }
      let value = dart.notNull(_hexValue(firstDigit)) * 16 + dart.notNull(_hexValue(secondDigit));
      if (_isUnreservedChar(value)) {
        if (dart.notNull(lowerCase) && dart.notNull(_UPPER_CASE_A) <= dart.notNull(value) && dart.notNull(_UPPER_CASE_Z) >= dart.notNull(value)) {
          value = 32;
        }
        return new String.fromCharCode(value);
      }
      if (dart.notNull(firstDigit) >= dart.notNull(_LOWER_CASE_A) || dart.notNull(secondDigit) >= dart.notNull(_LOWER_CASE_A)) {
        return source.substring(index, dart.notNull(index) + 3).toUpperCase();
      }
      return null;
    }
    static [_isUnreservedChar](ch) {
      return dart.notNull(ch) < 127 && dart.notNull(!dart.equals(dart.dbinary(dart.dindex(_unreservedTable, dart.notNull(ch) >> 4), '&', 1 << (dart.notNull(ch) & 15)), 0));
    }
    static [_escapeChar](char) {
      dart.assert(dart.dbinary(char, '<=', 1114111));
      let hexDigits = "0123456789ABCDEF";
      let codeUnits = null;
      if (dart.dbinary(char, '<', 128)) {
        codeUnits = new List(3);
        codeUnits.set(0, _PERCENT);
        codeUnits.set(1, hexDigits.codeUnitAt(dart.as(dart.dbinary(char, '>>', 4), int)));
        codeUnits.set(2, hexDigits.codeUnitAt(dart.as(dart.dbinary(char, '&', 15), int)));
      } else {
        let flag = 192;
        let encodedBytes = 2;
        if (dart.dbinary(char, '>', 2047)) {
          flag = 224;
          encodedBytes = 3;
          if (dart.dbinary(char, '>', 65535)) {
            encodedBytes = 4;
            flag = 240;
          }
        }
        codeUnits = new List(3 * dart.notNull(encodedBytes));
        let index = 0;
        while ((encodedBytes = dart.notNull(encodedBytes) - 1) >= 0) {
          let byte = dart.as(dart.dbinary(dart.dbinary(dart.dbinary(char, '>>', 6 * dart.notNull(encodedBytes)), '&', 63), '|', flag), int);
          codeUnits.set(index, _PERCENT);
          codeUnits.set(dart.notNull(index) + 1, hexDigits.codeUnitAt(dart.notNull(byte) >> 4));
          codeUnits.set(dart.notNull(index) + 2, hexDigits.codeUnitAt(dart.notNull(byte) & 15));
          index = 3;
          flag = 128;
        }
      }
      return new String.fromCharCodes(dart.as(codeUnits, Iterable$(int)));
    }
    static [_normalize](component, start, end, charTable) {
      let buffer = null;
      let sectionStart = start;
      let index = start;
      while (dart.notNull(index) < dart.notNull(end)) {
        let char = component.codeUnitAt(index);
        if (dart.notNull(char) < 127 && (dart.notNull(charTable.get(dart.notNull(char) >> 4)) & 1 << (dart.notNull(char) & 15)) !== 0) {
          index = dart.notNull(index) + 1;
        } else {
          let replacement = null;
          let sourceLength = null;
          if (char === _PERCENT) {
            replacement = _normalizeEscape(component, index, false);
            if (replacement === null) {
              index = 3;
              continue;
            }
            if (dart.equals("%", replacement)) {
              replacement = "%25";
              sourceLength = 1;
            } else {
              sourceLength = 3;
            }
          } else if (_isGeneralDelimiter(char)) {
            _fail(component, index, "Invalid character");
          } else {
            sourceLength = 1;
            if ((dart.notNull(char) & 64512) === 55296) {
              if (dart.notNull(index) + 1 < dart.notNull(end)) {
                let tail = component.codeUnitAt(dart.notNull(index) + 1);
                if ((dart.notNull(tail) & 64512) === 56320) {
                  sourceLength = 2;
                  char = 65536 | (dart.notNull(char) & 1023) << 10 | dart.notNull(tail) & 1023;
                }
              }
            }
            replacement = _escapeChar(char);
          }
          if (buffer === null)
            buffer = new StringBuffer();
          buffer.write(component.substring(sectionStart, index));
          buffer.write(replacement);
          index = sourceLength;
          sectionStart = index;
        }
      }
      if (buffer === null) {
        return component.substring(start, end);
      }
      if (dart.notNull(sectionStart) < dart.notNull(end)) {
        buffer.write(component.substring(sectionStart, end));
      }
      return buffer.toString();
    }
    static [_isSchemeCharacter](ch) {
      return dart.notNull(ch) < 128 && dart.notNull(!dart.equals(dart.dbinary(dart.dindex(_schemeTable, dart.notNull(ch) >> 4), '&', 1 << (dart.notNull(ch) & 15)), 0));
    }
    static [_isGeneralDelimiter](ch) {
      return dart.notNull(ch) <= dart.notNull(_RIGHT_BRACKET) && dart.notNull(!dart.equals(dart.dbinary(dart.dindex(_genDelimitersTable, dart.notNull(ch) >> 4), '&', 1 << (dart.notNull(ch) & 15)), 0));
    }
    get isAbsolute() {
      return dart.notNull(!dart.equals(this.scheme, "")) && dart.notNull(dart.equals(this.fragment, ""));
    }
    [_merge](base, reference) {
      if (base.isEmpty)
        return `/${reference}`;
      let backCount = 0;
      let refStart = 0;
      while (reference.startsWith("../", refStart)) {
        refStart = 3;
        backCount = dart.notNull(backCount) + 1;
      }
      let baseEnd = base.lastIndexOf('/');
      while (dart.notNull(baseEnd) > 0 && dart.notNull(backCount) > 0) {
        let newEnd = base.lastIndexOf('/', dart.notNull(baseEnd) - 1);
        if (dart.notNull(newEnd) < 0) {
          break;
        }
        let delta = dart.notNull(baseEnd) - dart.notNull(newEnd);
        if ((delta === 2 || delta === 3) && base.codeUnitAt(dart.notNull(newEnd) + 1) === _DOT && (delta === 2 || base.codeUnitAt(dart.notNull(newEnd) + 2) === _DOT)) {
          break;
        }
        baseEnd = newEnd;
        backCount = dart.notNull(backCount) - 1;
      }
      return String['+'](base.substring(0, dart.notNull(baseEnd) + 1), reference.substring(dart.notNull(refStart) - 3 * dart.notNull(backCount)));
    }
    [_hasDotSegments](path) {
      if (dart.notNull(path.length) > 0 && path.codeUnitAt(0) === _DOT)
        return true;
      let index = path.indexOf("/.");
      return index !== -1;
    }
    [_removeDotSegments](path) {
      if (!dart.notNull(this[_hasDotSegments](path)))
        return path;
      let output = dart.as(new List.from([]), List$(String));
      let appendSlash = false;
      for (let segment of path.split("/")) {
        appendSlash = false;
        if (dart.equals(segment, "..")) {
          if (!dart.notNull(output.isEmpty) && (output.length !== 1 || dart.notNull(!dart.equals(output.get(0), ""))))
            output.removeLast();
          appendSlash = true;
        } else if (dart.equals(".", segment)) {
          appendSlash = true;
        } else {
          output.add(segment);
        }
      }
      if (appendSlash)
        output.add("");
      return output.join("/");
    }
    resolve(reference) {
      return this.resolveUri(Uri.parse(reference));
    }
    resolveUri(reference) {
      let targetScheme = null;
      let targetUserInfo = "";
      let targetHost = null;
      let targetPort = null;
      let targetPath = null;
      let targetQuery = null;
      if (reference.scheme.isNotEmpty) {
        targetScheme = reference.scheme;
        if (reference.hasAuthority) {
          targetUserInfo = reference.userInfo;
          targetHost = reference.host;
          targetPort = reference.hasPort ? reference.port : null;
        }
        targetPath = this[_removeDotSegments](reference.path);
        if (reference.hasQuery) {
          targetQuery = reference.query;
        }
      } else {
        targetScheme = this.scheme;
        if (reference.hasAuthority) {
          targetUserInfo = reference.userInfo;
          targetHost = reference.host;
          targetPort = _makePort(reference.hasPort ? reference.port : null, targetScheme);
          targetPath = this[_removeDotSegments](reference.path);
          if (reference.hasQuery)
            targetQuery = reference.query;
        } else {
          if (dart.equals(reference.path, "")) {
            targetPath = this[_path];
            if (reference.hasQuery) {
              targetQuery = reference.query;
            } else {
              targetQuery = this[_query];
            }
          } else {
            if (reference.path.startsWith("/")) {
              targetPath = this[_removeDotSegments](reference.path);
            } else {
              targetPath = this[_removeDotSegments](this[_merge](this[_path], reference.path));
            }
            if (reference.hasQuery)
              targetQuery = reference.query;
          }
          targetUserInfo = this[_userInfo];
          targetHost = this[_host];
          targetPort = this[_port];
        }
      }
      let fragment = reference.hasFragment ? reference.fragment : null;
      return new Uri._internal(targetScheme, targetUserInfo, targetHost, targetPort, targetPath, targetQuery, fragment);
    }
    get hasAuthority() {
      return this[_host] !== null;
    }
    get hasPort() {
      return this[_port] !== null;
    }
    get hasQuery() {
      return this[_query] !== null;
    }
    get hasFragment() {
      return this[_fragment] !== null;
    }
    get origin() {
      if (dart.notNull(dart.equals(this.scheme, "")) || dart.notNull(this[_host] === null) || dart.notNull(dart.equals(this[_host], ""))) {
        throw new StateError(`Cannot use origin without a scheme: ${this}`);
      }
      if (dart.notNull(!dart.equals(this.scheme, "http")) && dart.notNull(!dart.equals(this.scheme, "https"))) {
        throw new StateError(`Origin is only applicable schemes http and https: ${this}`);
      }
      if (this[_port] === null)
        return `${this.scheme}://${this[_host]}`;
      return `${this.scheme}://${this[_host]}:${this[_port]}`;
    }
    toFilePath(opt$) {
      let windows = opt$.windows === void 0 ? null : opt$.windows;
      if (dart.notNull(!dart.equals(this.scheme, "")) && dart.notNull(!dart.equals(this.scheme, "file"))) {
        throw new UnsupportedError(`Cannot extract a file path from a ${this.scheme} URI`);
      }
      if (!dart.equals(this.query, "")) {
        throw new UnsupportedError("Cannot extract a file path from a URI with a query component");
      }
      if (!dart.equals(this.fragment, "")) {
        throw new UnsupportedError("Cannot extract a file path from a URI with a fragment component");
      }
      if (windows === null)
        windows = _isWindows;
      return windows ? this[_toWindowsFilePath]() : this[_toFilePath]();
    }
    [_toFilePath]() {
      if (!dart.equals(this.host, "")) {
        throw new UnsupportedError("Cannot extract a non-Windows file path from a file URI " + "with an authority");
      }
      _checkNonWindowsPathReservedCharacters(this.pathSegments, false);
      let result = new StringBuffer();
      if (this[_isPathAbsolute])
        result.write("/");
      result.writeAll(this.pathSegments, "/");
      return result.toString();
    }
    [_toWindowsFilePath]() {
      let hasDriveLetter = false;
      let segments = this.pathSegments;
      if (dart.notNull(segments.length) > 0 && segments.get(0).length === 2 && segments.get(0).codeUnitAt(1) === _COLON) {
        _checkWindowsDriveLetter(segments.get(0).codeUnitAt(0), false);
        _checkWindowsPathReservedCharacters(segments, false, 1);
        hasDriveLetter = true;
      } else {
        _checkWindowsPathReservedCharacters(segments, false);
      }
      let result = new StringBuffer();
      if (dart.notNull(this[_isPathAbsolute]) && !dart.notNull(hasDriveLetter))
        result.write("\\");
      if (!dart.equals(this.host, "")) {
        result.write("\\");
        result.write(this.host);
        result.write("\\");
      }
      result.writeAll(segments, "\\");
      if (dart.notNull(hasDriveLetter) && segments.length === 1)
        result.write("\\");
      return result.toString();
    }
    get [_isPathAbsolute]() {
      if (dart.notNull(this.path === null) || dart.notNull(this.path.isEmpty))
        return false;
      return this.path.startsWith('/');
    }
    [_writeAuthority](ss) {
      if (this[_userInfo].isNotEmpty) {
        ss.write(this[_userInfo]);
        ss.write("@");
      }
      if (this[_host] !== null)
        ss.write(this[_host]);
      if (this[_port] !== null) {
        ss.write(":");
        ss.write(this[_port]);
      }
    }
    toString() {
      let sb = new StringBuffer();
      _addIfNonEmpty(sb, this.scheme, this.scheme, ':');
      if (dart.notNull(this.hasAuthority) || dart.notNull(this.path.startsWith("//")) || dart.notNull(dart.equals(this.scheme, "file"))) {
        sb.write("//");
        this[_writeAuthority](sb);
      }
      sb.write(this.path);
      if (this[_query] !== null) {
        sb.write("?");
        sb.write(this[_query]);
      }
      if (this[_fragment] !== null) {
        sb.write("#");
        sb.write(this[_fragment]);
      }
      return sb.toString();
    }
    ['=='](other) {
      if (!dart.is(other, Uri))
        return false;
      let uri = dart.as(other, Uri);
      return dart.notNull(dart.equals(this.scheme, uri.scheme)) && this.hasAuthority === uri.hasAuthority && dart.notNull(dart.equals(this.userInfo, uri.userInfo)) && dart.notNull(dart.equals(this.host, uri.host)) && this.port === uri.port && dart.notNull(dart.equals(this.path, uri.path)) && this.hasQuery === uri.hasQuery && dart.notNull(dart.equals(this.query, uri.query)) && this.hasFragment === uri.hasFragment && dart.notNull(dart.equals(this.fragment, uri.fragment));
    }
    get hashCode() {
      // Function combine: (dynamic, dynamic) → int
      function combine(part, current) {
        return dart.as(dart.dbinary(dart.dbinary(dart.dbinary(current, '*', 31), '+', dart.dload(part, 'hashCode')), '&', 1073741823), int);
      }
      return combine(this.scheme, combine(this.userInfo, combine(this.host, combine(this.port, combine(this.path, combine(this.query, combine(this.fragment, 1)))))));
    }
    static [_addIfNonEmpty](sb, test, first, second) {
      if (!dart.equals("", test)) {
        sb.write(first);
        sb.write(second);
      }
    }
    static encodeComponent(component) {
      return _uriEncode(dart.as(_unreserved2396Table, List$(int)), component);
    }
    static encodeQueryComponent(component, opt$) {
      let encoding = opt$.encoding === void 0 ? convert.UTF8 : opt$.encoding;
      return _uriEncode(dart.as(_unreservedTable, List$(int)), component, {encoding: encoding, spaceToPlus: true});
    }
    static decodeComponent(encodedComponent) {
      return _uriDecode(encodedComponent);
    }
    static decodeQueryComponent(encodedComponent, opt$) {
      let encoding = opt$.encoding === void 0 ? convert.UTF8 : opt$.encoding;
      return _uriDecode(encodedComponent, {plusToSpace: true, encoding: encoding});
    }
    static encodeFull(uri) {
      return _uriEncode(dart.as(_encodeFullTable, List$(int)), uri);
    }
    static decodeFull(uri) {
      return _uriDecode(uri);
    }
    static splitQueryString(query, opt$) {
      let encoding = opt$.encoding === void 0 ? convert.UTF8 : opt$.encoding;
      return dart.as(query.split("&").fold(dart.map(), (map, element) => {
        let index = dart.as(dart.dinvoke(element, 'indexOf', "="), int);
        if (index === -1) {
          if (!dart.equals(element, "")) {
            dart.dsetindex(map, decodeQueryComponent(dart.as(element, String), {encoding: encoding}), "");
          }
        } else if (index !== 0) {
          let key = dart.dinvoke(element, 'substring', 0, index);
          let value = dart.dinvoke(element, 'substring', dart.notNull(index) + 1);
          dart.dsetindex(map, Uri.decodeQueryComponent(dart.as(key, String), {encoding: encoding}), decodeQueryComponent(dart.as(value, String), {encoding: encoding}));
        }
        return map;
      }), Map$(String, String));
    }
    static parseIPv4Address(host) {
      // Function error: (String) → void
      function error(msg) {
        throw new FormatException(`Illegal IPv4 address, ${msg}`);
      }
      let bytes = host.split('.');
      if (bytes.length !== 4) {
        error('IPv4 address should contain exactly 4 parts');
      }
      return dart.as(bytes.map((byteString) => {
        let byte = int.parse(dart.as(byteString, String));
        if (dart.notNull(byte) < 0 || dart.notNull(byte) > 255) {
          error('each part must be in the range of `0..255`');
        }
        return byte;
      }).toList(), List$(int));
    }
    static parseIPv6Address(host, start, end) {
      if (start === void 0)
        start = 0;
      if (end === void 0)
        end = null;
      if (end === null)
        end = host.length;
      // Function error: (String, [dynamic]) → void
      function error(msg, position) {
        if (position === void 0)
          position = null;
        throw new FormatException(`Illegal IPv6 address, ${msg}`, host, dart.as(position, int));
      }
      // Function parseHex: (int, int) → int
      function parseHex(start, end) {
        if (dart.notNull(end) - dart.notNull(start) > 4) {
          error('an IPv6 part can only contain a maximum of 4 hex digits', start);
        }
        let value = int.parse(host.substring(start, end), {radix: 16});
        if (dart.notNull(value) < 0 || dart.notNull(value) > (1 << 16) - 1) {
          error('each part must be in the range of `0x0..0xFFFF`', start);
        }
        return value;
      }
      if (dart.notNull(host.length) < 2)
        error('address is too short');
      let parts = dart.as(new List.from([]), List$(int));
      let wildcardSeen = false;
      let partStart = start;
      for (let i = start; dart.notNull(i) < dart.notNull(end); i = dart.notNull(i) + 1) {
        if (host.codeUnitAt(i) === _COLON) {
          if (i === start) {
            i = dart.notNull(i) + 1;
            if (host.codeUnitAt(i) !== _COLON) {
              error('invalid start colon.', i);
            }
            partStart = i;
          }
          if (i === partStart) {
            if (wildcardSeen) {
              error('only one wildcard `::` is allowed', i);
            }
            wildcardSeen = true;
            parts.add(-1);
          } else {
            parts.add(parseHex(partStart, i));
          }
          partStart = dart.notNull(i) + 1;
        }
      }
      if (parts.length === 0)
        error('too few parts');
      let atEnd = partStart === end;
      let isLastWildcard = parts.last === -1;
      if (dart.notNull(atEnd) && !dart.notNull(isLastWildcard)) {
        error('expected a part after last `:`', end);
      }
      if (!dart.notNull(atEnd)) {
        try {
          parts.add(parseHex(partStart, end));
        } catch (e) {
          try {
            let last = parseIPv4Address(host.substring(partStart, end));
            parts.add(dart.notNull(last.get(0)) << 8 | dart.notNull(last.get(1)));
            parts.add(dart.notNull(last.get(2)) << 8 | dart.notNull(last.get(3)));
          } catch (e) {
            error('invalid end of IPv6 address.', partStart);
          }

        }

      }
      if (wildcardSeen) {
        if (dart.notNull(parts.length) > 7) {
          error('an address with a wildcard must have less than 7 parts');
        }
      } else if (parts.length !== 8) {
        error('an address without a wildcard must contain exactly 8 parts');
      }
      let bytes = new List(16);
      for (let i = 0, index = 0; dart.notNull(i) < dart.notNull(parts.length); i = dart.notNull(i) + 1) {
        let value = parts.get(i);
        if (value === -1) {
          let wildCardLength = 9 - dart.notNull(parts.length);
          for (let j = 0; dart.notNull(j) < dart.notNull(wildCardLength); j = dart.notNull(j) + 1) {
            bytes.set(index, 0);
            bytes.set(dart.notNull(index) + 1, 0);
            index = 2;
          }
        } else {
          bytes.set(index, dart.notNull(value) >> 8);
          bytes.set(dart.notNull(index) + 1, dart.notNull(value) & 255);
          index = 2;
        }
      }
      return dart.as(bytes, List$(int));
    }
    static [_uriEncode](canonicalTable, text, opt$) {
      let encoding = opt$.encoding === void 0 ? convert.UTF8 : opt$.encoding;
      let spaceToPlus = opt$.spaceToPlus === void 0 ? false : opt$.spaceToPlus;
      // Function byteToHex: (dynamic, dynamic) → dynamic
      function byteToHex(byte, buffer) {
        let hex = '0123456789ABCDEF';
        dart.dinvoke(buffer, 'writeCharCode', hex.codeUnitAt(dart.as(dart.dbinary(byte, '>>', 4), int)));
        dart.dinvoke(buffer, 'writeCharCode', hex.codeUnitAt(dart.as(dart.dbinary(byte, '&', 15), int)));
      }
      let result = new StringBuffer();
      let bytes = encoding.encode(text);
      for (let i = 0; dart.notNull(i) < dart.notNull(bytes.length); i = dart.notNull(i) + 1) {
        let byte = bytes.get(i);
        if (dart.notNull(byte) < 128 && (dart.notNull(canonicalTable.get(dart.notNull(byte) >> 4)) & 1 << (dart.notNull(byte) & 15)) !== 0) {
          result.writeCharCode(byte);
        } else if (dart.notNull(spaceToPlus) && byte === _SPACE) {
          result.writeCharCode(_PLUS);
        } else {
          result.writeCharCode(_PERCENT);
          byteToHex(byte, result);
        }
      }
      return result.toString();
    }
    static [_hexCharPairToByte](s, pos) {
      let byte = 0;
      for (let i = 0; dart.notNull(i) < 2; i = dart.notNull(i) + 1) {
        let charCode = s.codeUnitAt(dart.notNull(pos) + dart.notNull(i));
        if (48 <= dart.notNull(charCode) && dart.notNull(charCode) <= 57) {
          byte = dart.notNull(byte) * 16 + dart.notNull(charCode) - 48;
        } else {
          charCode = 32;
          if (97 <= dart.notNull(charCode) && dart.notNull(charCode) <= 102) {
            byte = dart.notNull(byte) * 16 + dart.notNull(charCode) - 87;
          } else {
            throw new ArgumentError("Invalid URL encoding");
          }
        }
      }
      return byte;
    }
    static [_uriDecode](text, opt$) {
      let plusToSpace = opt$.plusToSpace === void 0 ? false : opt$.plusToSpace;
      let encoding = opt$.encoding === void 0 ? convert.UTF8 : opt$.encoding;
      let simple = true;
      for (let i = 0; dart.notNull(i) < dart.notNull(text.length) && dart.notNull(simple); i = dart.notNull(i) + 1) {
        let codeUnit = text.codeUnitAt(i);
        simple = codeUnit !== _PERCENT && codeUnit !== _PLUS;
      }
      let bytes = null;
      if (simple) {
        if (dart.notNull(dart.equals(encoding, convert.UTF8)) || dart.notNull(dart.equals(encoding, convert.LATIN1))) {
          return text;
        } else {
          bytes = text.codeUnits;
        }
      } else {
        bytes = dart.as(new List(), List$(int));
        for (let i = 0; dart.notNull(i) < dart.notNull(text.length); i = dart.notNull(i) + 1) {
          let codeUnit = text.codeUnitAt(i);
          if (dart.notNull(codeUnit) > 127) {
            throw new ArgumentError("Illegal percent encoding in URI");
          }
          if (codeUnit === _PERCENT) {
            if (dart.notNull(i) + 3 > dart.notNull(text.length)) {
              throw new ArgumentError('Truncated URI');
            }
            bytes.add(_hexCharPairToByte(text, dart.notNull(i) + 1));
            i = 2;
          } else if (dart.notNull(plusToSpace) && codeUnit === _PLUS) {
            bytes.add(_SPACE);
          } else {
            bytes.add(codeUnit);
          }
        }
      }
      return encoding.decode(bytes);
    }
    static [_isAlphabeticCharacter](codeUnit) {
      return dart.notNull(codeUnit) >= dart.notNull(_LOWER_CASE_A) && dart.notNull(codeUnit) <= dart.notNull(_LOWER_CASE_Z) || dart.notNull(codeUnit) >= dart.notNull(_UPPER_CASE_A) && dart.notNull(codeUnit) <= dart.notNull(_UPPER_CASE_Z);
    }
  }
  dart.defineNamedConstructor(Uri, '_internal');
  dart.defineNamedConstructor(Uri, 'http');
  dart.defineNamedConstructor(Uri, 'https');
  dart.defineNamedConstructor(Uri, 'file');
  Uri._SPACE = 32;
  Uri._DOUBLE_QUOTE = 34;
  Uri._NUMBER_SIGN = 35;
  Uri._PERCENT = 37;
  Uri._ASTERISK = 42;
  Uri._PLUS = 43;
  Uri._DOT = 46;
  Uri._SLASH = 47;
  Uri._ZERO = 48;
  Uri._NINE = 57;
  Uri._COLON = 58;
  Uri._LESS = 60;
  Uri._GREATER = 62;
  Uri._QUESTION = 63;
  Uri._AT_SIGN = 64;
  Uri._UPPER_CASE_A = 65;
  Uri._UPPER_CASE_F = 70;
  Uri._UPPER_CASE_Z = 90;
  Uri._LEFT_BRACKET = 91;
  Uri._BACKSLASH = 92;
  Uri._RIGHT_BRACKET = 93;
  Uri._LOWER_CASE_A = 97;
  Uri._LOWER_CASE_F = 102;
  Uri._LOWER_CASE_Z = 122;
  Uri._BAR = 124;
  Uri._unreservedTable = /* Unimplemented const */new List.from([0, 0, 24576, 1023, 65534, 34815, 65534, 18431]);
  Uri._unreserved2396Table = /* Unimplemented const */new List.from([0, 0, 26498, 1023, 65534, 34815, 65534, 18431]);
  Uri._encodeFullTable = /* Unimplemented const */new List.from([0, 0, 65498, 45055, 65535, 34815, 65534, 18431]);
  Uri._schemeTable = /* Unimplemented const */new List.from([0, 0, 26624, 1023, 65534, 2047, 65534, 2047]);
  Uri._schemeLowerTable = /* Unimplemented const */new List.from([0, 0, 26624, 1023, 0, 0, 65534, 2047]);
  Uri._subDelimitersTable = /* Unimplemented const */new List.from([0, 0, 32722, 11263, 65534, 34815, 65534, 18431]);
  Uri._genDelimitersTable = /* Unimplemented const */new List.from([0, 0, 32776, 33792, 1, 10240, 0, 0]);
  Uri._userinfoTable = /* Unimplemented const */new List.from([0, 0, 32722, 12287, 65534, 34815, 65534, 18431]);
  Uri._regNameTable = /* Unimplemented const */new List.from([0, 0, 32754, 11263, 65534, 34815, 65534, 18431]);
  Uri._pathCharTable = /* Unimplemented const */new List.from([0, 0, 32722, 12287, 65535, 34815, 65534, 18431]);
  Uri._pathCharOrSlashTable = /* Unimplemented const */new List.from([0, 0, 65490, 12287, 65535, 34815, 65534, 18431]);
  Uri._queryCharTable = /* Unimplemented const */new List.from([0, 0, 65490, 45055, 65535, 34815, 65534, 18431]);
  // Exports:
  exports.Deprecated = Deprecated;
  exports.deprecated = deprecated;
  exports.override = override;
  exports.proxy = proxy;
  exports.bool = bool;
  exports.Comparable = Comparable;
  exports.Comparable$ = Comparable$;
  exports.DateTime = DateTime;
  exports.double = double;
  exports.Duration = Duration;
  exports.Error = Error;
  exports.AssertionError = AssertionError;
  exports.TypeError = TypeError;
  exports.CastError = CastError;
  exports.NullThrownError = NullThrownError;
  exports.ArgumentError = ArgumentError;
  exports.RangeError = RangeError;
  exports.IndexError = IndexError;
  exports.FallThroughError = FallThroughError;
  exports.AbstractClassInstantiationError = AbstractClassInstantiationError;
  exports.NoSuchMethodError = NoSuchMethodError;
  exports.UnsupportedError = UnsupportedError;
  exports.UnimplementedError = UnimplementedError;
  exports.StateError = StateError;
  exports.ConcurrentModificationError = ConcurrentModificationError;
  exports.OutOfMemoryError = OutOfMemoryError;
  exports.StackOverflowError = StackOverflowError;
  exports.CyclicInitializationError = CyclicInitializationError;
  exports.Exception = Exception;
  exports.FormatException = FormatException;
  exports.IntegerDivisionByZeroException = IntegerDivisionByZeroException;
  exports.Expando = Expando;
  exports.Expando$ = Expando$;
  exports.Function = Function;
  exports.identical = identical;
  exports.identityHashCode = identityHashCode;
  exports.int = int;
  exports.Invocation = Invocation;
  exports.Iterable = Iterable;
  exports.Iterable$ = Iterable$;
  exports.BidirectionalIterator = BidirectionalIterator;
  exports.BidirectionalIterator$ = BidirectionalIterator$;
  exports.Iterator = Iterator;
  exports.Iterator$ = Iterator$;
  exports.List = List;
  exports.List$ = List$;
  exports.Map = Map;
  exports.Map$ = Map$;
  exports.Null = Null;
  exports.num = num;
  exports.Object = Object;
  exports.Pattern = Pattern;
  exports.print = print;
  exports.Match = Match;
  exports.RegExp = RegExp;
  exports.Set = Set;
  exports.Set$ = Set$;
  exports.Sink = Sink;
  exports.Sink$ = Sink$;
  exports.StackTrace = StackTrace;
  exports.Stopwatch = Stopwatch;
  exports.String = String;
  exports.Runes = Runes;
  exports.RuneIterator = RuneIterator;
  exports.StringBuffer = StringBuffer;
  exports.StringSink = StringSink;
  exports.Symbol = Symbol;
  exports.Type = Type;
  exports.Uri = Uri;
})(core || (core = {}));
