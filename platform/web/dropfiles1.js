module.exports = require('/platform/service').extend(function dropfiles1(proto){

	proto.onConstruct = function(){

		function dragenter(e) {
			e.stopPropagation()
			e.preventDefault()
		}

		function dragover(e) {
			e.stopPropagation()
			e.preventDefault()
		}

		var drop = function(e) {
			e.stopPropagation()
			e.preventDefault()

			var dt = e.dataTransfer
			var files = dt.files
			
			for(var i = 0; i < files.length; i++){
				var file = files[i]
				var reader = new FileReader()
				reader.onload = function(e){
					bus.postMessage({
						fn:'ondrop',
						filename:file.name,
						filedata:e.target.result
					})
				}.
				reader.readAsBinaryString(file)
			}
		}
		var canvas = this.app.canvas

		// make canvas a dropzone
		canvas.addEventListener("dragenter", dragenter, false)
		canvas.addEventListener("dragover", dragover, false)
		canvas.addEventListener("drop", drop, false)
	}
})