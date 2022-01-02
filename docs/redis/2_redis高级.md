# 2. Redis高级

## 2.1 Redis Linux安装

#### 047-Linux安装redis

```java
CentOS7安装Redis
	下载安装包
		wget http://download.redis.io/releases/redis-?.?.?.tar.gz
	解压
		tar -zxvf 文件名.tar.gz
	编译
		make
	安装
		make install
```

#### 048-指定端口启动服务

```java
redis-server --port 6380
redis-cli -p 6380
```

#### 049-指定配置文件启动服务

```java
过滤掉注释信息、过滤掉空白行，只留下有用的代码
	cat redis.conf|grep -v "#" |grep -v "^$"
	cat redis.conf |grep -v "#" |grep -v "^$" > redis-6379.conf
```

```java
我们的配置文件内容如下：redis-6379.conf

	port 6379

	# 以守护进程方式启动，后台启动，启动时不在终端上打印日志信息
	daemonize yes

	# 生成的日志文件的名字
	logfile "6379.log"

	# 生成的日志文件，放在哪个位置
	dir /usr/local/redis-5.0.6/log6379Data
```

```java
以配置文件方式启动
	redis-server /usr/local/redis-5.0.6/redis-6379.conf 	//启动redis-server
	redis-cli -p 6379		//client连接server
	ps -ef |grep redis-  	//查看redis-开头的所有进程
	kill -s 9 进程号			//杀死redis-server进程
```

#### 050-配置文件启动目录管理

```java
把redis-6379.conf文件，放到专门的目录下方便管理 ， 放到conf文件夹下
	/usr/local/redis-5.0.6/conf/redis-6379.conf
```

```java
想再启动一个redis-server：redis-6379.conf

	port 6380

	# 以守护进程方式启动，后台启动，启动时不在终端上打印日志信息
	daemonize yes

	# 生成的日志文件的名字
	logfile "6380.log"

	# 生成的日志文件，放在哪个位置
	dir /usr/local/redis-5.0.6/conf/logData

[root@lwh log6379Data]# redis-server /usr/local/redis-5.0.6/conf/redis-6380.conf
[root@lwh log6379Data]# ps aux|grep redis
root      10560  0.2  0.2 153892  2180 ?        Ssl  22:58   0:00 redis-server *:6380
root      10566  0.0  0.0 112712   964 pts/1    S+   22:58   0:00 grep --color=auto redis
[root@lwh log6379Data]# redis-cli -p 6380		//client连接server
```

```java
总结
	Redis服务启动
		默认配互启动
			redis-server
			redis-server --port 6379
			redis-server --port 6380……
		指定配置文件启动
			redis-server redis.conf
			redis-server redis-6379.conf
			redis-server redis-6380.conf
			redis-server conf/redis-6379 cont
			redis-server conf/redis-6380.conf……
	Redis客户端连接
		默认连接
			redis-cli
		连接指定服务器
			redis-cli -h 127.0.0.1
			redis-cli -p 6379
			redis-cli -h 127.0.0.1 -p 6379

配置文件模板：redis-6379.conf

	# 设置当前服务器启动端口
	port 6379

	# 以守护进程方式启动，使用本启动方式，redis讲义服务的形式存在，日志将不再打印到命令窗口
	daemonize yes

	# 设定日志文件名，便于查阅
	logfile "6379.log"

	# 设定当前服务文件保存的位置，包含日志文件、持久化文件等
	dir /usr/local/redis-5.0.6/conf/log6379Data
```

## 2.2 持久化

### 2.2.1 持久化简介

#### 051-持久化-持久化简介

```java
持久化简介
	1. 意外的断电、软件崩溃
	2. “自动备份”：其实就是将内存中的数据和硬盘中的数据做了一个关联
什么是持久化
	利用永久性存储介质将数据进行保存，在特定的时间将保存的数据进行恢复的工作机制称为持久化
为什么要进行持久化
	防止数据的意外丢失，确保数据安全性
持久化过程保存什么
	将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据  			数据(快照)  RDB
	将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程	过程(日志)  AOF
```

### 2.2.2 RDB

#### 052-持久化-save指令

```java
RDB启动方式
	谁、什么时间、干什么事情
命令执行
	谁：redis操作者（用户）
	什么时间：即时（随时进行）
	干什么事情：保存数据
```

```java
RDB启动方式—save指令
命令
	save
作用
	手动执行一次保存操作
```

```java
127.0.0.1:6379> keys *
(empty list or set)
127.0.0.1:6379> set name zhangsan
OK
127.0.0.1:6379> save //手动执行保存指令
OK

[root@lwh logData]# pwd
/usr/local/redis-5.0.6/conf/logData //在设置好的文件保存目录下
[root@lwh logData]# ll
total 8
-rw-r--r--. 1 root root 1455 Apr  5 13:54 6379.log
-rw-r--r--. 1 root root  112 Apr  5 13:54 dump.rdb

XXX.rdb就是持久化文件，保存了当前的快照信息
```

#### 053-持久化-RDB相关配置

