YUI.add('rubiks', function (Y) {
  
    var CUBE_MOVEMENTS = {
        'LM-left':{
            "utl":"btl","ucl":"bcl","ubl":"bbl","ftl":"utl","fcl":"ucl","fbl":"ubl","dtl":"ftl",
            "dcl":"fcl","dbl":"fbl","btl":"dtl","bcl":"dcl","bbl":"dbl","ltl":"lbl","lcl":"lbc",
            "lbl":"lbr","ltc":"lcl","lbc":"lcr","ltr":"ltl","lcr":"ltc","lbr":"ltr","lcc":"lcc"
        },
        "LM-right":{
            "utl":"ftl","ucl":"fcl","ubl":"fbl","ftl":"dtl","fcl":"dcl","fbl":"dbl","dtl":"btl",
            "dcl":"bcl","dbl":"bbl","btl":"utl","bcl":"ucl","bbl":"ubl","ltl":"ltr","lcl":"ltc",
            "lbl":"ltl","ltc":"lcr","lbc":"lcl","ltr":"lbr","lcr":"lbc","lbr":"lbl","lcc":"lcc"
        },
        'RM-right':{
            "utr":"ftr","ucr":"fcr","ubr":"fbr","ftr":"dtr","fcr":"dcr","fbr":"dbr","dtr":"btr",
            "dcr":"bcr","dbr":"bbr","btr":"utr","bcr":"ucr","bbr":"ubr","rtl":"rbl","rcl":"rbc",
            "rbl":"rbr","rtc":"rcl","rcc":"rcc","rbc":"rcr","rtr":"rtl","rcr":"rtc","rbr":"rtr"
        },
        'RM-left':{
            "utr":"btr","ucr":"bcr","ubr":"bbr","ftr":"utr","fcr":"ucr","fbr":"ubr","dtr":"ftr",
            "dcr":"fcr","dbr":"fbr","btr":"dtr","bcr":"dcr","bbr":"dbr","rtl":"rtr","rcl":"rtc",
            "rbl":"rtl","rtc":"rcr","rbc":"rcl","rtr":"rbr","rcr":"rbc","rbr":"rbl","rcc":"rcc"
        },
        'CM-right':{
            "utc":"ftc","ucc":"fcc","ubc":"fbc","ftc":"dtc",
            "fcc":"dcc","fbc":"dbc","dtc":"btc","dcc":"bcc",
            "dbc":"bbc","btc":"utc","bcc":"ucc","bbc":"ubc"
        },
        'CM-left':{
            "utc":"btc","ucc":"bcc","ubc":"bbc","ftc":"utc",
            "fcc":"ucc","fbc":"ubc","dtc":"ftc","dcc":"fcc",
            "dbc":"fbc","btc":"dtc","bcc":"dcc","bbc":"dbc"
        },
        'UE-left':{
            "rtl":"ftl","rtc":"ftc","rtr":"ftr","ftl":"ltl","ftc":"ltc","ftr":"ltr","ltl":"bbr",
            "ltc":"bbc","ltr":"bbl","bbr":"rtl","bbc":"rtc","bbl":"rtr","utl":"utr","ucl":"utc",
            "ubl":"utl","utc":"ucr","ubc":"ucl","utr":"ubr","ucr":"ubc","ubr":"ubl","ucc":"ucc"
        },
        'UE-right':{
            "ltl":"ftl","ltc":"ftc","ltr":"ftr","ftl":"rtl","ftc":"rtc","ftr":"rtr","rtl":"bbr",
            "rtc":"bbc","rtr":"bbl","bbr":"ltl","bbc":"ltc","bbl":"ltr","utl":"ubl","ucl":"ubc",
            "ubl":"ubr","utc":"ucl","ucc":"ucc","ubc":"ucr","utr":"utl","ucr":"utc","ubr":"utr"
        },
        'CE-right':{
            "fcl":"rcl","fcc":"rcc","fcr":"rcr","lcl":"fcl",
            "lcc":"fcc","lcr":"fcr","bcl":"lcr","bcc":"lcc",
            "bcr":"lcl","rcl":"bcr","rcc":"bcc","rcr":"bcl"
        },
        'CE-left':{
            "fcl":"lcl","fcc":"lcc","fcr":"lcr","rcl":"fcl",
            "rcc":"fcc","rcr":"fcr","bcl":"rcr","bcc":"rcc",
            "bcr":"rcl","lcl":"bcr","lcc":"bcc","lcr":"bcl"
        },
        'DE-left':{
            "fbl":"lbl","fbc":"lbc","fbr":"lbr","lbl":"btr","lbc":"btc","lbr":"btl","btr":"rbl",
            "btc":"rbc","btl":"rbr","rbl":"fbl","rbc":"fbc","rbr":"fbr","dtl":"dbl","dcl":"dbc",
            "dbl":"dbr","dtc":"dcl","dcc":"dcc","dbc":"dcr","dtr":"dtl","dcr":"dtc","dbr":"dtr"
        },
        'DE-right':{
            "fbl":"rbl","fbc":"rbc","fbr":"rbr","rbl":"btr","rbc":"btc","rbr":"btl","btr":"lbl",
            "btc":"lbc","btl":"lbr","lbl":"fbl","lbc":"fbc","lbr":"fbr","dtl":"dtr","dcl":"dtc",
            "dbl":"dtl","dtc":"dcr","dbc":"dcl","dtr":"dbr","dcr":"dbc","dbr":"dbl","dcc":"dcc"
        },
        'FS-left':{
            "ubl":"lbr","ubc":"lcr","ubr":"ltr","lbr":"dtr","lcr":"dtc","ltr":"dtl","dtl":"rbl",
            "dtc":"rcl","dtr":"rtl","rbl":"ubr","rcl":"ubc","rtl":"ubl","ftl":"fbl","fcl":"fbc",
            "fbl":"fbr","ftc":"fcl","fcc":"fcc","fbc":"fcr","ftr":"ftl","fcr":"ftc","fbr":"ftr"
        },
        'FS-right':{
            "ubl":"rtl","ubc":"rcl","ubr":"rbl","lbr":"ubl","lcr":"ubc","ltr":"ubr","dtl":"ltr",
            "dtc":"lcr","dtr":"lbr","rbl":"dtl","rcl":"dtc","rtl":"dtr","ftl":"ftr","fcl":"ftc",
            "fbl":"ftl","ftc":"fcr","fbc":"fcl","ftr":"fbr","fcr":"fbc","fbr":"fbl","fcc":"fcc"
            
        },
        'CS-left':{
            "ucl":"lbc","ucc":"lcc","ucr":"ltc","ltc":"dcl",
            "lcc":"dcc","lbc":"dcr","dcl":"rbc","dcc":"rcc",
            "dcr":"rtc","rbc":"ucr","rcc":"ucc","rtc":"ucl"
        
        },
        'CS-right':{
            "lbc":"ucl","lcc":"ucc","ltc":"ucr","dcl":"ltc",
            "dcc":"lcc","dcr":"lbc","rbc":"dcl","rcc":"dcc",
            "rtc":"dcr","ucr":"rbc","ucc":"rcc","ucl":"rtc"
        },
        'BS-right':{
            "utl":"rtr","utc":"rcr","utr":"rbr","rtr":"dbr","rcr":"dbc","rbr":"dbl","dbr":"lbl",
            "dbc":"lcl","dbl":"ltl","lbl":"utl","lcl":"utc","ltl":"utr","btl":"bbl","bcl":"bbc",
            "bbl":"bbr","btc":"bcl","bcc":"bcc","bbc":"bcr","btr":"btl","bcr":"btc","bbr":"btr"
        },
        'BS-left':{
            "rtr":"utl","rcr":"utc","rbr":"utr","dbr":"rtr","dbc":"rcr","dbl":"rbr","lbl":"dbr",
            "lcl":"dbc","ltl":"dbl","utl":"lbl","utc":"lcl","utr":"ltl","btl":"btr","bcl":"btc",
            "bbl":"btl","btc":"bcr","bbc":"bcl","btr":"bbr","bcr":"bbc","bbr":"bbl","bcc":"bcc"
        }
    };
      
    var INIT_CONFIG = {
        "front":"yellow",
        "back":"orange",
        "up":"white",
        "down":"red",
        "left":"green",
        "right":"blue"
    };
    
    function Rubiks (cfg) {
        this._init(cfg || {});
        this._bind();
        this._setInitialPosition(cfg);
    }

    Rubiks.prototype = {
        _init: function (cfg) {
            this._container = Y.one(cfg.container || '#cube-container');
            this._cube = Y.one(cfg.src || '#cube');
            this._plane = Y.Node.create('<div id="plane"></div>');
            this._controls = Y.one(cfg.controls || '#cube-controls');
            this._rotation = Y.one(cfg.controls || '#rotation');
            this._queue = new Y.Queue();
            this._cube.append(this._plane);
            this._expectingTransition = false;
            this._setScroll();
        },
    
        _bind: function () {
           this._cube.on('transitionend',this._endTransition,this);
           this._cube.on('webkitTransitionEnd',this._endTransition,this);
           
           this._container.on('gesturemovestart',this._onTouchCube,{preventDefault:true},this);
           this._container.on('gesturemove',this._onMoveCube,{preventDefault:true},this);
           this._container.on('gesturemoveend',this._onEndCube,{preventDefault:true},this);
           
           this._container.on('gesturestart',this._multiTouchStart,this);
           this._container.on('gesturechange',this._multiTouchMove,this);
           this._container.on('gestureend',this._multiTouchEnd,this);

           if (Y.UA.mobile) {
                
                this._enableRotation = true;
            } else {
                this._rotation.on('click',this._onRotationToggle,this);
                Y.on('keypress',Y.bind(this._keyPress,this));
            }


           Y.on('orientationchange',Y.bind(this._changeOrientation,this));
           Y.one('body').on('gesturemovestart',this._checkScroll,{},this);
        },
        _keyPress: function (e) {
            e.halt();
            if (e.charCode == 114) {
                this._onRotationToggle();
            }
            return;
        },
     
        _changeOrientation: function (evt) {
            this._setScroll();
            this._portrait = window.orientation === 0 ? this._changeToPortrait() : this._changeToLandscape();
        },
        _onRotationFocus: function ()  {
            this._enableRotation = true;
        },
        _onRotationBlur: function ()  {
          this._enableRotation = false;
        },
        _onRotationToggle: function ()  {
            var enabled = this._enableRotation;
            if (enabled) {
               this._rotation.removeClass('pcRotation');
            } else {
                 this._rotation.addClass('pcRotation');
            }
            this._enableRotation = !enabled;
            this._gesture = !enabled;
        },
        _setScroll: function (evt) {
            self = this;
            setTimeout(function () {
                window.scrollTo(0,1);
            },1);
        },
        _checkScroll: function (evt) {
            this._setScroll();
        },
        _setInitialPosition: function (cfg) {
            this._setInitialColors();
            var pos = cfg && cfg.position || {x: 30, y: -30 };
            this._cube.setStyle('transform','rotateX('+ pos.y + 'deg) rotateY(' +pos.x + 'deg)');

            this._cubeXY = pos;
            this._tempXY = pos;
        },
        _setInitialColors: function (){
            for(var face in INIT_CONFIG){
                Y.all('.' +face + ' > div').addClass(INIT_CONFIG[face]);
            }
        },
        _endTransition: function (evt) {
            if (this._expectingTransition){
                evt.halt();
                this._plane.set('className',"");
                this._reorganizeCubes();
                this._reorientCubes();
                this._detachToPlane();
                this._moving = false;
                this._expectingTransition = false;
            }
        },
      
        _onTouchCube:function (evt) {
            evt.halt();
            this._tempCube = evt.target.ancestor('.cube');
            this._startX = evt.clientX;
            this._startY = evt.clientY;
            this._deltaX = 0;
            this._deltaY = 0;
            
        },
    
        _onMoveCube:function (evt) {
            evt.halt();
            var deltaX = this._deltaX = ((evt.clientX - this._startX)/1.2),
            deltaY = this._deltaY = ((evt.clientY - this._startY)/1.2),
            x = this._cubeXY.x + deltaX;
            y = this._cubeXY.y - deltaY;
            if (this._gesture){
                this._tempXY = {x: x, y:y};
                this._moved = true;
                this._cube.setStyle('transform','rotateX('+ y  + 'deg) rotateY(' + x + 'deg)');
            }else{
                this._moved = false;
            }
        },
       
        _onEndCube:function (evt) {
            if (this._gesture || this._moved || !this._tempCube) {
                this._gesture = false;
                this._moved = false;
                if (!Y.UA.mobile){
                    this._onRotationToggle();
                    this._multiTouchEnd(evt);
                }
                return;
            }
            evt.halt();
            if (!this._deltaX && !this._deltaY)return; 
            this._tempXY = {x: this._tempXY.x % 360, y: this._tempXY.y % 360 };
            var threshold = 70,
                movement,swap,
                rotateX = this._deltaX > 0 ? "right" :"left",
                rotateXInverted = rotateX == "right" ? "left": "right",
                deg = Math.abs(this._tempXY.x),
                rotateY = this._deltaY > 0 ? "right" : "left",
                rotateYInverted = rotateY == "right" ? "left": "right",
                rotateBoth = Math.abs(this._deltaX) > threshold && Math.abs(this._deltaY) > threshold;
                mHorizontal = Math.abs(this._deltaX) > Math.abs(this._deltaY),
                parts = this._tempCube.get('className').split(' ');
                this._expectingTransition = true;
             
            switch(true){
            
                case parts[2] != "up" && parts[2] != "down" && mHorizontal:
                    movement = {face: parts[4].charAt(0),slice: parts[4].charAt(1),rotate: rotateX};
                    break;
                case (parts[2] == "up" || parts[2] == "down") && mHorizontal && deg>= -45 &&  deg<45:
                    if (parts[2] == "down"){swap = rotateX; rotateX = rotateXInverted; rotateXInverted = swap;}
                    movement = {face: parts[5].charAt(0),slice: parts[5].charAt(1),rotate: rotateX};
                    break;

                case (parts[2] == "up" || parts[2] == "down") && mHorizontal && deg>= 45 &&  deg< 135:
                    if (parts[2] == "down"){swap = rotateX; rotateX = rotateXInverted; rotateXInverted = swap;}
                    movement = {face: parts[3].charAt(0),slice: parts[3].charAt(1),rotate: this._tempXY.x < 0 ? rotateXInverted: rotateX};
                    break;
                
                case (parts[2] == "up" || parts[2] == "down") && mHorizontal && deg>= 135 && deg < 225:
                    if (parts[2] == "down"){swap = rotateX; rotateX = rotateXInverted; rotateXInverted = swap;}
                    movement = {face: parts[5].charAt(0),slice: parts[5].charAt(1),rotate: rotateXInverted};
                    break;
                    
                case (parts[2] == "up" || parts[2] == "down") && mHorizontal && deg>= 225 && deg < 315:
                    if (parts[2] == "down"){swap = rotateX; rotateX = rotateXInverted; rotateXInverted = swap;}
                    movement = {face: parts[3].charAt(0),slice: parts[3].charAt(1),rotate: this._tempXY.x < 0 ?rotateX: rotateXInverted};
                    break;
                    
                
                case (parts[2] == "front" || parts[2] == "back") && !mHorizontal:
                    if (parts[2] == "back"){swap = rotateY; rotateY = rotateYInverted; rotateYInverted = swap;}
                    movement = {face: parts[3].charAt(0),slice: parts[3].charAt(1),rotate: rotateY};
                    break;
                case (parts[2] == "right" || parts[2] == "left") && !mHorizontal:
                    if (parts[2] == "left"){swap = rotateY; rotateY = rotateYInverted; rotateYInverted = swap;}
                    movement = {face: parts[5].charAt(0),slice: parts[5].charAt(1),rotate: rotateY};
                    break;
                case (parts[2] == "up" || parts[2] == "down") && !mHorizontal && deg>= -45 &&  deg<45:
                    movement = {face: parts[3].charAt(0),slice: parts[3].charAt(1),rotate: rotateY};
                    break;

                case (parts[2] == "up" || parts[2] == "down") && !mHorizontal && deg>= 45 &&  deg<135:
                    movement = {face: parts[5].charAt(0),slice: parts[5].charAt(1),rotate: rotateYInverted};
                    break;

                case (parts[2] == "up" || parts[2] == "down") && !mHorizontal && deg>= 135 &&  deg<225:
                    movement = {face: parts[3].charAt(0),slice: parts[3].charAt(1),rotate: rotateYInverted};
                    break;

                case (parts[2] == "up" || parts[2] == "down") && !mHorizontal && deg>= 225 &&  deg<315:
                    movement = {face: parts[5].charAt(0),slice: parts[5].charAt(1),rotate: rotateY};
                    break;
                   
                default: break;
             }
            if (movement)
                this._doMovement(movement);
        },

        
        _doMovement:function (m,fromQueue) {
            if (this._moving)return;
            if(!fromQueue){
                this._queue.add(m);
            }
            var plane = this._plane,
                list = Y.all('.' + m.face + m.slice),
                origin;

            this._movement = m;
            this._moving = true;
            this._attachToPlane(list);

            switch (m.slice) {
                case 'M' : origin = '0 200px'; break;
                case 'S'  : origin = '200px 200px'; break;
                default : origin = '';
            }

            plane.setStyle('-webkit-transform-origin', origin); 
            plane.get('offsetHeight');
            plane.addClass('moving');
            plane.addClass(m.slice +'-'+ m.rotate);
            
        },
        _attachToPlane:function (list) {
            this._plane.setContent(list);
        },
        _detachToPlane:function () {
            var children = this._plane.get('children');
            this._cube.append(children);
        },
        _reorganizeCubes:function () {
            var m = this._movement,
                changes = CUBE_MOVEMENTS[m.face + m.slice +'-' +m.rotate],
                list = this._plane.get('children'),
                tempCubes = {};
                list.each(function (originCube,i) {
                    if (originCube.hasClass('face'))return;
                    var originCubeClass = originCube.get('className'),
                        cubePos = (originCubeClass.split(' ',1))[0];
                    tempCubes[cubePos] = originCubeClass;
                    
                    var destCube = Y.one('.' + changes[cubePos]);
                    
                    var destCubeClass = destCube? destCube.get('className'): tempCubes[changes[cubePos]],
                        cubePosDes = destCubeClass.split(' ',1)[0];
                        
                    originCube.set('className', cubePosDes + destCubeClass.substr(3));
                });
        },
        _changeOrientationText:function (elm,rotation) {
            var state = elm.get('className'),txt = state.split(' ',2),color = txt[0] + " ";
            txt= txt[1] || txt[0];
            switch(txt){
                case "textLeft": elm.replaceClass(txt, rotation == "left" ? 'textDown' : '');break;
                case "textRight":elm.replaceClass(txt, rotation == "left" ? '' : 'textDown');break;
                case "textDown": elm.replaceClass(txt, rotation == "left" ? 'textRight' : 'textLeft');break;
                default: elm.set('className',color + (rotation == "left" ? 'textLeft' : 'textRight') );break;
            }
        },
        _reorientCubes:function () {
            var plane = this._plane,
                cubes = plane.get('children'),
                m = this._movement;

            switch(true){
                case m.face == "C" && m.slice == "S":
                case m.face == "F" && m.slice == "S":
                    cubes.each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    break;
                                        
                case m.face == "B" && m.slice == "S":
                    cubes.filter('.back').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate == "left"? "right":"left" );
                    },this);
                    cubes.filter(':not(.back)').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    break;
                                                     
                case m.face == "L" && m.slice == "M":
                    cubes.filter('.left').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    break;
                                                     
                case m.face == "R" && m.slice == "M":
                    cubes.filter('.right').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate =="left"? "right":"left");
                    },this);
                    break;
                                                     
                case m.face =="C" && m.slice == "E" && m.rotate =="left":
                case m.face =="U" && m.slice == "E" && m.rotate =="left":
                    cubes.filter('.up').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate =="left"? "right":"left");
                    },this);
                    cubes.filter('.back').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    cubes.filter('.right').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                        },this);
                    break;
                                                     
                case m.face =="C" && m.slice == "E" && m.rotate =="right":
                case m.face =="U" && m.slice == "E" && m.rotate =="right":
                    cubes.filter(function (i) {
                        return i.className.indexOf('up') !== -1;
                    }).each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate =="left"? "right":"left");
                    },this);
                    cubes.filter(function (i) {
                        return i.className.indexOf('back') !== -1;
                    }).each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    cubes.filter(function (i) {
                        return i.className.indexOf('left') !== -1;
                    }).each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    break;
                
                case m.face =="D" && m.slice == "E" && m.rotate =="right":
                    cubes.filter('.down').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    cubes.filter('.back').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    cubes.filter('.left').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    break;
                                                     
                case m.face =="D" && m.slice == "E" && m.rotate == "left":
                    cubes.filter('.down').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    cubes.filter('.back').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    cubes.filter('.right').each(function (e) {
                        this._changeOrientationText(e.one('*'),m.rotate);
                        this._changeOrientationText(e.one('*'),m.rotate);
                    },this);
                    break;
            }
        },
      
 
      
    };
Y.Rubiks = Rubiks;
},"0.0.1",{
    requires:['node','transition','event','event-delegate','event-gestures']
});
