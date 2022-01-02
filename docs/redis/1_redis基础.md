# 1. Redis基础

## 1.1 Redis入门

#### 002-redis入门：Nosql应用场景介绍

```java
问题
	2008年奥运会购票崩溃
	12306崩溃
	淘宝崩溃
	京东崩溃
	…
问题现象
	海量用户
	高并发
罪魁祸首--关系型数据库
	性能瓶颈：磁盘IO性能低下
	扩展瓶颈：数据关系复杂，扩展性差，不便于大规模集群
解决思路
	降低磁盘IO次数，越低越好-----内存存储
	去除数据间关系，越简单越好----不存储关系，仅存储数据
	--> NoSQL
Nosql：即Not-Only SQL(泛指非关系型的数据库)，作为关系型数据库的补充
作用：应对基于海量用户和海量数据前提下的数据处理问题
特征：
	可扩容，可伸缩
	大数据量下高性能
	灵活的数据模型
	高可用
常见Nosql数据库：
	Redis
	memcache
	HBase
	MongoDB
解决方案(电商场景)
1.	商品基本信息
	a)	名称
	b)	价格
	c)	厂商
	--> MySQL…
2.	商品附加信息
	a)	描述
	b)	详情
	c)	评论
	--> MongoDB
3.图片信息    ----  分布式文件系统
4.搜索关键字  ----   ES、Lucene、solr
5.热点信息
	高频
	波段性
	-->Redis、memcache、tair
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200331204940314.png)

#### 003-redis入门：redis简介

```java
Redis
概念：Redis(Remote Dictionary Server)是用C语言开发的一个开源的高性能键值对(key-value)数据库。(键值对数据库)
特征：
1.	数据间没有必然的关联关系
2.	内部采用单线程机制进行工作
3.	高性能。官方提供测试数据，50个并发执行100000个请求，读写速度是110000次/s,写的速度是81000次/s
4.	多数据类型支持
a)	字符串类型  string
b)	列表类型    list
c)	散列类型    hash
d)	集合类型    set
e)	有序集合类型  sorted_set
5.	持久化支持。可以进行数据灾难恢复
Redis的应用
	为热点数据加速查询(主要场景)，如热点商品、热点新闻、热点资讯、推广类等高访问量信息等
	任务队列，如秒杀、抢购、购票排队等
	即时信息查询，如各位排行榜、各类网站访问统计、公交到站信息、在线人数信息(聊天室、网站)、设备信号等
	时效性信息控制，如验证码控制、股票控制等
	分布式数据共享，如分布式集群架构中的session分离
	消息队列
	分布式锁
```

#### 004-redis入门：redis下载安装与服务启动

#### 005-redis入门：redis基础操作

```java
Redis的基本操作
命令行模式工具使用思考
1.功能性命令
	信息添加
		功能：设置key,value数据
		命令：set key value
	信息查询
		功能：根据key查询对应的value，如果不存在，返回空(nil)
		命令：get key
2.清除屏幕信息
	功能：清除屏幕中的信息
	命令：clear
3.帮助信息查询
	功能：获取命令帮助文档，获取组中所有命令信息名称
	命令：
			help 命令名称
			help @组名
4.退出指令
	功能：退出客户端
	命令：quit、exit、<ESC>
```

## 1.2 数据类型

#### 006-数据类型简介

```java
业务数据的特殊性
1.作为缓存使用
	1.原始业务功能设计
		秒杀
		618活动
		双11活动
		排队购票
	2.运营平台监控到的突发高频访问数据
		突发时政要闻，被强势关注围观
	3.高频、复杂的统计数据
		在线人数
		投票排行榜
		附加功能
2.系统功能的优化或升级
	单服务器升级集群
	Session管理
	Token管理
Redis数据类型(5种常用)
	string、hash、list、set、sorted_set
```

### 1.2.1 string

#### 007-string类型：string基本操作和存储格式

```java
Redis数据存储格式
	Redis自身是一个Map，其中所有的数据都是采用key:value的形式存储
	数据类型指的是存储的数据的类型，也就是value部分的类型，key部分永远都是字符串
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200331215300533.png)

```java
1、string存储格式
存储的数据：单个数据，最简单的数据存储类型，也是最常用的数据存储类型
存储数据的格式：一个存储空间保存一个数据
存储的内容：通常使用字符串，如果字符串以整数的形式展示，可以作为数字操作使用(看到的value里存的是数字，其实还是字符串)
存储空间
		Key---> string类型的value
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200331215625685.png)

```java
2、string类型数据的基本操作
添加/修改数据：set key value
获取数据：get key
删除数据：del key
	添加/修改多个数据：mset key1 value1 key2 value2 …
	获取多个数据：mget key1 key2 …
	获取数据字符个数：strlen key
	追加信息到原始信息后部(如果原始信息存在就追加，否则新建)：append key value
	注释：m  Multiple  多个

```

#### 008-string类型：单指令操作与多指令操作的选择之惑

```java
3、单指令数据操作与多指令数据操作的选择之惑
	set    VS   mset

假设：传入时间、传出时间、执行时间，并且传入时间等于传出时间
那我们服务器和Redis数据库进行交互时，所花费时间，可以参看下图