```java
RDB启动方式—save指令相关配置
	dbfilename dump.rdb
		说明：设置本地数据库文件名，默认值为 dump.rdb
		经验：通常设为 dump-端口号.rdb
	dir
		说明：设置存储.rdb文件的路径
		经验：通常设置成存储空间较大的目录中，目录名称 data
	rdbcompression yes
		说明：设置存储至本地数据库时是否压缩数据，默认为yes，采用LF压缩
		经验：通常默认为开启状态，如果设置为no，可以节省CPU运行时间，但会使存储的文件变大（巨大）
	rdbchecksum yes
		说明：设置是否进行RDB文件格式校验，该校验过程在写文件和读文件过程均进行
		经验：通常默认为开启状态，如果设置为no，可以节约读写性过程约10%时消耗，但是存储/恢复的数据有一定的损坏风险
```

更改后的redis-6379.conf文件内容如下

```java
# 设置当前服务器启动端口
port 6379

# 以守护进程方式启动，使用本启动方式，redis讲义服务的形式存在，日志将不再打印到命令窗口
daemonize yes

# 设定日志文件名，便于查阅
logfile "6379.log"

# 设定当前服务文件保存的位置，包含日志文件、持久化文件等
dir /usr/local/redis-5.0.6/conf/logData

# 设置 .rdb文件名 (RDB持久化文件名)
dbfilename dump-6379.rdb

# 开启压缩(持久化文件)
rdbcompression yes

# 开启加载检测
rdbchecksum yes
```

#### 054-持久化-数据恢复过程演示

```java
启动服务
客户端连接服务端，并发送指令，并save

关闭服务端
启动客户端，启动服务端，并连接
keys *
发下，上一次存储的数据，都已经加载上来了(服务启动的时候，加载了.rdb里的数据)
```

#### 055-持久化-save指令工作原理

```java
RDB启动方式-save指令工作原理

注意：
	save指令的执行会阻塞当前Redis服务器，直到当前RDB过程完成为止，有可能会造成长时间阻塞，线上环境不建议使用。
	--> 线上环境中不建议使用save这种指令，因为很拉服务器的性能效率，有可能造成长时间的阻塞
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200405144629553.png)

#### 056-持久化-bgsave指令与工作原理

```java
RDB启动方式
	数据量过大，单线程执行方式造成效率过低，如何处理？
后台执行
	谁：redis操作者（用户）发起指令；reds服务器控制指令执行
	什么时间：即时（发起）；合理的时间（执行）
	干什么事情：保存数据
```

```java
RDB启动方式— bgsave指令
命令
	bgsave
	注释：bg-background
作用
	手动启动后台保存操作，但不是立即执行
```

RDB启动方式— bgsave指令工作原理

```java
127.0.0.1:6379> bgsave
Background saving started
127.0.0.1:6379>
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040514595481.png)
查看我们的日志文件
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200405150402629.png)

```java
注意：
	bgsave命令是针对save阻塞问题做的优化，(save是马上执行，并且加入到任务执行序列中)
	Redis内部所有涉及到RDB操作都来用bgsave的方式，save命令可以放弃使用
```

```java
RDB启动方式 — bgsave指令相关配置
	dbfilenane dump.rdb
	dir
	rdbcompression yes
	rdbchecksum yes
	stop-writes-on-bgsave-error yes
		说明：后台存储过程中如果出现错误现象，是否停止保存操作
		经验：通常默认为开启状态
```

redis-6379.conf配置文件 更新后

```java
	# 设置当前服务器启动端口
	port 6379

	# 以守护进程方式启动，使用本启动方式，redis讲义服务的形式存在，日志将不再打印到命令窗口
	daemonize yes

	# 设定日志文件名，便于查阅
	logfile "6379.log"

	# 设定当前服务文件保存的位置，包含日志文件、持久化文件等
	dir /usr/local/redis-5.0.6/conf/logData

	# 设置 .rdb文件名 (RDB持久化文件名)
	dbfilename dump-6379.rdb

	# 开启压缩(持久化文件)
	rdbcompression yes

	# 开启加载检测
	rdbchecksum yes

	# bgsave后台存储过程中，如果出现错误现象，是否停止保存操作
	stop-writes-on-bgsave-error yes
```

#### 057-持久化-save配置与工作原理

```java
RDB启动方式
	反复执行保存指令，忘记了怎么办？不知道数据产生了多少变化，何时保存？
自动执行
	谁：redis服务器发起指令（基于条件）
	什么时间：满足条件
	干什么事情：保存数据
```

```java
RDB启动方式—save配置
	配置
		save second changes
	作用
		满足 限定second的时间范围内 key的变化数量 达到 指定changes数量 即进行持久化
	参数
		second：监控时间范国
		changes：监控key的变化量
	位置
		在conf文件中进行配置
	范例
		save 900 1
		save 300 10
		save 60 10000
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200405153058755.png)

```java
注意：
	save配要根据实际业务情兄进行设置，频度过高或过低都会出现性能问题，结果可能是灾难性的
	save配置中对于second与changes设置通常具有互补对应关系，尽量不要设置成包含性关系
	save配置启动后执行的是bgsave操作
