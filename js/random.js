(function () {
  var $this;

  var Options = function () {
    this.bindEvent = function () {
      $this = this;

      $("input[name='submit']").click(function () {
          
        var numbers = $("input[name='numbers']:checked").val();
        var lowercase = $("input[name='lowercase']:checked").val();
        var uppercase = $("input[name='uppercase']:checked").val();
        var symbols = $("input[name='symbols']:checked").val();
        var number = $("input[name='number']").val();

        var str = '';
        if (numbers) str += "1234567890";
        if (lowercase) str += 'abcdefghijklmnopqrstuvwxyz';
        if (uppercase) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (symbols) str += "!@#$%^&*";

        var result = $("[name='result']");
        result.val($this.createUUID(str, number));
        return false;
      });
    };

    this.createUUID = function(chars, len) {
        $this.log(chars);
        $this.log(len);

        len = len || 28;
        // var chars = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
        var maxPos = chars.length;
        var str = '';
        for (i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    }

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