主要是看你传输的数据量到底是多大：
	单个数据肯定是set
	小股数据时，mset在传输上节省了时间，对效率有提升
	非常大的数据时，要切成合适大小的数据，然后mset(因为是单线程执行，其它部分的执行都阻塞在这一条指令上了肯定不好)
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200331222901987.png)

#### 009-string类型：数值增减操作

```java
数据量大的时候，要考虑分库分表，在此我们只考虑分表

4、string类型数据的扩展操作
4.1、业务场景1
	大型企业级应用中，分表操作是基本操作，使用多张表存储同类型数据，但是对应的主键ID必须保持统一性，不能重复。Oracle数据库有sequence设定，可以解决该问题，但是MySQL数据库并不具有类似的机制，那么该如何解决？
	分库分表时，解决主键重复的问题！(不能让MySQL数据库的主键ID重复)
		oracle数据库可以解决，因为它有sequence序列
		Mysql没有这种机制，但是Redis可以帮助它做这个事
解决方案
	设置数值数据增加指定范围的值
		(对字符串进行操作，字符串内存的是纯数字(本质还是string)，才会操作成功)
		(increment可以为正为负)
		incr        key          	//增加1
		incrby      key increment 	//指定增加多少
		incrbyfloat  key increment 	//增加浮点数
	设置数值数据减少指定范围的值
		decr       key
		decrby     key increment
string作为数值操作
	1.	string在redis内部存储默认就是一个字符串，当遇到增减类操作incr,decr时会转成数值型进行计算(本质还是字符串)。
	2.	redis所有的操作都是原子性的，采用单线程处理所有业务，命令是一个一个执行的，因此无需考虑并发带来的数据影响。
	3.	注意：按数值进行操作的数据，如果原始数据不能转成数值或超越了redis数值上限范围，将报错。
```

#### Tip1：

```java
Tip1：
	1、	Redis用于控制数据库表主键id，为数据库表主键ID提供生成策略，保障数据库表的主键ID唯一性(控制它，不重复)
	2、	此方案适用于所有数据库，且支持数据库集群
```

#### 010-string类型：数据时效性设置

```java
4.2、业务场景2
	1.”最强女生”启动海选投票，只能通过微信投票，每个微信号每4小时只能投1票
	2.电商商家开启热门商品推荐，热门商品不能一直处于热门期，每种商品热门期维持3天，3天后自动取消热门
	3.新闻网站会出现热点新闻，热点新闻最大的特征是时效性，如何控制热点新闻的时效性
解决方案：
	设置数据具有指定的生命周期
		setex key seconds value
		pserex key milliseconds value
```

#### Tip2:

```java
Tip2:
	Redis可以控制数据的生命周期，通过数据是否失效控制业务行为，适用于所有具有时效性限定控制的操作
	进行时效性的状态控制
```

#### 011-string类型：数据操作的注意事项-key的命名规范

```java
5、String类型数据操作的注意事项：
1.数据操作是否成功的反馈与数据正常操作之间的差异
	1.表示运行结果是否成功
		(integer)0  --> false  失败
		(integer)1  --> true  成功
	2.表示运行结果值
		(integer)3  --> 3  3个
		(integer)1  --> 1  1个
2.数据未获取到
	(nil) 等同于null  --> 数据不存在
3.数据最大存储量
	512MB
4.数值计算最大范围(-long,long)
```

```java
6、String类型应用场景
业务场景
	主页高频访问信息显示控制，例如新浪微博大V主页显示粉丝数与微博数量
解决方案：
1.在redis中为大V用户设定用户信息，以用户主键和属性值作为key，后台设定定时刷新策略即可
	eg: user:id:35234355:fans    --> 12222
	eg: user:id:35234355:blogs   --> 456
	eg: user:id:35234355:focuss  --> 66
	key:表名:主键名:主键值:属性名
	value:属性值
		  --> 改value比较方便
2.在redis中以json格式存储大V用户信息，定时刷新(也可以使用hash类型)
	eg: user:id: 35234355  --> {fans:12222, blogs:456, focuss:66}
		  --> 拿数据还行，改数据就比较笨重，你必须拿到全部的，然后全部重新写入
```

#### Tips3:

```java
	Redis 应用于各种结构型和非结构型高热读数据访问加速
```

```java
7、String的key的设置约定
		表名   :	 主键名  :	  主键值   :  字段名
  eg1:  order   :  id      :     1000    :   name
  eg2:  equip   :  id      :     1001    :   type
  eg3:  news    :  id      :     1002    :   title
```

### 1.2.2 hash

#### 012-hash类型：hash类型介绍与基本操作

```java
1、关于string类型存储的困惑(在string里用json格式存储对象)
	对象类数据的存储如果具有较频繁的更新操作会显得笨重
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200401102355655.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200401103344794.png)

```java
hash类型
	新的存储需求：对一系列存储的数据进行编组，方便管理，
	典型应用：存储对象的信息
	需要的存储结构：一个存储空间保存多个键值对数据
	hash类型：底层使用哈希表结构实现数据存储