```

redis-6379.conf

```java
	# 设置当前服务器启动端口
	port 6379

	# 以守护进程方式启动，使用本启动方式，redis讲义服务的形式存在，日志将不再打印到命令窗口
	daemonize yes

	# 设定日志文件名，便于查阅
	logfile "6379.log"

	# 设定当前服务文件保存的位置，包含日志文件、持久化文件等
	dir /usr/local/redis-5.0.6/conf/logData

	# 设置 .rdb文件名 (RDB持久化文件名)
	dbfilename dump-6379.rdb

	# 开启压缩(持久化文件)
	rdbcompression yes

	# 开启加载检测
	rdbchecksum yes

	# bgsave后台存储过程中，如果出现错误现象，是否停止保存操作
	stop-writes-on-bgsave-error yes

	# 指定时间内，key的更改达到指定的数量，Redis自动进行gbsave操作
	# 此处设置的是每300s发生10次变化，就进行一次bgsave
	#save 900 1
	save 300 10
	#save 60 10000
```

#### 058-持久化-RDB三种启动方式对比与优缺点分析

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040515384687.png)

```java
rdb特殊启动形式
	全复制
		在主从复制中详细讲解
	服务器运行过程中重启
		debug reload
	关闭服务器时指定保有数据
		shutdown save //可以关闭redis-server
```

```java
RDB优点
	RDB是一个紧凑压缩的二进制文件，存效率较高
	RDB内部存储的是redis在某个时间点的数据快照，非常适合用于数据备份，全量复制等场景
	RDB恢复数据的速度要比AOF快很多
	应用：服务器中每X小时执行bgsave备份，并将RDB文件拷贝到远程机器中，用于灾难恢复
RDB缺点
	RDB方式无论是执行指令还是利用五，无法到实时持久化，具有较大的可能性丢失数据
	bgsave指令每次运行要执行fork操作创建子进程，要牺牲掉一些性能
	Redis的众多版本中未进行RDB文件格式的版本统一，有可能出现各版本服务之间数据格式无法兼容现象
```

### 2.2.3 AOF

#### 059-持久化-AOF简介

```java
RDB存储的弊端
	存储数据量较大，效率较低
		基于快照思想，每次读写都是全部据，当数据量巨大时，效率非常低
	大数据量下的IO性能较低
	基于fok创建子进程，内存产生额外消耗
	宕机带来的数据丢失冈脸
解决思路
	不写全数据，仅记录部分数据
	改记录数据为记录操作过程
	对所有操作均进行记录，排除丢失数据的风险
```

```java
AOF概念

	AOF(append only file)持久化：以独立日志的方式记录每次写命令，
	重启时再重新执行AOF文件中的命令，达到恢复数据的目的。
	与RDB相比可以简单描述为 改记录数据 为 记录数据产生的过程

	AOF的主要作用是解决了数据持久化的实时性，目前已经是Redis持久化的主流方式
```

#### 060-持久化-AOF持久化策略基本操作

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200405170350709.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200405181138897.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200405185724672.png)

```java
AOF写数据三种策略（appendfsync）
	always(每次)
		每次写入操作均同步到AOF文件中，数据零误差，性能较低，不建议使用
	everysec(每秒)
		毎秒将缓冲区中的指令同步到AOF文件中，数据准确性铰高，性能铰高，建议使用，也是默认配置
		在系统突然宕机的情况下丢失1秒内的数据
	no(系统控制)
		由操作系统控制每次同步到AOF文件的周期，整体过程不可控
```

```java
AOF功能开启
	配置
		appendonly yes|no
	作用
		是否开启AOF持久化功能，默认为不开启状态
	配置
		appendfsync always|everysec|no
	作用
		AOF写数据策略
```

```java
AOF相关配置
	配置
		appendfilename filename
	作用
		AOF持久化文件名，默认文件名末 appendonly.aof，建议配置为 appendonly-端口号.aof
	配置
		dir
	作用
		AOF持久化文件保存路径，与RDB持久化文件保持一致即可
```

redis-6379.conf

```java
####################################################
# 设置当前服务器启动端口
port 6379

# 以守护进程方式启动，使用本启动方式，redis讲义服务的形式存在，日志将不再打印到命令窗口
daemonize yes

# 设定日志文件名，便于查阅
logfile "6379.log"

# 设定当前服务文件保存的位置，包含日志文件、持久化文件等
dir /usr/local/redis-5.0.6/conf/logData

####################################################
# 设置 .rdb文件名 (RDB持久化文件名)
dbfilename dump-6379.rdb

# 开启压缩(持久化文件)
rdbcompression yes

# 开启加载检测
rdbchecksum yes

####################################################
# bgsave后台存储过程中，如果出现错误现象，是否停止保存操作
stop-writes-on-bgsave-error yes

# 指定时间内，key的更改达到指定的数量，Redis自动进行gbsave操作
# 此处设置的是每300s发生10次变化，就进行一次bgsave
save 900 1
save 300 10
save 60 10000

####################################################
# 开启对AOF的支持
appendonly yes

