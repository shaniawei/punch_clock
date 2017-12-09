module.exports = {
	formateDate: function(time) {
		if (!time) return ''
		time = +time
		var date = new Date(time)
		var month = date.getMonth() + 1
		month = month < 10 ? '0' + month : month
		var day = date.getDate()
		day = day < 10 ? '0' + day : day
		var hour = date.getHours()
		hour = hour < 10 ? '0' + hour : hour
		var min = date.getMinutes()
		min = min < 10 ? '0' + min : min
		var sec = date.getSeconds()
		sec = sec < 10 ? '0' + sec : sec
		return `${date.getFullYear()}-${month}-${day} ${hour}:${min}:${sec}`
	}
}