hash存储结构优化
	如果field数量较少，存储结构优化为类数组结构(不是真数组)
	如果field数量较多，存储结构使用HashMap结构
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200402152836583.png)

```java
2、hash类型数据的基本操作
	添加/修改数据：hset key field value
	获取数据 hget key field    hgetall key
	删除数据 hdel key field [field2]

	添加/修改多个数据：hmset key field1 value1 field2 value2 …
	获取多个数据 hmget key field1 field2
	获取哈希表中字段的数量：hlen key  (field的个数)
	获取哈希表中是否存在指定的字段：hexists key field

```

#### 013-hash类型：hash扩展操作与使用注意事项

```java
3、hash类型数据扩展操作
	获取哈希表中所有的字段名或字段值
		hkeys key
		hvals key
	设置指定字段的数值数据增加指定范围的值
		hincrby key field increment
		hincrbyfloat key field increment
```

```java
4、hash类型数据操作的注意事项
	1.hash类型下的value只能存储字符串，不允许存储其他数据类型，不存在嵌套现象，如果数据未获取到，对应的值为(nil)
	2.每个hash可以存储2^32-1个键值对
	3.hash类型十分贴近对象的数据存储形式，并且可以灵活添加删除对象属性，但hash设计初衷不是为了存储大量对象而设计的，切记不可滥用，更不可将hash作为对象列表使用
	4.hgetall操作可以获取全部属性，如果内部field过多，遍历整体数据效率就会很低，有可能成为数据访问瓶颈
```

#### 014-hash类型:hash实现购物车

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200402163017928.png)

```java
5、hash类型应用场景
业务场景1
	电商网站购物车设计与实现
业务分析
1.仅分析购物车的redis存储模型--hash可以
	添加、浏览、更改数量、删除、清空
2.购物车于数据库间持久化同步(不讨论)
3.购物车于订单间关系(不讨论)
	提交购物车：读取数据生成订单
	商家临时价格调整：隶属于订单级别
4.未登录用户购物车信息存储(不讨论)
	cookie存储
解决方案：
	1.以客户id作为key，每位客户创建一个hash存储结构存储对应的购物车信息
	2.将商品编号作为field，购买数量作为value进行存储
	3.添加商品：追加全新的field与value
	4.浏览：遍历hash
	5.更改数量：自增/自减，设置value值
	6.删除商品：删除field
	7.清空：删除key

当前设计是否加速了购物车的呈现？
	当前仅仅是将数据存储到了redis中并没有起到加速的作用，商品信息还需要二次查询数据库
购物车中的每条商品记录保存成两条field
	field1专用于保存购买数量
		命名格式：商品id:nums
		保存数据：数值
	field2专用于保存购物车中显示的信息,包含文字描述,图片地址,所属商家信息等
		命名格式：商品id:info
		保存数据：json
问题1：发现field2部分是重复的所以独立出来做成一个独立的hash(公共的)
	把商品信息通过分类，放到不同的hash中，这样就可以既不重复，又提高了性能
问题:2：每个user加入商品到购物车，都要把商品信息加入到公共的hash中，累不累啊？
	解决：hsetnx key field value（hash中含有此field，有就不重复设置设置了，若没有就设置进去）
```

#### Tips4：

```java
redis应用于购物车数据存储设计
```

#### 015-hash类型:hash实现购物车

```java
5、hash类型应用场景
业务场景2
	双11活动日，促销手机充值卡的商家对移动、联通、电信的30元、50元、100元商品退出抢购活动，每种商品抢购上限1000张
解决方案
	以商家id作为key
	将参与抢购的商品id作为field
	将参与抢购的商品数量作为对应的value
	抢购时使用降值的方式控制产品数量
	实际业务中还有超卖等实际问题，这里不做讨论
```

```java
6、hash类型应用场景
业务场景
	string(json)存储对象， 与 hash存储对象
		1.	string存对象，讲究整体性，要么一次性更新要么一次性获取，讲究的是读为主
		2.	hash存对象，因为它可以分开，用field把属性隔离开，所以它讲究的是更新操作会比较灵活些
		3.	hash模型是一个群组概念，把一系列的数据包装成一个群组，然后对外产生一个唯一的key
		4.	如果更新操作/改数量的操作比较多的话，推荐用hash
		5.	如果仅仅是为了把这个数据对外进行呈现，包含很多东西，string很有优势
```

#### Tips 5：

```java
	redis应用于抢购、限购类、限量发放优惠券、激活码等业务的数据存储设计
```

### 1.2.3 list

#### 016-list类型：list类型介绍与基本操作

```java
1、存储结构
string：存单个数据
hash  ：存数据也不讲究大量，主要是不同种类，这种field那种field
list类型：
	数据存储需求：存储多个数据，并对数据进入存储空间的顺序进行区分
	需要的存储结构：一个存储空间保存多个数据，且通过数据可以体现进入顺序
	list类型：保存多个数据，底层使用双向链表存储结构实现
顺序表(数组)：查询快、 插入删除慢
链表(链表)  ：查询慢 、插入删除快
双向链表：
	--> list描述多个数据的顺序
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403115330214.png)

```java
2、list类型数据基本操作
添加/修改数据
	lpush key value [value2] …
	rpush key value [value2] …