# 指定AOF写数据的策略
appendfsync everysec

# 设置AOF持久化文件名
appendfilename appendonly-6379.aof

####################################################
```

#### 061-持久化-AOF重写概念与命令执行

```java
AOF写数据遇到的问题
	如果连续执行如下指令该如何处理
		127.0.0.1:6379> set name zs
		127.0.0.1:6379> set name Is
		127.0.0.1:6379> set name wv //只有这一次最终生效 --> 127.0.0.1:6379> set name ww
		127.0.0.1:6379> incr num
		127.0.0.1:6379> Incr nun
		127,0.0.1:6379> Incr nun    //假设num刚开始不存在--> 127.0.0.1:6379> set nun3
```

```java
AOF重写
	随着命令不断写入AOF，文件会越来越大，为了解决这个问题，Reds引入了AOF重写机制压缩文件体积。
	AOF文件重写是将Redi进程内的数据转化为写命令同步到新AOF文件的过程，简单说就是将对同一个数
	据的若干个条命令执行结果转化成最终结果数据对应的指令进行记录。
AOF重写作用
	降低磁盘占用量，提高磁盘利用率
	提高持久化效率，降低寺久化写时间，提高O性能
	降低数据恢复用时，提高数据恢复效率
```

```java
AOF重写规则
	进程内已超时的数据不再写入文件
	忽略无效指令，重写时使用进程内数据直接生成，这样新的AOF文件只保留最终数据的写入命令
		如del key1、 hdel key2、 srem key3、 set key4111、 set key4222等
	对同一数据的多条写命令合并为一条命令
		如 Push list1 a、 Push list1 b、 Push list1 c可以转化为：Push list1 a b c
		为防止数据量过大造成客户端缓冲区溢出，对list、set、hash、zset等类型，每条指令最多写入64个元素
```

```java
AOF重写方式
	手动写
		bgrewriteaof
	自动重写
		auto-aof-rewrite-min-size size
		auto-aof-rewrite-percentage percentage
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406161450575.png)

#### 062-持久化-AOF自动重写配置

```java
AOF自动重写方式
	自动重写触发条件设置
		auto-aof-rewrite-min-size 	 size 		//配置的：aof自动重写的临界值
		auto-aof-rewrite-percentage  percent	//：aof自动重写的百分比
	自动重写触发比对参数（运行指令 info Persistence获取具体信息）
		aof_current_size  //aof缓存中，当前已经缓存了多少 ，当大于size时，就进行重写
		aof base size
	自动重写触发条件
		aof_current_size>auto-aof-rewrite-min-size
		( (aof_current_size-aof_base_size) / aof_base_size )  > auto-aof-rewrite-percentage

AOF自动重写方式
	自动重写触发条件设置：auto-aof-rewrite-min-size size //配置的：aof自动重写的临界值
	自动重写触发比对参数：aof_current_size               //aof缓存中，当前已经缓存了多少 ，当大于size时，就进行重写
	自动重写触发条件：aof_current_size>auto-aof-rewrite-min-size //当缓存大于size时，就进行重写
AOF自动重写方式
	自动重写触发条件设置：auto-aof-rewrite-percentage  percent	//：aof自动重写的百分比
	自动重写触发比对参数：aof_base_size
	自动重写触发条件：( (aof_current_size-aof_base_size) / aof_base_size )  > auto-aof-rewrite-percentage
```

#### 063-持久化-AOF重写工作原理

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406164353511.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406164409758.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406164945942.png)

### 2.2.4 RDB与AOF区别

#### 064-持久化-RDB与AOF方案比对

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406165434983.png)

```java
RDB与AOF的选择之惑
	对数据非常敏感，建议使用默认的AOF持久化方案
		AOF持久化策略使用 everysecond，每秒钟 fsync一次。该策略 redis仍可以保持很好的处理性能，当出现问题时，最多丢失0-1秒内的数据。
		注意：由于AOF文件存储体积较大，且恢复速度较慢
	数据呈现阶段有效性，建议使用RDB持久化方案
		数据可以良好的做到阶段内无丢失（该阶段是开发者或运维人员手工维护的），且恢复速度较快，阶段点数据恢复通常采用RDB方案
		注意：利用RDB实现紧凑的数据持久化会使 Redis降的很低
	综合比对
		RDB与AOF的选择实际上是在做一种权衡，每种都有利有弊
		如不能承受数分钟以内的数据丢失，对业务数据非常敏感，选用AOF
		如能承受数分钟以内的数据丟失，且追求大数据集的恢复度，选用RDB
		灾难恢复选用RDB
		双保险策略，同时开启RDB和AOF，重启后， Redis优先使用AOF来恢复数据，降低丟失数据的量
```

### 2.2.5 持久化应用场景

#### 065-持久化-持久化应用场景分析

