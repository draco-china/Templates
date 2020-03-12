var sysConfig={
		//接口服务器
		//interfaceHost:"192.168.1.88:8090"
		//interfaceHost:"192.168.1.223:8082",
		//interfaceHost:"192.168.2.204:8089",
		//redis host
		redisHost : "127.0.0.1",
		redisport : "6379",
		interfaceProtocol : "http://"
		//redisTimeout : 30 * 60 //秒
};

exports.interfaceHost=sysConfig.interfaceHost;
exports.config = sysConfig;