from nsetools import Nse
import redis
import functools

nse = Nse()
codes = set()


def getRedisConnection():
    redis_db = redis.StrictRedis(host="localhost", port=6379, db=0, password='your-password', decode_responses=True)
    return redis_db


def save_in_redis(code):
    if(nse.is_valid_code(code)):
        if code not in codes:
            codes.add(code)
            redis_db = getRedisConnection()
            redis_db.set("WATCHLIST_NSE_CODES", functools.reduce(lambda x,y:x+","+y, codes))
            return True
    return False


def get_quote(code):
    return nse.get_quote(code)


def get_quotes():
    redis_db = getRedisConnection()
    global codes 
    redis_codes = redis_db.get("WATCHLIST_NSE_CODES")
    if(redis_codes):
        codes.update(set(redis_codes.split(',')))
    dataList = [] 
    # print(codes.split(','))
    for code in codes:
        dataList.append(nse.get_quote(code))
    return dataList
 

if __name__ == "__main__":
    print(nse)
    # quote = nse.get_quote('tcs') # it's ok to use both upper or lower case for codes.
    