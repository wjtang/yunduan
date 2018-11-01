import axios from 'axios'
import qs from 'qs'

export default {
	const base_url = '', //接口地址
	postreq(url,data){
		return new Promise((resolve, reject) => {
			axios.post(base_url+url,qs.stringify(data)).then(response => {
				// console.log(response.data);
				resolve(response.data)
			})
		})
	},
	getreq(url,data){
		return new Promise((resolve, reject) => {
			axios.get(base_url + url).then(response => {
				resolve(response.data)
			})
		})
	}
}