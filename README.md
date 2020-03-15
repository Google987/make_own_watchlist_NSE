## make_own_watchlist_NSE

install these requirments:
  ### nsetools, redis, flask
  
change the redis password in `app.py -> getRedisConnection`

make sure redis is running.\
now just run the controller `python3 controller.py`\
NOTE : it's running on port `50000`\
open `localhost:50000/watchlist` in browser

![image](https://user-images.githubusercontent.com/30652896/76701231-6b2ee200-66e5-11ea-9ed8-16861183e78e.png)
