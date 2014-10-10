/*
 * Redis Promise wrapper
 * Author: duythinht
 * Email: duythinht@gmail.com
 *
 */
redis = require('redis');
q = require('q');

COMMANDS = ['APPEND', 'AUTH', 'BGREWRITEAOF', 'BGSAVE', 'BITCOUNT', 'BITOP', 'BITPOS', 'BLPOP', 'BRPOP',
'BRPOPLPUSH', 'CLIENT', 'CLUSTER', 'CONFIG', 'DBSIZE', 'DEBUG', 'DECR', 'DECRBY', 'DEL', 'DISCARD',
'DUMP', 'ECHO', 'EVAL', 'EVALSHA', 'EXEC', 'EXISTS', 'EXPIRE', 'EXPIREAT', 'FLUSHALL', 'FLUSHDB',
'GET', 'GETBIT', 'GETRANGE', 'GETSET', 'HDEL', 'HEXISTS', 'HGET', 'HGETALL', 'HINCRBY', 
'HINCRBYFLOAT', 'HKEYS', 'HLEN', 'HMGET', 'HMSET', 'HSCAN', 'HSET', 'HSETNX', 'HVALS', 'INCR', 
'INCRBY', 'INCRBYFLOAT', 'INFO', 'KEYS', 'LASTSAVE', 'LINDEX', 'LINSERT', 'LLEN', 'LPOP', 'LPUSH',
'LPUSHX', 'LRANGE', 'LREM', 'LSET', 'LTRIM', 'MGET', 'MIGRATE', 'MONITOR', 'MOVE', 'MSET', 'MSETNX', 
'MULTI', 'OBJECT', 'PERSIST', 'PEXPIRE', 'PEXPIREAT', 'PFADD', 'PFCOUNT', 'PFMERGE', 'PING', 'PSETEX',
'PSUBSCRIBE', 'PTTL', 'PUBLISH', 'PUBSUB', 'PUNSUBSCRIBE', 'QUIT', 'RANDOMKEY', 'RENAME', 'RENAMENX',
'RESTORE', 'RPOP', 'RPOPLPUSH', 'RPUSH', 'RPUSHX', 'SADD', 'SAVE', 'SCAN', 'SCARD', 'SCRIPT', 'SDIFF',
'SDIFFSTORE', 'SELECT', 'SET', 'SETBIT', 'SETEX', 'SETNX', 'SETRANGE', 'SHUTDOWN', 'SINTER', 'SINTERSTORE',
'SISMEMBER', 'SLAVEOF', 'SLOWLOG', 'SMEMBERS', 'SMOVE', 'SORT', 'SPOP', 'SRANDMEMBER', 'SREM', 'SSCAN',
'STRLEN', 'SUBSCRIBE', 'SUBSTR', 'SUNION', 'SUNIONSTORE', 'SYNC', 'TIME', 'TTL', 'TYPE', 'UNSUBSCRIBE',
'UNWATCH', 'WATCH', 'ZADD', 'ZCARD', 'ZCOUNT', 'ZINCRBY', 'ZINTERSTORE', 'ZLEXCOUNT', 'ZRANGE', 'ZRANGEBYLEX',
'ZRANGEBYSCORE', 'ZRANK', 'ZREM', 'ZREMRANGEBYLEX', 'ZREMRANGEBYRANK', 'ZREMRANGEBYSCORE', 'ZREVRANGE',
'ZREVRANGEBYSCORE', 'ZREVRANK', 'ZSCAN', 'ZSCORE', 'ZUNIONSTORE']

module.exports.Client = function(redisClient) {
  var rClient = redisClient;
  self = this;
  COMMANDS.forEach(function(cmd) {
    self[cmd] = self[cmd.toLowerCase()] = function() {
      var deferred = q.defer();
      var done = function(err, data) {
        if (err) {
          deferred.reject(new Error(err));
        } else {
          deferred.resolve(data);
        }
      }
      var args = Array.prototype.slice.call(arguments);
      args.push(done);
      rClient[cmd].apply(rClient, args);
      return deferred.promise;
    }
  });
}

module.exports.wrapper = function(redisClient) {
  return new module.exports.Client(redisClient);
}