获取数据
	lrange key start stop  (0 是第一个元素 -1是倒数第一个元素)(start stop指的是索引)
	lindex key index
	llen key
获取并删除数据
	lpop key
	rpop key
```

#### 017-list类型：list阻塞数据获取

```java
3、list类型数据扩展操作
规定时间内获取并移除数据(阻塞式数据获取)
	blpop key1 [key2] timeout
	brpop key1[key2] timeout
	链表中没有数据时，可以等待timeout时间，只要在timeout时间内有数据，就取出来，没等到数据，就返回(nil)
	有点像任务队列，有任务就取出来
```

#### 018-list类型：list扩展操作 删除数据

```java
4、list类型数据扩展操作
业务场景
	微信朋友圈点赞，要求按照点赞顺序显示点赞好友信息
	如何从中间删除一个数据？
解决方案
	移除指定数据
		lrem key count value 从左边开始，依次删除key中 count个 值为value的值
		rrem key count value 从右边…
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403120033631.png)

#### Tips6：

```java
Tips6：
	redis应用于具有操作先后顺序的数据控制
```

#### 019-list类型：list实现日志消息队列

```java
5、list类型数据操作注意事项
	1.list中保存的数据都是string类型的
	2.list具有索引的概念，但是操作数据时通常以队列的形式入队出队操作，或以栈的形式进行入栈出栈操作
	3.获取全部数据操作，结束索引设置为-1
	4.list可以对数据进行分页操作，通常第1页的信息来自于list，第2页及更多的信息通过数据库的形式加载
```

```java
6、list类型应用场景
业务场景
	Twitter、新浪微博、腾讯微博中个人用户的关注列表需要按照用户的关注顺序进行展示，粉丝列表需要将最近关注的粉丝列在前面
	新闻、咨询类网站如何将最新的新闻或咨询按照发生的时间顺序展示？
	企业运营过程中，系统将产生出大量的运营数据，如何保障多态服务器操作日志的统一顺序输出？
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403144456397.png)

```java
解决方案
	依赖，list的数据，具有顺序的特征，对信息进行管理
	使用队列模型解决多路信息汇总合并的问题
	使用栈模型解决最新消息的问题
```

#### Tips7：

```java
Tips7：
	redis应用于最新消息展示
	redis应用于多态服务器的消息/日志汇总
```

### 1.2.4 set

#### 020-set类型：set类型介绍与基本操作

```java
1、存储结构
	list也能存储大量数据，但是内部是双向链表，查询慢，主要是关注数据的顺序
	新的存储需求：存储大量的数据，在查询方面提供更高的效率
	需要的存储结构：能够保存大量的数据，高效的内部存储机制，便于查询
	set类型：与hash存储结构完全相同，仅存储键，不存储值(nil),并且值是不允许重复的
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403150405123.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403150425950.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403150452322.png)

```java
2、set类型数据的基本操作
	添加数据：sadd key member1 [member2] …
	获取全部数据：smembers key
	删除数据：srem key member1 [member2] …
	获取集合数据总量：scard key
	判断集合中是否包含指定数据：sismember key member
```

#### 021-set类型：set操作随机数据

```java
3、set类型数据的扩展操作
业务场景
	每位用户首次使用今日头条时会设置3项爱好的内容，但是后期为了增加用户的活跃度、兴趣点，
	必须让用户对其他信息类别逐渐产生兴趣，增加用户留存度，如何实现？
业务分析
	系统分析出各个分类的最新或最热点信息条目并组织成set集合
	随机挑选其中部分信息
	配合用户关注的信息分类中的热点信息组织成展示的全部信息集合
解决方案
	随机获取集合中指定数量的数据
		srandmember key [count]
	随机获取集合中指定数量的数据 并将该数据移除集合
		spop key [count]
```

#### Tips8：

```java
Tips8：
	redis应用于随机推荐类信息检索，例如热点歌单推荐，热点新闻推荐，热卖旅游线路，应用APP推荐，大V推荐等
```

#### 022-set类型：set数据交并差操作

```java
4、set类型数据的扩展操作
业务场景
	脉脉为了促进用户间的交流，保障业务成单率的提升，需要让每位用户拥有大量的好友，事实上职场新人不具有更多的职场好友，如何快速为用户积累更多的好友？
	新浪微博为了增加用户热度，提高用户留存性，需要微博用户关注更多的人，以此获得更多的信息或热门话题，如何提高用户关注他人的总量？
	QQ新用户入网年龄越来越低，这些用户的朋友圈交际圈非常小，往往集中在一所学校甚至一个班级中，如帮助用户快速积累好友用户带来更多的活跃度？
	微信公众号是微信信息流通的渠道之一，增加用户关注的公众号成为提高用户活跃度的一种方式，如何帮助用户积累更多关注的公众号？
	美团外卖为了提升成单量，必须帮助用户挖掘美食需求，如何推荐给用户最适合自己的美食？
解决方案
	求两个集合的交、并、差集
		sinter key1 [key2]
		sunion key1 [key2]
		sdiff key1 [key2]    (key1-key2)
	求两个集合的交、并、差集，并存储到指定集合中
		sinterstore destination key1 [key2]
		sunionstore destination key1 [key2]
		sdiffstore destination key1 [key2]
	将指定数据从原始集合中移动到目标集合中
		smove source destination member
```

