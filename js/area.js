
var area = {

	url : 'js/area.json',
	obj : $('.area'),
	defaultText : '请选择',
	type : '4',
	objClass : '',
	stateValue : '0',
	provinceValue : '0',
	cityValue : '0',
	countyValue : '0',

	getJson : function(arr){
		$.getJSON(this.url, function(data){
			var _this = area;
  			var _html = '';
  			
  			_html += '<option value="-1">'+ _this.defaultText +'</option>';
  			for(var i=0; i<eval(arr.jsonObj).length; i++){
  				_html += '<option value="'+ eval(arr.jsonObj)[i].code +'">'+ eval(arr.jsonObj)[i].name +'</option>'
  			}
  			var _select = $('<select>').html( _html ).addClass(arr.obj).addClass( _this.objClass )
  			$('.'+ arr.obj).nextAll('select').remove().end().remove();
  			if( _select.find('option').length !=1 ){
  				_this.obj.append( _select );
  			}

  		});
	},

	change : function(arr){
		$(document).on('change', '.'+arr.obj, function(){
  			area[arr.parentValue] = $('.'+ arr.obj +' option:selected').index()-1;
			eval(arr.fn);
		});
	},

	remove : function(arr){
		if( this[arr.objvalue]-0 == -1 ) {
			arr.obj.nextAll('select').remove().end().remove();
			return 0;
		}else{
			return 1;
		}
	},

	//国家
	state : function(){
		this.getJson({
			jsonObj : 'data.code_81',
			obj : 'l-state'
		});
		this.change({
			obj : 'l-state',
			fn : 'area.province()',
			parentValue : 'stateValue'
		});
	},

	//省份
	province : function(){

		var bool = this.remove({
			obj : $('.l-province'),
			objvalue : 'stateValue'
		});

		if(!bool){
			return false;
		}

		this.getJson({
			jsonObj : 'data.code_81[_this.stateValue-0].areachild',
			obj : 'l-province'
		});

		this.change({
			obj : 'l-province',
			fn : 'area.city()',
			parentValue : 'provinceValue'
		});
	},

	//城市
	city : function(){

		var bool = this.remove({
			obj : $('.l-city'),
			objvalue : 'provinceValue',

		});

		if(!bool){
			return false;
		}

		this.getJson({
			jsonObj : 'data.code_81[_this.stateValue-0].areachild[_this.provinceValue-0].areachild',
			obj : 'l-city'
		});

		this.change({
			obj : 'l-city',
			fn : 'area.county()',
			parentValue : 'cityValue'
		});
	},

	//区县
	county : function(){

		var bool = this.remove({
			obj : $('.l-county'),
			objvalue : 'cityValue',

		});

		if(!bool){
			return false;
		}

		this.getJson({
			jsonObj : 'data.code_81[_this.stateValue-0].areachild[_this.provinceValue-0].areachild[_this.cityValue-0].areachild',
			obj : 'l-county'
		});
	},

	regAttr : function(attr1, attr2){
		if( attr1 ){
			area[attr2] = attr1;
		}
	},

	init : function(arr){

		//传参
		this.regAttr(arr.type, 'type');
		this.regAttr(arr.objBox, 'obj');
		this.regAttr(arr.url, 'url');
		this.regAttr(arr.objClass, 'objClass');
		this.regAttr(arr.defaultText, 'defaultText');

		//初始化
		switch(this.type-0){
			case 4:
				this.state();
				break;
			case 3:
				this.province();
				break;
			case 2:
				this.city();
				break;
			case 1:
				this.county();
				break;
		}

	}

}

// 初始化插件
// area.init({
// 	type : '4',	//联动类型，比如四级联动(type : '4')，三级联动(type : '3')...
// 	objBox : $(".area"), //联动盒子
// 	url : 'js/area.json', //数据链接
// 	objClass : 'w120', //select加入class
// 	defaultText : '请选择' //初始化select文本
// });
