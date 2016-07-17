var painter = require('painter')
//var fingers = require('fingers')
var types = require('types')

module.exports = function(proto){

	proto.Turtle = require('turtle')

	proto.composeTree = function(oldchildren){
		// it calls compose recursively
		if(this.oncompose){
			this.onflag = 1
			this.children = this.oncompose()
			this.onflag = 0
		}

		if(!Array.isArray(this.children)){
			if(!this.children) this.children = []
			else this.children = [this.children]
		}

		var children = this.children

		if(!this.initialized){
			this.initialized = true
			if(this._oninit) this._oninit()
			if(this.oninit) this.oninit()
		}

		for(var i = 0; i < children.length; i++){
			var child = children[i]
			child.parent = this
			child.root = this.root
			var oldchild = oldchildren && oldchildren[i]
			child.composeTree(oldchild && oldchild.children)
		}

		if(oldchildren) for(;i < oldchildren.length; i++){
			var oldchild = oldchildren[i]
			oldchild.destroyed = true
			if(oldchild.ondestroy) oldchild.ondestroy()
			if(oldchild._ondestroy) oldchild._ondestroy()

		}

		if(this.oncomposed) this.oncomposed()
	}

	proto.walkTurtle = function(){
	}

	// begin a turtle
	proto.beginTurtle = function(){
	}

	// end a turtle
	proto.endTurtle = function(){
	}

	// internal API used by canvas macros
	proto._allocShader = function(classname){
		var shaders = this.shaders
		var info = this['_' + classname].prototype.compileinfo
		var shader = shaders[classname] = new painter.Shader(info)
		shader._props = new painter.Mesh(info.propslots)
		return shader
	}

	proto._parseColor = function(str, alpha, a, o){
		if(!types.colorFromString(str, alpha, a, o)){
			console.log("Cannot parse color "+str)
		}
	}

	proto._parseColorPacked = function(str, alpha, a, o){
		if(!types.colorFromStringPacked(str, alpha, a, o)){
			console.log("Cannot parse color "+str)
		}
	}

}