```java
Tips1：redis用于控制数据库表主键id，为数据库表主键ID提供生成策略，保障教据库表的主键唯一性
	不建议使用持久化，因为可能导致ID重复
	直接从数据库中找到最大的那个ID，然后从ID+1直接往下用就行了

Tips2：redis控制数据的生命周期，通过数据是否失效控制业务行为，适用于所有具有时效性限定控制的操作

Tips3：redis应用于各种结构型和非结构型高热度数据访问加速
	不使用持久化

Tips4：redis应用于购物车数据存储设计
	不使用持久化

Tips5：redis应用于抢购、限购类、限量发放优患卷、激活码等业务的数据存储设计
	对于这种快速存储，快速消失的数据
	建议使用持久化

Tips6：redis应用于具有操作先后顺序的数据控制
	对于这种临时的任务，如果量不是特别大的话，建议使用持久化

Tips7：redis应用于最新消息展示
	对于这种临时的任务，如果量不是特别大的话，建议使用持久化

Tips8：redis应用于随机推荐类信息检索，例如热点歌单推荐，热点新闻推荐，热卖旅游线路，应用APP推荐，大V推荐等

Tips9：redis应用于同类信息的关联搜索，一度关联搜索，深度关联搜索
	从MySQL数据库里读取就行，不使用Redis持久化

Tips10：redis应用于同类型不重复数据的合并、取交集操作

Tips11：redis应用于同类型数据的快速去重

Tips12：redis应用于基于黑名单与白名单设定的服务控制
	黑名单：长期策略的话，数据库里肯定要存储
	黑名单：不是长期策略，短期策略，建议使用Redis持久化
	白名单：数据库里肯定有存储，一般不需要Redis持久化

Tips13：redis应用于计数器组合排序功能对应的排名
	建议Redis持久化

Tips14：redis应用于定时任务执行顺序管理或任务过期管理

Tips15：redis应用于及时任务/消息队列执行管理
	任务队列、消息队列：不建议使用

Tips16：redis应用于按次结算的服务控制
	不重要时，不使用
	重要，使用

Tips17：redis应用于基于时间顺序的数据操作，而不关注具体时间
```

```java
总结
	Redis持久化
		什么是持久化
		RDB
			save 	//save指令
			bgsave 	//bgsave指令
			配置		//使用的是bgsave
		AOF
			持久化写策略//三种：always second
			重写     //AOF文件会很大，所以要使用这种优化策略
```

## 2.3 事务

### 2.3.1 事务简介

#### 066-事务-redis事务简介

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406174100684.png)

```java
什么是事务
	Redis执行指令过程中，多条连续执行的指令被干扰，打断，插队

	Redis事务就是一个命令执行的队列，将一系列预定义命令，包装成一个整体（一个队列）。
	当执行时，一次性按照添加顺序依次执行，中间不会被断或者干扰

	一个队列中，一次性、顺序性、排他性的执行一系列命令
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406174312601.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406174325262.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406174408384.png)

### 2.3.2 事务基本操作

#### 067-事务-事务的基本操作（定义，取消，执行）

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406174842390.png)

```java
事务的基本操作
	开启事务
		multi
		作用：设定事务的开启位置，此指令执行后，后续的所有指令均加入到事务中
	执行事务
		exec
		作用：设定事务的结束位置，同时执行事务中所有的指令。与multi成对出现，成对使用

	注意：加入事务的命令暂时进入到任务队列中，并没有立即执行，只有执行exec命令才开始执行
```

```java
争事务定义过程中发现出了问题，怎么办？
	取消事务
		discard
		作用：终止当前事务的定义，发生在multi之后，exec之前
```

#### 068-事务-事务的工作流程

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406175855931.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406180404134.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406180428627.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040618044545.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406180504231.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406180518129.png)

```java
当事务中遇到discard指令时
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406180633856.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406180642445.png)

#### 069-事务-事务操作的注意事项

```java
定义事务的过程中，命令格式输入错误怎么办？
	语法错误：命令书写格式有误
	处理结果：如果定义的事务中所包含的命令存在语法错误，整体事务中所有命令均不会执行。包括那些语法正确的命令。
```

```java
定义事务的过程中，命令执行出现错误怎么办？
	运行错误：命令格式正确(但是指令的语法错误)，无法正确的执行。例对list进行incr操作
	处理结果：能够正确运行的命令会执行，运行错误的命令不会被执行
	注意：已经执行完毕的命令对应的数据不会自动回滚，需要程序员自己在代码中实现回滚。
```

```java
手动进行事务回滚
	记录操作过程中被影响的数据之前的状态
		单数据：string
		多数据：hash、list、set、zset
	设置指令恢复所有的被修改的项
		单数据：直接set（注意周边属性，例如时效）
		多数据：修改对应值或整体克隆复制
```

### 2.3.3 锁

#### 070-事务-锁

```java
基于特定条件的事务执行
	业务场景
		天猫双11热卖过程中，对已经售罄的货物追加补货，4个业务员都有权限进行补货。
		补货的操作可能是一系列的操作，牵扯到多个连续操作，如何保障不会重复操作？
	业务分析
		多个客户端有可能同时操作同一组数据，并且该数据一旦被操作修改后，将不适用于继续操作
		在操作之前锁定要操作的数据，一旦发生变化，终止当前操作
```