```java
Tips9：
	redis应用于同类信息的关联搜索，二度关联搜索，深度关联搜索
	显示共同关注(一度)
	显示共同好友(一度)
	由用户A出发，获取到好友用户B的好友信息列表(一度)
	由用户A出发，获取到好友用户B的购物清单列表(二度)
由用户A出发，获取到好友用户B的游戏充值列表(二度)
```

#### 023-set类型：set实现权限校验

```java
5、set类型数据操作的注意事项
	1.set类型不允许数据重复,如果添加的数据在set中已经存在,将只保留一份(第一次的)，其他的都添加失败
	2.set虽然与hash的存储结构相同，但它们是不同的类型
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403153702710.png)

```java
6、set类型应用场景
业务场景
	集团公司具有12000名员工，内部OA系统中具有700多个角色，3000多个业务操作，23000种数据，每位员工具有一个或多个角色，如何快速进行业务操作的权限校验？

解决方案
	依赖set集合数据不重复的特征,依赖set集合hash存储结构特征完成数据过滤与快速查询
	根据用户id获取用户所有角色
	根据用户所有角色获取用户所有操作权限放入set集合
	根据用户所有角色获取用户所有数据全选放入set集合
```

```java
校验工作：
	redis提供基础数据还是提供校验结果？
	推荐：提供基础数据(数据存储和业务逻辑分离，降低耦合度)
```

#### Tip10：

```java
Tip10：
	redis应用于同类型不重复数据的合并操作
```

#### 024-set类型：set实现网站访问量统计

```java
7、set类型应用场景
业务场景
	公司对旗下新的网站做推广，统计网站的PV(访问量),UV(独立访客),IP(独立IP)
	PV：网站被访问次数，可通过刷新页面提高访问量
	UV：网站被不同用户访问的次数，可通过cookie统计访问量，相同用户切换IP地址，UV不变
	IP：网站被不同IP地址访问的总次数，可通过IP地址统计访问量，相同IP不同用户访问，IP不变
解决方案：
	利用set集合的数据去重特征，记录各种访问数据
	建立 string类型数据，利用incr统计日访问量(PV)
	建立set模型，记录不同cookie数量(UV)
	建立set模型，记录不同IP数量（P
```

#### Tips 11：

```java
Tips 11：
	redis应用于同类型数据的快速去重
```

#### 025-set类型：set实现黑白名单

```java
8、set类型应用场景
业务场景
黑名单
	资讯类信息类网站追求高访问量，但是由于其信息的价值，往往容易被不法分子利用，通过爬虫技术，快速获取信息，个别特种行业网站信息通过爬虫获取分析后，可以转换成商业机密进行出售。例如第三方火车票、机票、酒店刷票代购软件，电商刷评论、刷好子评。
	同时爬虫带来的伪流量也会给经营者带来错觉，产生错误的决策，有效避免网站被爬虫反复爬取成为每个网站都要考虑的基本问题。在基于技术层面区分出爬虫用户后，需要将此类用户进行有效的屏蔽，这就是黑名单的典型应用
	ps：不是说爬虫一定做摧毁性的工作，有些小型网站需要爬虫为其带来一些流量
白名单
	对于安全性更高的应用访问，仅仅靠黑名单是不能解决安全问题的，此时需要设定可访问的用户群体，依赖白名单做更为苛刻的访问验证
解决方案
	基于经营战略设定问题用户发现、鉴别规则
	周期性更新满足规则的用户黑名单，加入set集合
	用户行为信息达到后与黑名单进行比对，确认行为去向
	黑名单过滤IP地址:应用于开放游客询问权限的信息源
	黑名单过滤设备信息:应用于限定访问设备的信息源
	黑名单过滤用户:应用于基于访问权限的信息源
```

#### Tips12：

```java
Tips12：
	redis应用于：基于黑名单与白名单设定的服务控制
```

#### 027-sorted\_set类型介绍与基本操作

### 1.2.5 sorted\_set

```java
1、存储结构
	sorted_set类型
	新的存储需求：数据排序有利于数据的有效展示，需要提供一种可以根据自身特征进行排序的方式
	需要的存储结构：新的存储模型，可以保存可排序的数据
	sorted_set类型：在set的存储结构基础上添加可排序字段
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403165801802.png)

```java
2、sorted_set类型 数据的基本操作  key score1 member1 score2 member2 ...
	添加数据
		zadd key score1 member1 [score2 member2]
	获取全部数据
		zrange key start stop [withscores]     start stop 是index，比如0 -1
		zrevrange key start stop [withscores
	删除数据
		zrem key member [member …]       按值删除，不是按score删除
```

#### 027-sorted\_set类型介绍与基本操作

