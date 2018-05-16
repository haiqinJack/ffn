import qiniu from 'qiniu'
import config from '../config'

const fetchToken = () => {
	let mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
	var options = {
	  scope: 'fafuna',
	};
	var putPolicy = new qiniu.rs.PutPolicy(options);
	var uploadToken = putPolicy.uploadToken(mac);
	return uploadToken
}

export default {
	fetchToken
}