```java
基于特定条件的事务执行—锁
	解决方案
		对key添加监视锁，在执行exec前如果key发生了变化，终止事务执行
			watch key1 key2……   //在开启事务之前去watch
		取消对所有key的监视
			unwatch
	watch指令监控的东西一旦发生改变，下面定义的事务就不会再执行了
```

### Tips 18：

```java
Tips 18：
	redis应用于 基于状态控制的 批量任务执行
```

#### 071-事务-分布式锁

```java
基于特定条件的事务执行
	业务场景
		天猫双11热卖过程中，对已经售罄的货物追加补货，且补货完成。客户购买热情高涨，3秒内将所有商
		品购买完毕。本次补货已经将库存全部清空，如冋避免最后一件商品不被多人同时购买？【超卖问题】
	业务分析
		使用 watch监控一个key有没有改变已经不能解决问题，此处要监控的是具体数据
		虽然 Redis是单线程的，但是多个客户端对同一数据同时进行操作时，如何避兔不被同时修改？
```

```java
基于特定条件的事务执行—分布式锁
	解决方案
		使用 setnx设置一个公共锁
			setnx lock-Key va⊥ue
		利用setnx命令的返回值特征，有值则返回设置失败，无值则返回设置成功
			对于返回设置成功的，拥有控制权，进行下一步的具体业务操作
			对于返回设置失败的，不具有控制权，排队或等待
		操作完毕通过del操作释放锁

	注意：上述解决方案是一种设计概念，依赖规范(大家操作的是同一把锁)保障，具有风险性
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406221643360.png)

### Tips 19

```java
Tips 19
	redis应用：基于分布式锁 对应的场景控制
```

#### 072-事务-死锁解决方案

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406221854440.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200406221905255.png)

```java
上图：上着厕所的人，上锁了，但是睡着了，那外面等待的人得有多崩溃啊
实际：上锁了，正用着呢，但是宕机了；或者忘记打开了
```

```java
基于特定条件的事务执行
	业务场景
		依赖分布式锁的机制，某个用户操作时，对应的客户端宕机，且此时已经获取到锁。如何解决？
	业务分析
		由于锁操作由用户控制加锁解锁，必定会存在加锁后未解锁的风险
		需要解锁操作不能仅依赖用户控制，系统級别要给出对应的保底处理方案
```

```java
基于特定条件的事务执行—分布式锁改良
	解决方案
		使用 expire为锁key添加时间限定/时效，到时不释放，放弃锁
			expire lock-key second
			pexpire lock-key milliseconds
		由于操作通常都是微秒或毫秒级，因此该锁定时间不宜设置过大。具体时间需要业务测试后确认
			例如：持有锁的操作最长执行时间127ms，最短执行时间7ms
			测试百万次最长执行时间对应命令的最大耗时，测试百万次网络延迟平均耗时
			锁时间设定推荐：最大耗时*120%+平均网络延迟*110%
			如果业务最大耗时 << 网络平均延迟，(通常为2个数量级)，取其中单个耗时较长即可
```

```java
127.0.0.1:6379> set name 123
ok
127.0.0.1:6379> setnx lock-name 1
integer) 1
127.0.0.1:6379> expire lock-name 20
integer) 1
127.0.0.1:6379> get name
"123"
127.0.0.1:6379> del lock-name
integer) 1
127.0.0.1:6379>
```

## 2.4 删除策略

### 2.4.1 过期数据

#### 073-删除策略-过期数据的概念

```java
Redis中的数据特征
	Redis是一种内存级数据库，所有数据均存放在内存中，内存中的数据可以通过TTL指令获取其状态
		XX：具有时效性的数据
		1：永久有效的数据
		2：已经过期的数据 或 被删除的数据 或 未定义的数据
	过期的数据真的删除了吗？
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407093309614.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407093318815.png)

```java
过期数据删除策略
	1.定时删除
	2.惰性删除
	3.定期删除
```

### 2.4.2 数据删除策略

#### 074-删除策略-过期数据的底层存储结构

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407093845423.png)

```java
过期数据删除策略的目标
	在内存占用与CPU占用之间寻找一种平衡，
	顾比失彼都会造成整体redis性能的下降，甚至引发服务器宕机或内存泄露
```

#### 075-删除策略-定时删除与惰性删除

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407094639869.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040709465084.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407094659838.png)

```java
过期数据删除策略
	定时删除
		创建一个定时器，当key设置有过期时间，且过期时间到达时，由定时器任务立即执行对键的删除操作
		优点：节约内存，到时就删除，快速释放掉不必要的内存占用
		缺点：CPU压力很大，无论CPU此时负载量多高，均占用CPU，会影响edis服务器响应时间和指令吞吐量
		总结：用处理器性能换取存储空间(拿时间换空间)(即 拿CPU换内存)
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407095219427.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407095231405.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407095241546.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407095255768.png)

```java
数据删除策略
	惰性删除
		数据到达过期时间，不做处理。等下次访问该数据时
			如果未过期，返回数据
			发现已过期，删除，返回不存在
		优点：节约CPU性能，发现必须删除的时候才删除
		缺点：内存压力很大，出现长期占用内存的数据
		总结：用存储空间换取处理器性能(拿空间换时间)(即 拿内存换CPU)
