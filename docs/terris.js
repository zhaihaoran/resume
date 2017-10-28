(function() {
    var over = false,
        shapes = ("0,1,1,1,2,1,3,1;1,0,1,1,1,2,2,2;2,0,2,1,2,2,1,2;0,1,1,1,1,2,2,2;1,2,2,2,2,1,3,1;1,1,2,1,1,2,2,2;0,2,1,2,1,1,2,2").split(";");

    function create(tag, css) {
        var elm = document.createElement(tag);
        elm.className = css;
        document.body.appendChild(elm);
        return elm;
    }

    var Tetris = function(c, t, x, y) {
        var me = this;
        var c = c ? c : "c";
        me.divs = [create("div", c), create("div", c), create("div", c), create("div", c)];

        me.reset(c, t, x, y);
    }
    Tetris.prototype = {
        field: null,
        reset: function(c, t, x, y) {
            var me = this;
            me.x = typeof x != 'undefined' ? x : 3;
            me.y = typeof y != 'undefined' ? y : 0;
            me.shape = t ? t : shapes[Math.floor(Math.random() * (shapes.length - 0.00001))].split(",");
            me.show();
            if (me.field && me.field.check(me.shape, me.x, me.y, 'v') == 'D') {
                over = true;
                me.field.fixShape(me.shape, me.x, me.y);
                alert('game over');
            }
        },
        show: function() {
            var me = this;
            for (var i in me.divs) {
                me.divs[i].style.left = (me.shape[i * 2] * 1 + me.x) * 20 + 'px';
                me.divs[i].style.top = (me.shape[i * 2 + 1] * 1 + me.y) * 20 + 'px';
            }
        },
        hMove: function(step) {
            var me = this;
            var r = me.field.check(me.shape, me.x - -step, me.y, 'h');
            if (r != 'N' && r == 0) {
                me.x -= -step;
                me.show();
            }
        },
        vMove: function() {
            var me = this;
            if (me.field.check(me.shape, me.x, me.y - -1, 'v') == 'N') {
                me.y++;
                me.show();
            } else {
                me.field.fixShape(me.shape, me.x, me.y);
                me.field.findFull();
                me.reset();
            }
        },
        rotate: function() {
            var me = this;
            var s = this.shape;
            var newShape = [3 - s[1], s[0], 3 - s[3], s[2], 3 - s[5], s[4], 3 - s[7], s[6]];
            var r = me.field.check(newShape, me.x, me.y, 'h');
            if (r == 'D') return;
            if (r == 0) {
                me.shape = newShape;
                me.show();
            } else if (me.field.check(newShape, me.x - r, me.y, 'h') == 0) {
                me.x -= r;
                me.shape = newShape;
                me.show();
            }
        }
    }

    var Field = function(w, h) {
        var me = this;

        me.width = w ? w : 10;
        me.height = h ? h : 20;
    }
    Field.prototype = {
        show: function() {
            var me = this;
            var f = create("div", "f")
            f.style.width = me.width * 20 + 'px';
            f.style.height = me.height * 20 + 'px';
        },
        findFull: function() {
            var me = this;
            for (var l = 0; l < me.height; l++) {
                var s = 0;
                for (var i = 0; i < me.width; i++) {
                    s += me[l * me.width + i] ? 1 : 0;
                }
                if (s == me.width) {
                    me.removeLine(l);
                }
            }
        },
        removeLine: function(line) {
            var me = this;
            for (var i = 0; i < me.width; i++) {
                console.log(me[line * me.width + i]);
                document.body.removeChild(me[line * me.width + i]);
            }
            for (var l = line; l > 0; l--) {
                for (var i = 0; i < me.width; i++) {
                    me[l * me.width - -i] = me[(l - 1) * me.width - -i];
                    if (me[l * me.width - -i]) me[l * me.width - -i].style.top = l * 20 + 'px';
                }
            }
        },
        check: function(shape, x, y, d) {
            var me = this;
            var r1 = 0,
                r2 = 'N';
            for (var i = 0; i < 8; i += 2) {
                if (shape[i] - -x < 0 && shape[i] - -x < r1) {
                    r1 = shape[i] - -x;
                } else if (shape[i] - -x >= me.width && shape[i] - -x > r1) {
                    r1 = shape[i] - -x;
                }
                if (shape[i + 1] - -y >= me.height || me[shape[i] - -x - -(shape[i + 1] - -y) * me.width]) {
                    r2 = 'D'
                }
            }
            if (d == 'h' && r2 == 'N') return r1 > 0 ? r1 - me.width - -1 : r1;
            else return r2;
        },
        fixShape: function(shape, x, y) {
            var me = this;
            var d = new Tetris("d", shape, x, y);
            d.show();
            for (var i = 0; i < 8; i += 2) {
                me[shape[i] - -x - -(shape[i + 1] - -y) * me.width] = d.divs[i / 2];
            }
        }
    }
    var field = new Field();
    field.show();
    var tetris = new Tetris();
    tetris.field = field;
    tetris.show();
    setInterval(function() {
        !over && tetris.vMove();
    }, 500);
    document.onkeydown = function(e) {
        if (over) return;
        var e = window.event ? window.event : e;
        switch (e.keyCode) {
            case 38: //up
                tetris.rotate();
                break;
            case 40: //down
                tetris.vMove();
                break;
            case 37: //left
                tetris.hMove(-1);
                break;
            case 39: //right
                tetris.hMove(1);
                break;
        }
    }
})()
