(function () {
  var $this;

  var Options = function () {
    this.bindEvent = function () {
      $this = this;

      $("input[name='submit']").click(function () {
        var numbers = $("input[name='numbers']").attr("checked");
        var lowercase = $("input[name='lowercase']").attr("checked");
        var uppercase = $("input[name='uppercase']").attr("checked");
        var symbols = $("input[name='symbols']").attr("checked");
        var str = null;
        if (numbers) str += "1234567890";
        if (lowercase) str += this.getCharacter("lower");
        if (uppercase) str += this.getCharacter("upper");
        if (symbols) str += "!@#$%^&*";
        var result = $("[name='result']");
        result.val(str);
        return false;
      });
    };

    this.getCharacter = function (flag) {
      var character = "";
      if (flag === "lower") {
        character = String.fromCharCode(
          Math.floor(Math.random() * 26) + "a".charCodeAt(0)
        );
      }
      if (flag === "upper") {
        character = String.fromCharCode(
          Math.floor(Math.random() * 26) + "A".charCodeAt(0)
        );
      }
      return character;
    };

    this.init = function () {
      $this = this;
      this.bindEvent();
      return this;
    };

    this.log = function (info) {
      console.log(info);
    };
  };

  $(function () {
    var options = new Options();
    options.init();
  });
})();