```

#### 076-删除策略-定期删除

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407101130547.png)

```java
定期删除
	周期性轮询 Redis库中的时效性数据，采用随机抽取的策略，利用过期数据占比的方式控制删除频度
	特点1：CPU性能占用设置有峰值，检测频度可自定义设置
	特点2：内存压力不是很大，长期占用内存的冷数据会被持续清理
	总结：周期性抽查存储空间（随机抽查，重点抽查）
```

```java
删除策略比对
	1.定时删除
		节约内存，无占用		不分时段占用CPU资源，频度高			拿时间换空间
	2.惰性删除
		内存占用严重			延时执行，CPU可利用率高				拿空间换时间
	3.定期删除
		内存定期随机清理		每秒花费固定的CPU资源维护内存		随机抽查，重点抽查
```

### 2.4.3 逐出算法

#### 077-删除策略-逐出策略

```java
逐出算法
	新数据进入检测
		当新数据进入redis时，如果内存不足怎么办？

			Redis使用内存存储数据，在执行每一个命令前，会调用freeMemoryIfNeeded()检测内存是否充足。
			如果内存不满足新加入数据的最低存储要求，redis要临时删除一些数据为当前指令凊理存储空间。清理数据的策略称为逐出算法。

			注意：逐出数据的过程不是100%能够清理出足够的可使用的内存空间，如果不成功则反复执行。
			当对所有数据尝试完毕后，如果不能达到内存清理的要求，将出现错误信息。

			（error）OOM command not allowed when used memory >'maxmemory'
```

```java
影响数据逐出的相关配置
	最大可使用内存
		maxmemory
		占用物理内存的比例，默认值为0，表示不限制。生产环境中根据需求设定，通常设置在50%以上
	每次选取待删除数据的个数
		maxmemory-samples
		选取数据时并不会全库扫描，导致严重的性能消耗，降低读写性能。因此采用随机获取数据的方式作为待检测删除数据
	删除策略
		maxmemory-policy
		达到最大內存后的，对被挑选出来的数据进行删除的策略
```

```java
影响数据逐出的相关配置
	检测易失数据（可能会过期的数据集 server.db[i].expires）
		volatile-lru：挑选最近最少使用的数据淘汰
		volatile-lfu：挑选最近使用次数最少的数据淘汰
		volatile-ttl：挑选将要过期的数据淘汰
		volatile-random：任意选择数据匋汰

		LRU:Least Recently Used -- 最近，'最长时间没使用'的(规定时间内)
		LFU Least Frequently Used- 最近，'最少使用次数'的(规定时间内)

	检测全库数据（所有数据集 server.db[i].dict）
		allkeys-lru：挑选最近最少使用的数据淘汰
		allkeys-lfu：挑选最近使用次数最少的数据淘汰
		allkeys-random：任意选择数据淘汰
	放弃数据驱逐
		no- eviction（驱逐）：禁止驱逐数据倨（redis4.0中默认策略），会引发错误OOM（Out Of Memory）
```

```java
	.conf配置文件中-配置逐出策略
		maxmemory-policy volatile-lru
```

```java
数据逐出策略配置依据
	使用info命令输出监控信息，查询缓存hit和miss的次数，根据业务需求调优Redis配置
```

```java
Redis删除策略
	数据删除策略(过期数据)
		定时刪除
		惰性删除
		定期删除
	数据逐出策略(时效性数据和永久性数据)
		8种策略

	加速运行效率
		减少无效的key的存储
		为我们释放出一些更加有用的空间来
		达到数据的快速操作与利用

	平衡是你需要把握的核心操作
```

## 2.5 redis.conf

#### 078-服务器配置-redis.conf配置

```java
服务器基础配置
	服务器端设定
		设置服务器以守护进程的方式运行
			daemonize yes|no
		绑定主机地址
			bind 127.0.0.1
		设置服务器端口号
			port 6379
		设置数据库数量
			databases 16

	日志配置
		设置服务器以指定日志记录级别
			loglevel debug|verbose|notice|warning
		日志记录文件名
			1ogfi1e端囗号.1og
		注意：日志级别
				开发期设互为 verbose即可，
				生产环境(上线运行的)中配互为 notice，简化日志输出量，降低写日志IO的频度

	客户端配置
		设置同一时间最大客户端连接数，默认无限制。当客户端连接到达上限， Redis会关闭新的连接，0表示不限制上限
			maxclients 0
		客户端闲置等待最大时长，达到最大值后关闭连接。如需关闭该功能，设置为0。 (多长时间不用，自动断掉与client的连接)
			timeout 300

	多服务器快捷配置
		导入并加载指定配置文件信息，用于快速创建redis公共配置较多的redis实例配置文件，便于维护  (有点类似于继承，用于加速配置)
		相对路径用的比较多，绝对路径用的少一些
		主的配置文件，起一个特殊的名字；其他的用端口号起名字就行了
			inc1ude  /path/ server-端口号.conf