```java
按条件获取数据
	zrangebyscore key min max [withscore] [limit]   // min max是score  limit是限制输出几条数据
	zrevrangebyscore key max min [withsxcores]
注意：
	min和max用于限定搜索查询的条件
	start与stop用于限定查询范围，作用于索引，表示开始和结束索引
	offset与count用于限定查询范围，作用于查询结果，表示开始位置和数据总量
获取集合数据总量
	zcard key         		//获取集合中成员的数量
	zcount key min max	  	//获取指定范围(score)，成员的数量
集合交、并操作
	zinterstore destination numkeys key [key …]
	zunionstore destination numkeys key [key …]
```

```java
127.0.0.1:6379> zadd scores 45 wangwu 67 zhangsan 71 zhousi 94 qianba
(integer) 4

127.0.0.1:6379> zrangebyscore scores 50 99
1) "zhangsan"
2) "zhousi"
3) "qianba"

127.0.0.1:6379> zrangebyscore scores 0 100 withscores
1) "wangwu"
2) "45"
3) "zhangsan"
4) "67"
5) "zhousi"
6) "71"
7) "qianba"
8) "94"

127.0.0.1:6379> zrangebyscore scores 0 100 withscores limit 0 3
1) "wangwu"
2) "45"
3) "zhangsan"
4) "67"
5) "zhousi"
6) "71"

127.0.0.1:6379> zremrangebyscore scores 50 70  //按score删除
(integer) 1
127.0.0.1:6379> zrange scores 0 -1 withscores
1) "wangwu"
2) "45"
3) "zhousi"
4) "71"
5) "qianba"
6) "94"
127.0.0.1:6379> zremrangebyrank scores 0 1//按索引删除，因为sorted_set是有序的
(integer) 2
127.0.0.1:6379> zrange scores 0 -1 withscores
1) "qianba"
2) "94"
127.0.0.1:6379>

```

#### 028-sorted\_set实现排行榜

```java
3、sorted_set类型数据的扩展操作
业务场景
	票选广东十大杰出青年，各类综艺选秀海选投票
	各类资源网站TOP10(电影,歌曲,文档,电商,游戏等)
	聊天室活跃度统计
	游戏好友亲密度
业务分析
	为所有参与排名的资源建立排序依据
```

```java
解决方案
	获取数据对应的索引(排名)
		zrank key member
		zrevrank key member
	score值获取与修改
		zscore key member
		zincrby key increment member
```

```java
127.0.0.1:6379> zadd movies 147 aa 97 bb 201 cc
(integer) 3
127.0.0.1:6379> zrank movies bb//返回bb的index，默认是从小到大排序
(integer) 0
127.0.0.1:6379> zrevrank movies bb//反着来的下标
(integer) 2
127.0.0.1:6379> zscore movies bb//获取member的score
"97"
127.0.0.1:6379> zincrby movies 500 bb//对应的member的score，增加给定的值
"597"
127.0.0.1:6379> zscore movies bb
"597"
```

#### Tips 13：

```java
Tips 13：
	redis应用于计数器组合排序功能对应的排名
```

#### 029-sorted\_set实现时效性任务管理

```java
sorted_set类型数据操作的注意事项
	score保存的数据存储空间是64位，如果是整数范围是9007199254740992~9007199254740992
	score保存的数据也可以是一个双精度的 double值，基于双精度浮点数的特征，可能会丢失精度，使用时要慎重
	sorted_set底层存储还是基于se结构的，因此数据不能重复，如果重复添加相同的数据， score值将被反复覆盖，保留最后一次修改的结果
```

```java
sorted_set类型应用场景
业务场景
	基础服务+增值服务类网站会设定各位会员的试用，让用户充分体验会员优势。例如观影试用VIP、游戏VIP体验、云盘下载体验ⅥP、数据查看体验VP。当VIP体验到后，如何有效管理此类信息。即便对于正式VIP用户也存在对应的管理方式。
	网站会定期开启投票、讨论，限时进行，逾期作废。如何有效管理此类过期信息
解决方案
	对于基于时间线限定的任务处理，将处理时间记录为score值，利用排序功能区分处理的先后顺序
	记录下一个要处理的时间，当到期后处理对应任务，移除redis中的记录，并记录下一个要处理的时间
	当新任务加入时，判定并更新当前下一个要处理的任务时间
	为提升 sorted_set的性能，通常将任务根据特征存储成若干个sorted_set。例如1小时内，1天内，周内，月内，季内，年度等，操作时逐级提升，将即将操作的若干个任务纳入到1小时内处理的队列中

获取当前系统时间
	time	//获取当前时间戳 s
```

#### Tips 14：

```java
Tips 14：
	redis应用于定时任务执行顺序管理或任务过期管理
```

#### 030-set带有权重的任务管理

```java
sorted_set类型应用场景
业务场景：任务/消息权重设定应用
	当任务或者消息待处理，形成了任务队列或消忘队列时，对于高优先级的任努要保障对其优侁处理，如何实现任务权重管理
解决方案
	对于带有权重的任务，优先处理权重高的任务，采用sore记己录权重即可
```

```java
127.0.0.1:6379> zadd tasks 4 order:id:005
(integer) 1
127.0.0.1:6379> zadd tasks 1 order:id:425
(integer) 1
127.0.0.1:6379> zadd tasks 9 order:id:345
(integer) 1

127.0.0.1:6379> zrange tasks 0 -1 withscores
1) "order:id:425"
2) "1"
3) "order:id:005"
4) "4"
5) "order:id:345"
6) "9"

127.0.0.1:6379> zrem tasks order:id:425
(integer) 1
127.0.0.1:6379> zrange tasks 0 -1 withscores
1) "order:id:005"
2) "4"
3) "order:id:345"
4) "9"
```