```

redis-6379.conf

```java
####################################################
#绑定IP
bind 127.0.0.1

# 设置当前服务器启动端口
port 6379

# 数据库个数
databases 16

# 以守护进程方式启动，使用本启动方式，redis讲义服务的形式存在，日志将不再打印到命令窗口
daemonize yes

# 设定日志文件名，便于查阅
logfile "6379.log"

# 设定当前服务文件保存的位置，包含日志文件、持久化文件等
dir /usr/local/redis-5.0.6/conf/logData

####################################################
# 设置 .rdb文件名 (RDB持久化文件名)
dbfilename dump-6379.rdb

# 开启压缩(持久化文件)
rdbcompression yes

# 开启加载检测
rdbchecksum yes

####################################################
# bgsave后台存储过程中，如果出现错误现象，是否停止保存操作
stop-writes-on-bgsave-error yes

# 指定时间内，key的更改达到指定的数量，Redis自动进行gbsave操作
# 此处设置的是每300s发生10次变化，就进行一次bgsave
save 900 1
save 300 10
save 60 10000

####################################################
# 开启对AOF的支持
appendonly yes

# 指定AOF写数据的策略
appendfsync everysec

# 设置AOF持久化文件名
appendfilename appendonly-6379.aof

####################################################
```

## 2.6 高级数据类型

### 2.6.1 Bitmaps

#### 079-高级数据类型-bitmaps介绍与基本操作

```java
bitmaps
	并不是一个全新的数据类型
	只是对string中存储对的数，进行二进制位(即 以字节为单位进行操作)操作的接口
	作用：快速的做状态统计用的，用bit保存数据
```

```java
Bitmaps类型的基础操作
	获取指定key对应偏移量上的bit值
		getbit key offset
	设置指定key对应偏移量上的bit值，value只能是1或0
		setbit key offset valuea
```

#### 080-高级数据类型-bitmaps扩展操作

```java
Bitmaps类型的扩展操作
	业务场景
	电影网站
		统计每天某一部电影是否被点播
		统计每天有多少部电被点播
		统计每周/月/年有多少部电影被点播
		统计年度哪部电彯没有被点播
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407182935472.png)

```java
Bitmaps类型的扩展操作
	对指定key按位进行交、并、非、异或操作，并将结果保存到 deskey中
		bitop operator deskey key1 [key2...]
			operator 类型：
				and：交
				or：并
				not：非
				xor：异或
			destkey：运算结果存放的地方
	统计指定key中1的数量 (不填范围，就是统计全部的)
		bitcount key [start end]
```

### Tips 21:

```java
Tips 21:
	Redis应用于 信息状态统计
```

### 2.6.2 HyperLogLog

#### 081-高级数据类型-HyperLogLog

```java
HyperLogLog
	作用：统计不重复数据的数量
	作用：做基数统计的

	比如：统计独立UV
		原始方案：set
			存储每个用户的id（字符串）
		改进方案：Bitmaps
			存储每个用户状态（bit）
		全新的方案：Hyperloglog
```

```java
基数
	基数就是数据集合去重后元素的个数
	HyperLogLog是用来做基数统计的，运用了LogLog算法
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407184551242.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407184829590.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407184840233.png)

```java
HyperLogLog类型的基本操作
	添加数据
		pfadd key element [element ..]
	统计数据
		pfcount key [key ..]
	合并数据
		pfmerge deskey sourcekey [sourcekey...]
```

```java
Tips 22:
	Redis 应用于独立信息统计
```

```java
HyperLogLog相关说明
	用于进行基数统计，不是集合，不保存数据，只记录数量而不是具体数据
	核心是基数估算算法，最终数值存在一定误差
	误差范围：基数估计的结果是一个带有0.81%标准错误的近似值
	耗空间极小，每个hyperloglog key占用了12K的内存用于标记基数
	pfadd命令不是一次性分配12K内存使用，会随着基数的增加内存逐渐増大
	pfmerge命令合并后占用的存储空间为12K，无论合并之前数据量多少
```

### 2.6.3 GEO

#### 082-高级数据类型-GEO

```java
	作用：根据点的位置(经纬度)，计算点之间的距离等
	作用：做地理位置信息计算的

	GEO类型的基本操作
		添加坐标点
			geoadd key longitude latitude member [longitude latitude member ..]
			       key 把这些点放到一个容器中
			       longitude  latitude  经纬度信息
			       member 这个点的名称
		获取坐标点
			geopos key member [member ..]
		计算坐标点距离
			geodist key member member2 [unit]
				unit：单位  m-米 km-千米

		根据坐标求范围内的数据(指定范围内有多少个点)
			georadius key longitude latitude radius m|km|ft|mi [withcoord] [withdist] [withhash] [count count]
		根据点求范围内数据
			georadiusbymember key member radius m|km|ft|mi [withcoord] [withdist] [withhash] [count count]
		获取指定点对应的坐标hash值
			geohash key member [member...]
```

### Tips 23:

```java
Tips 23:
	Redis应用于 地理位置计算
```