```java
多条件任务权重设定
	如果权重条件过多时，需要对排序sore值进行处理，保障 score值能够兼容2条件或者多条件，例如外贸订单优先于国内订单，总裁订单优先于员工订单，经理订单优先于员工订单
	因score长度受限，需要对数据进行截断处理，尤其是时间设置为小时或分钟级即可（折算后）
	先设定订单类别，后设定订单发起角色类别，整体 score长度必须是统一的，不足位补0.第一排序规则首位不得是0
		例如外贸101，国内102，经理004，员工008
		员工下的外贸单sore值为101008（优先）
		经理下的国内单score值为102004
```

### 1.2.6 数据类型实践案例

#### 031-案例：按次结算的服务控制

```java
数据类型实践案例
业务场景
	人工智能领域的语义识别与自动对话将是未来服务业机器人应答呼叫体系中的要技术，百度自硏用户评价语义识别服务，免费开放给企业试用，同时训练百度自己的模型。现对试用用户的使用行为进行限速，限制每个用户每分钟最多发起10次调用
```

```java
解决方案
	设计计数器，记录调用次数，用于控制业务执行次数。以用户id作为key，使用次数作为value
	在调用前获取次数，判断是否超过限定次数
		不超过次数的情况下，每次调用计数+1
		业务调用失败，计数-1
	为计数器设置生命周期为指定周期，例如1秒/分钟，自动清空周期内使用次数
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403195239683.png)

```java
如何只在10的时候才做判断，别每次都判断？

解决方案改良
	取消最大值的判定，利用incr操作超过最大值抛出异常的形式替代每次判断是否大于最大值
	判断是否为nil
		如果是，设置为：(Max-次数)
		如果不是，计数+1
		业务调用失败，计数-1
	遇到异常即+操作超过上限，视为使用达到上限
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403213836344.png)

#### Tips 16

```java
Tips 16
	redis应用于限时按次结算的服务控制
```

#### 032-案例：微信接收消息顺序控制

```java
数据类型实践案例
业务场景
	使用微信的过程中，当微信接收消息后，会默认将最近接收的消忠置顶，当多个好友及关注的订阅号同时发送消息时，该排序会不停的进行交替。同时还可以将重要的会话设置为置顶。一旦用户离线后，再次打开信时，消忠该按照什么样的顺序显示？
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200403220014454.png)

```java
解决方案
	依赖list的数据具有顺序的特征对消息进行管理，将list结构作为栈使用
	对置顶与普通会话分别创建独立的list分别管理
	当某个list中接收到用户消息后，将消消息发送方的id从list的一侧加入list（此处设定右侧）
	多个相同id发出的消息反复入栈会出现问题，在入栈之前无论是否具有当前id对应的消息，先删除对应id
	推送消息时先推送置顶会话list，再推送普通会话list，推送完成的list清除所有数据
	消的数量，也就是微信用户对话数量采用计数器的思想另行记录，伴随list操作同步更新
```

#### Tips 17

```java
Tips 17
	redis应用于基于时间顺序的数据操作，而不关注具体时间
```

### 1.2.7 Tips1~Tips17 解决方案列表

```java
Tips1：redis用于控制数据库表主键id，为数据库表主键ID提供生成策略，保障教据库表的主键唯一性
Tips2：redis控制数据的生命周期，通过数据是否失效控制业务行为，适用于所有具有时效性限定控制的操作
Tips3：redis应用于各种结构型和非结构型高热度数据访问加速
Tips4：redis应用于购物车数据存储设计
Tips5：redis应用于抢购、限购类、限量发放优患卷、激活码等业务的数据存储设计
Tips6：redis应用于具有操作先后顺序的数据控制
Tips7：redis应用于最新消息展示
Tips8：redis应用于随机推荐类信息检索，例如热点歌单推荐，热点新闻推荐，热卖旅游线路，应用APP推荐，大V推荐等
Tips9：redis应用于同类信息的关联搜索，一度关联搜索，深度关联搜索
Tips10：redis应用于同类型不重复数据的合并、取交集操作
Tips11：redis应用于同类型数据的快速去重
Tips12：redis应用于基于黑名单与白名单设定的服务控制
Tips13：redis应用于计数器组合排序功能对应的排名
Tips14：redis应用于定时任务执行顺序管理或任务过期管理
Tips15：redis应用于及时任务/消息队列执行管理
Tips16：redis应用于按次结算的服务控制
Tips17：redis应用于基于时间顺序的数据操作，而不关注具体时间
```

## 1.3 通用命令

### 1.3.1 key通用指令

#### 033-key基本操作

```java
key通用操作

key特征
	key是一个字符串，通过key获取reds中保存的数据
key应该设计哪些操作？
	对于key自身状态的相关操作，例如：删除，判定存在，获取类型等
	对于key有效性控制相关操作，例如：有效期设定，判定是否有效，有效状态的切换等
	对于key快揀查询操作，例如：按指定策略查询key
	...
key基本操作
	刪除指定key
		del key
	获取key是否存在
		exists key
	获取key的类型
		type key
```

#### 034-key时效性控制操作

```java
key扩展操作（时效性控制）
	为指定key设置有效期						//设置时间
		expire key seconds 					//s
		pexpire key milliseconds 			//ms
		expireat key timestamp 				//使用时间戳 s
		pexpireat key milliseconds-timestamp//使用时间戳 ms
	获取key的有效时间	//查看时间
		ttl key 	//s 返回三种：-2 有效期已过已经失效；-1 没有设置有效期 这个key也确实存在； 一个正整数 这个key还差几秒失效
		pttl key	//ms
	切换key从时效性转换为永久性	//改状态
		persist key			//把设置了有效期的key，设置为永久性
```

#### 035-key查询操作

```java
key扩展操作（查询模式）
	查询key
		keys pattern
	查询模式规则
		*  匹配任意数量的任意符号
		?  配合一个任意符号
		[] 匹配一个指定符号
			key *			查询所有
			keys it*		查询所有以it开头
			keys *it		查询所有以it结尾
			keys ??it		查询所有前面两个字符任意，后面以it结尾
			keys user:id:?	查询所有以user:id:开头，最后一个字符任意
			keys u[st]er:1	查询所有以u开头，以er:1结尾，中间包含一个字母 s或t
```

#### 036-key其他操作

```java
key其他操作
	为key改名
		rename key newkey 		//newkey不论这个key是否存在，都改为这个名字，并把key的value拷贝到newkey的value里
		renamenx key newkey		//newkey这个key存在的话，就不更改；不存在 才更改
	对所有key排序
		sort					//对list集合、set集合、sorted_set 的key中的member成员集合进行排序
								//不动原数据--只是排序后输出
		sort key desc//对key中的元素进行降序排序
	其他key通用操作
		he1p @generic
```

### 1.3.2 数据库通用指令

#### 037-db基本操作

```java
数据库
	key的重复问题
		key是由程序员定义的
		redis在使用过程中，伴随着操作数据量的增加，会出现大量的数据以及对应的key
		数据不区分种类、类别混杂在起，极易出现重复或冲突
	解决方案
		redis为每个服务提供有16个数据库，编号从0到15(共用一块空间)
		每个数据库之间的数据相互独立
```

```java
db基本操作
	切换数据库
		select index	//index的编号是0~15 //默认使用的是select 0
	其他操作
		quit			//退出client
		ping			//测试与server是否连通
		echo message	//向控制台输出数据 类似于Linux shell里的echo
```

#### 038-db其他操作

```java
db相关操作
	数据移动
		move key db_index //把这个key移动到另一个db //出发方有这个key 目的放没有这个key 才能成功
	数据清除(很危险)
		dbsize  	//查看本db有多少个key
		flushdb 	//刷掉你现在的数据
		flushall	//刷掉所有的数据
```

## 1.4 Jedis / hiredis

```java
Jedis是Java连接 操作Redis
hiredis是C++连接操作Redis C++使用hiredis 与视频中不一致
```

#### 039-jedis-jedis简介

```java
将Java语言与Redis之间，建立连接，并且进行数据的交换的一个工具
```

#### 040-jedis-helloworld(jedis版)

```java
1.连接Redis
2.操作Redis
3.关闭Redis

客户端连接 redis
	连接redis
		Jedis jedis = new Jedis("localhost", 6379);
	操作redis
		jedis.set("name","itheima");
		jedis.get("name");
	关闭redis连接
		jedis.close();
```

#### 041-jedis-jedis常规操作演示

#### 042-jedis-业务请求次数控制案例需求分析

```java
Jedis读写 redis数据
案例：服务调用次数控制
	人工智能领域的语义识别与自动对话将是未来服务业机器人应答呼叫体系中的重要技术，百度自研用户评
	价语义识别服务，免费开放给企业试用，同时训练百度自己的模型。现对试用用户的使用行为进行限速，
	限制每个用户每分钟最多发起10次调用
案例要求
	设定A、B、C三个用户
	A用户限制10次/分调用，B用户限制30次/分调用，C用户不限制
```

```java
案例：需求分析
	设定一个服务方法，用于模拟实际业务调用的服务，内部采用打印模拟调用
	在业务调用前服务调用控制单元，内部使用redis进行控制，参照之前的方案
	对调用超限使用异常进控制，异常处理设定为打印提示信息
	主程序启动3个线程，分别表示3种不同用户的调用
```

#### 043-jedis-程序结构搭建

#### 044-jedis-程序代码实现

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200404201759832.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040420181550.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040420182519.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040420183913.png)

```java
	后续1：对业务控制方案进行改造，设定不同用户等级的判定
	后续2：将不同用户等级对应的信息、限制次数等设定到 redis中，使用hash保存
```

#### 045-jedis工具类制作

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200404212423868.png)

```java
创建连接池，获得连接的工具类
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200404213248694.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200404213306722.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200404213320866.png)

#### 046-jedis-可视化客户端介绍

```java
redis-desktop-manager.exe
```