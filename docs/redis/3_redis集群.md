# 3.Redis集群

## 3.1 主从复制

### 3.1.1 主从复制简介

#### 083-主从复制-主从复制简介

```java
互联网“三高”架构
	高并发
	高性能
	高可用
服务器的可用性：
				一年的时间(秒数) - 一年总的宕机时间(秒数)
			--------------------------------------  *100% = ？
			          一年的时间(秒数)
	业界可用性目标5个9，即99.999%，即服务器年宕机时长低于315秒，约5.25分钟
```

```java
你的“ Redis"是否高可用
	单机redis的风险与问题
		问题1机器故障
			现象：硬盘故障、系统崩溃
			质：数据丢失，很可能对业务造成灾难性打击
			结论：基本上会放弃使用 redis
		问题2容量瓶颈
			现象：内存不足，从16G升级到64G，从64G升级到128G，无限升级内存
			本质：穷，硬件条件跟不上
			结论：放弃使用 redis
		结论:
			为了避免单点Redis服务器故障，准备多台服务器，互相连通。将数据复制多个副本
			保存在不同的服务器上，'连接在一起'，并保证数据是'同步'的。即使有其中一台服务器
			宕机，其他服务器依然可以继续提供服务，实现 Redis的高可用，同时实现数据'冗余备份'
```

多台服务器连接方案

```java
多台服务器连接方案：使用这种方式，就可以实现高可用
	提供数据方：master
		主服务器，主节点，主库
		主客户端
	接收数据方：slave
		从服务器，从节点，从库
		从客户端
	需要解决的问题
		数据同步
	核心工作：
		master的数据复制到save中
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040720080215.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407201419342.png)

```java
由主计算机向从计算机复制数据，这就是这一章要讲的内容：主从复制
```

```java
主从复制
	主从复制即将master中的数据即时、有效的复制到slave中
	特征：一个master可以拥有多个slave，一个slave只对应一个master
	职责
		master：
			写数据
			执行写操作时，将出现变化的数据自动同步到slave
			读数据（可忽略）
		slave
			读数据
			写数据（禁止）
```

#### 084-主从复制-主从复制的作用

高可用集群
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407204032912.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407204044145.png)
多个maste(master集群)，用到了下面的哨兵
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407204437822.png)

```java
主从复制的作用
	读写分离：
		master写、 slave读，提高服务器的读写负载能力
	负载均衡：
		基于主从结构，配合读写分离，由slave分担master的负载，并根据需求的变化，改变
		slave的数量，通过多个从节点分担数据读取负载，大大提高Redis服务器并发量与数据吞吐量
	故障恢复：
		当master出现问题的时候，由slave提供服务，实现快速的故障恢复
	数据冗余：
		实现数据热备份，是持久化之外的一种数据冗余方式
	高可用基石：
		基于主从复制，构建哨兵模式与集群，实现Redis的高可用方案
```

### 3.1.2 主从复制工作流程

#### 085-主从复制-主从复制的三个阶段

```java
主从复制工作流程
	总述
		主从复制过程大体可以分为3个阶段
			建立连接阶段（即准备阶段）
			数据同步阶段
			命令传播阶段
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407232502344.png)

#### 086-主从复制-工作流程（1）建立连接阶段

```java
主从复制工作流程
	阶段一：建立连接阶段
		建立s1ave到master的连接，使master能够识别slave，并保存slave端口号
```

```java
	建立连接阶段工作流程
		步骤1：设置master的地址和端口，保存master信息 //1 2 3
		步骤2：建立socket连接                      //4
		步骤3：发送ping命令(定时器任务)              //5 6 检测是否断开连接
		步骤4：身份验证                            //7 8
		步骤5：发送slave端口信息                    //9 10
		至此，主从连接成功！

	最终达到的状态
		slave：
			保存master的地址和端口
		master：
			保存slave的端口
		总体：
			它们之间创建了连接的socket，用它来完成信息的交换
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200407233835854.png)

```java
Redis一般不对外提供服务/功能，外界是看不到它的；都是内网访问，所以说即使不加身份验证也没关系
```

#### 087-主从复制-搭建主从结构

```java
主从复制工作流程
	主从连接（slave连接master）
		方式一：客户端发送命令
			slaveof <masterip> <masterport>
		方式二：启动服务器参数
			redis-server --slaveof <masterip> <masterport>
		方式三：服务器配置
			slaveof <masterip> <masterport>

		slave系统信息
			master_link_down_since_seconds
			masterhost
			masterport
		master系统信息
			slave_listening_port（多个）
```

```java
	主从断开连接
		客户端发送命令
			slaveof no one
```

```java
	授权访问
		master'配置文件'设置密码		//在配置文件中设置密码
			requirepass <password>
		master客户端发送命令设置密码	//master已经启动了，想加密码，就在master它的client中通过指令设置密码
			config set requirepass <password>
			config get requirepass

		//一旦master设置了密码，slave想访问时，slave必须挂上密码


		slave客户端发送命令设置密码//指令里加上密码，来获得master的授权
			auth <password

		slave配置文件设置密码		//配置文件里加上密码，来获得master的授权
			auth <password>

		启动客户端设置密码			//访问带密码的master时，必须挂上密码，来获得master的授权
			redis-cli  -a  <pas sword>
```

#### 088-主从复制-工作流程（2）数据同步阶段（简）

```java
这个阶段：slave找master要数据，master把数据给它
最终达到的结果：slave与master数据同步
```

```java
主从复制工作流程
	阶段二：数据同步阶段工作流程
		在s1ave初次连接 master后，复制 master中的所有数据到s1ave
		将s1ave的数据库状态更新成 master当前的数据库状态
```

```java
主从复制工作流程
	数据同步阶段工作流程 //全量复制+部分复制
		步骤1：请求同步数据
		步骤2：创建RDB同步数据
		步骤3：恢复RDB同步数据
		步骤4：请求部分同步数据
		步骤5：恢复部分同步数据
		至此，数据同步工作完成！
	状态
		slave：
			具有 master端全部数据，包含RDB过程接收的数据
		master：
			保存save当前数据同步的位置
	总体：
		它们之间完成了数据克隆
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200408151204227.png)

#### 089-主从复制-数据同步阶段注意事项

```java
数据同步阶段 master说明
	1.如果 master数据量巨大，数据同步阶段应避开流量高峰期，避兔造成 master阻塞，影响业务正常执行
	2.复制缓冲区大小设定不合理，会导致数据溢出。如进行全量复制周期太长，进行部分复制时发现数据已经存
	  在丢失的情况，必须进行第二次全量复制，致使s1ave陷入死循环状态
	  		repl-backlog-size  1mb
	3. master单机内存占用主机内存的比例不应过大，建议使用50%-70%的内存，留下30%-50%的内存用于执行 bgsave命令和创建复制缓冲区
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/202004081536191.png)

```java
数据同步阶段slave说明
	1.为避免s1ave进行全量复制、部分复制时服务器响应阻塞或数据不同步，建议关闭此期间的对外服务
		slave-serve-stale-data yes|no
	2.数据同步阶段， master发送给 slave信息可以理解 master是s1ave的一个客户端，主动向s1ave发送命令
	3.多个s1ave同时对 master请求数据同步， master发送的RDB文件增多，会对带宽造成巨大冲击，
	  如果master带宽不足，因此数据同步霱要根据业务务需求，适量错峰
	4.s1ave过多时，建议调整拓扑结构，由一主多从结构变为树状结构，中间的节点既是master，也是s1ave。
	  注意使用树状结构时，由于层级深度，导致深度越高的s1ave与最顶层 master间数据同步延迟较大，数据一致性变差，应谨慎选择
```

#### 090-主从复制-运行id(runid)

```java
主从复制工作流程
	阶段三：命令传播阶段
		当 master数据库状态被修改后，导致主从服器数椐库状态不一致，此时需要让主从数据同步到一致的状态，同步的动作称为'命令传播'
		master将接收到的数据变更命令发送给slave,slave接收命令后执行命令

	命令传播阶段的部分复制
		命令传播阶段出现了断网现象
			网络闪断闪连 		忽略
			短时间网络中断 	部分复制
			长时间网络中断		全量复制

	部分复制的三个核心要素
		服务器的'运行id(run id)'
		主服务器的'复制积压缓冲区'
		主从服务器的'复制偏移量'
```

```java
服务器运行ID(run id)
	概念：
		服务器运行ID是每台服务器每次运行的身份识别码，一台服务器多次运行可以生成多个运行id
	组成：
		运行id由40位字符组成，是一个随机的十六进制字符
		例如：fdc9ff13b9bbaab28db42b3d50f852bb5e3fcdce
	作用：
		运行id被用于在服务器间进行传输，识别身份
		如果想两次操作均对同一台服务器进行，必须毎次操作携带对应的运行id，用于对方识别
	实现方式：
		运行id在每台服务器启动时自动生成的，
		master在首次连接s1ave时，会将自己的运行ID发送给s1ave,
		slave保存此ID，通过 info server命令，可以查看节点的run id
```

#### 091-主从复制-复制缓冲区与偏移量

```java
复制缓冲区
	概念：
		复制缓冲区，又名复制积压缓中区，是一个先进先出（FFO）的队列，用于存储服务器执行过的命令，
		每次传播命令，master都会将传播的命令记录下来，并存储在复制缓冲区
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200408161008491.png)

```java
复制缓冲区内部工作原理
	组成：
		偏移量
		字节值
	工作原理：
		通过offset区分不同的slave当前数据传播的差异
		master记录已发送的信息对应的offset
		slave记录已接受的信息对应的offset
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200408161651752.png)

```java
复制缓冲区
	概念：
		复制缓冲区，又名复制积压缓冲区，是一个先进先出（FIFO）的队列，用于存储服务器执行过的命令，
		每次传播命令， master都会将传播的命令记录下来，并存储在复制缓冲区
			复制缓冲区默认数据存储空间大小是1M，由于存储空问大小是固定的，
			当入队元素的数量大于队列长度时，最先入队的元素会被弹出，而新元素会被放入队列
	由来：
		每台服务器启动时，如果开启有AOF或被连接成为 master节点，即创建复制缓冲区
	作用：
		用于保存 master收到的所有指令（仅指那些 会影响数据变更的指令，例set, select）
	数据来源：
		当 master接收到主客户端的指令时，除了将指令执行，会将该指令存储到缓冲区中
```

```java
主从服务器复制偏移量（ offset）
	概念：
		一个数字，描述复制缓中区中的指令字节位置
	分类：
		master复制偏移量：记录发送给所有s1ave的指令字节对应的位置（多个）
		slave 复制偏移量：记录s1ave接收 master发送过来的指令字节对应的位置（个）
	数据来源：
		maste发送一次记录一次
	作用：
		同步信息，比对 master与s1ave的差异，当s1ave断线后，恢复数据使用
```

#### 092-主从复制-工作流程（2）数据同步与命令传播阶段（全）

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200408171944949.png)

#### 093-主从复制-心跳机制与命令传播阶段工作流程

```java
心跳机制：进入命令传播阶段候，master与slave间需要进行信息交换，使用心跳机制进行维护，实现双方连接保持在线
	master心跳：//master的心跳，只是为了判断slave是否还连接着
		指令：ping
		周期：由repl-ping-slave-period决定，默认10秒
		作用：判断slave是否在线
		查询：INFO replication   				获取slave最后一次连接时间间隔，lag项维持在0或1视为正常
	slave心跳任务：//slave的心跳 1为了获取数据 2判断master是否还连接着自己
		指令：REPLCONF ACK{offset}
		周期：1秒
		作用1：汇报save自己的复制偏移量，获取最新的数据变更指令
		作用2：判断 master是否在线
```

```java
心跳阶段注意事项
	当slave多数掉线，或延迟过高时，master为保障数据稳定性，将拒绝所有信息同步操作
		min-slaves-to-write 2
		min-slaves-max-lag 8
			slave数量少于2个，或者所有 slave的延迟都大于等于10秒时，强制关闭master向slave的写功能，停止数据同步
		slave数量由：slave发送REPLCONF ACK命令做确认
		slave延迟由：slave发送 REPLCONF ACK命令做确认
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200408173434905.png)

### 3.1.3 主从复制常见问题

#### 094-主从复制-常见问题（1）

```java
频繁的全量复制（1）
	伴随着系统的运行， master的数据量会越来越大，一旦master重启，runid将发生变化，会导致全部s1ave的全量复制操作

	内部优化调整方案：
		1. master内部创建master_rep1id变量，使用runid相同的策略生成，长度41位，并发送给所有slave
		2.在master关闭时执行命令 shutdown save，进行RDB持久化，将runid与 offset保存到RDB文件中
				repl-id
				repl -offset
			通过 redis-check-rdb命令可以查看该信息
		2. master重启后加载RDB文件，恢复数据
			重启后，将RDB文件中保存的rep1-id与rep1-offset加载到内存中
				master_repl_id     = repl-id
				master_repl_offset = repl-offset
			通过info命令可以查看该信息
		作用:
			本机保存上次runid，重启后恢复该值，使所有slave认为还是之前的master
```

```java
频繁的全量复制（2）
	问题现象
		网络环境不佳，出现网络中断，s1ave不提供服务
	问题原因
		复制缓冲区过小，断网后s1ave的offset越界，触发全量复制
	最终结果
		slave反复进行全量复制（导致无法对外提供服务，看起来好像是slave不干活了，实际上它是在忙着进行全量复制）
	解决方案
		修改复制缓冲区大小
			repl-backlog-size
	建议设置如下
		1.测算从master到s1ave的重连平均时长 second
		2.获 master平均每秒产生写命令数据总量 write_size_per_second
		3.最优复制缓冲区空间 = 2 * second * write_size_per_second
```

#### 095-主从复制-常见问题（2）

```java
频繁的网络中断（1）
	问题现象
		master的CPU占用过高或s1ave频繁断开连接
	问题原因
		s1ave每1秒发送REPLCONF ACK命令到master
		当s1ave接到了慢查询时(keys*， geta1l等)，会大量占用CPU性能
		master每1秒调用复制定时函数 replicationCron()，比对s1ave发现长时间没有进行响应
	最终结果
		master各种资源（输出缓冲区、带宽、连接等）被严重占用
	解决方案
		通过设置合理的超时时间，确认是否释放slave
			rep1-timeout
			该参数定义了超时时间的阈值（默认60秒），超过该值，释放s1ave
```

```java
频繁的网络中断（2）
	问题现象
		s1ave与 master连接断开
	问题原因
		master发送ping指令频度较低
		master设定超时时间较短
		ping指令在网络中存在丢包
	解决方案
		提高ping指令发送的频度
			repl-ping-slave-period
			超时时间rep1-time的时间至少是ping指令频度的5到10倍，否则s1ave很容易判定超时
```

#### 096-主从复制-常见问题（3）

```java
数据不一致
	问题现象
		多个s1ave获取相同数据不同步
	问题原因
		网络信息不同步，数据发送有延迟
	解决方案
		优化主从间的网络环境，通常放置在同一个机房部署，如使用可里云等云服努器时要注意此现象
		监控主从节点延迟(通过 offset)判断，如果 slave延迟过大，暂时屏蔽程序对该slave的数据访问
			slave-serve-stale-data yes|no //这个选项开启以后，专门供调试使用，不对外提供服务
			开启后仅响应 info、 slaveof等少数命令（慎用，除非对数据一致性要求很高）
```

```java
主从复制：总结
	主从复制
		什么是主从复制
		主从复制工作流程
			三个阶段：
				连接阶段、数据同步阶段、命令传播阶段
				复制分全量复制和部分复制
			三个核心：
				部分复制分三个核心：runid、 复制积压缓存区、复制偏移量
			心跳机制
				维护着日常的数据传输
		常见问题
```

## 3.2 哨兵模式

### 3.2.1 哨兵简介

#### 097-哨兵-哨兵简介

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200408184705176.png)

```java
	将宕机的 master下线
	找一个slave作为 master
	通知所有的save连接新的 master
	启动新的 master-与save
	全量复制*N+部分复制*N(配置的不好的话)
```

```java
	谁来确认 master宕机了
	找—个主？怎么找法？
	修改配置后，原始的主恢复了怎么办？
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200408190049413.png)

```java
哨兵简介
	哨兵
		哨兵(sentinel)是—个分布式系统，用于对主从结构中的每台服务器进行'监控'，
		当岀现故障时通过投票机制'选择'新的master并将所有slave连接到新的master。
			监控：监控它们干活
			选择：出问题谁来做master

```

```java
哨兵的作用
	监控
		不断的检查master和slave是否正常运行。
		master存活检测、 master与save运行情兄检测
	通知（提醒）
		当被监控的服务器出现问题时，向其他（哨兵间，客户端）发送通知。
	自动故障转移
		断开master与slave连接，选取一个slave作为master，将其他slave连接到新的 master，并告知客户端新的服务器地址
```

```java
注意：
	哨兵也是一台redis服务器，只是不提供数据服务
	通常哨兵配置数量为单数(1 3 5 7 9 ...)
```

### 3.2.2 启用哨兵模式

#### 098-哨兵-哨兵结构搭建

```java
启用哨兵模式
	配置哨兵
		配置一拖二的主从结构
		配置三个哨兵（配置相同，端囗不同）
			参看 sentinel. conf
		启动哨兵
		redis- sentinel1 sentinel1-端口号.conf
```

```java
复制文件，同时把文件中的26379改成26380
sed 's/26379/26380/g' ../sentinel-26379.conf >  ../sentinel-26380.conf
```

```java
启动顺序：
	先启主机，再启从机，最后启哨兵

	redis-server  /usr/local/redis-5.0.6/conf/redis-6379.conf
	redis-server  /usr/local/redis-5.0.6/conf/redis-6380.conf
	redis-server  /usr/local/redis-5.0.6/conf/redis-6381.conf

	redis-sentinel /usr/local/redis-5.0.6/conf/sentinel-26379.conf//启动哨兵1
	redis-cli  -p 26379//启动哨兵1的client


```

```java
##########################哨兵的配置文件 sentinel-26379.conf##########################
# 哨兵本身也是一个服务，它对外也有一个服务端口，通常是2+6379
port 26380

# 把哨兵设置为守护进程方式启动，在此不使用它，我们需要看日志文件
daemonize no

pidfile /var/run/redis-sentinel.pid
logfile ""

# 哨兵的信息存储在哪里
dir  /usr/local/redis-5.0.6/conf/logData

# mymaster(自定义的名称) ：检测的master，本处为 127.0.0.1 6379
# 2 ：2个哨兵认定master挂了，那么master就挂了；通常设定为哨兵数量的一半加一
sentinel monitor mymaster 127.0.0.1 6379 2

# 主机master多长时间没响应，认定它挂了，此处是30s(30秒认定主机下线)
sentinel down-after-milliseconds mymaster 30000

# 新的master上任以后，在进行数据同步以后，一次有多少个开始同步(越小，对服务器性能压力越小)
# 压力越小速度越慢，压力越大 速度越快
# 说白了就是，有几条线开始用时进行数据同步
sentinel parallel-syncs mymaster 1

# 多长时间内同步完成算有效，即超过这个时间同步没完成算超时(3分钟认定同步超时)
sentinel failover-timeout mymaster 180000

sentinel deny-scripts-reconfig yes

```

1.  一个master，两个slave
    三个哨兵
2.  使用Ctrl+C停掉master
    然后图片中的哨兵，选举6381为master
    ![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409155713549.png)

### 3.2.3 哨兵工作原理

#### 099-哨兵-工作原理（1）

```java
哨兵工作原理：主从切换
	哨兵在进行主从切换过程中经历三个阶段
		1.监控
		2.通知
		3.故障转移
```

```java
阶段一：监控阶段
	用于同步各个节点的状态信息
		获取各个 sentinel的状态（是否在线）
		获取 master的状态
			master属性
				runid
				role:master
			各个save的详细信息
		获取所有slave的状态（根据 master中的 Slave信息）
			slave属性
				runid
				role:slave
				master_host, master_port
				offset
				...
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409162530601.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409163354867.png)

```java
sentine
	会向master、slave、其他sentinel要信息，
	通过info要信息，
	并与master和slave建立CMD通道(每一个sentinel都会和任意一个master和slave建立CMD通道)，便于以后的信息流动
sentinel之间直接会建立一个publish和subscribe通道，进行信息同步
```

#### 100-哨兵-工作原理（2）

```java
哨兵工作原理
	阶段二：通知阶段(信息的长期维护阶段)(维护一个长期的信息对等)
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409164151768.png)

#### 101-哨兵-工作原理（3）

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409165201628.png)

```java
上图
	一个sentinel向master和slave发送hello指令，收到正常回复，确认它们都正常工作
	然后就会在sentinel的局域网内部，告诉大家它们都正常工作
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409165328175.png)

```java
上图：
	当一个sentinel发现master挂了时，就不停的向master发送hello，但是master没反应
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409195806449.png)

```java
上图
	这个时候，这个sentinel就认为 这个master挂掉了，
		会把flags置为SRI_S_DOWN 即主观下线
		同时向局域网内的其他sentinel说，这个master下线了
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409200228808.png)

```java
上图
	这个时候，其他的sentinel就会去确认，这个master是否真的下线了
		(各自向master发送hello，并等待回复)
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409200244558.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409200257425.png)

```java
上图
	这时候sentinel们，根据返回来的信息，进行投票，最终投票决定master是否下线
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409200308194.png)

```java
上图
	投票的数目 > sentinel的一半时，就都认为master下线了
		会把flags置为SRI_O_DOWN 即客观下线
		一旦进入到客观下线阶段，开始进入下一环节：清理队伍
```

```java
主观下线：一台sentinel认为master挂了
客观下线：超过半数以上的sentinel认为master挂了
```

```java
下图
	sentinel中选一个头目，去执行清理队伍的任务
	它们会去竞选谁去当这个头目：通过投票机制
		谁先到达，它就会把票投给谁
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409201654924.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409201446335.png)

```java
参与竞选的sentinel会发送的信息包括：
	挂的ip和port
	自己参与竞选的次数
	自己的runid
如果没有决出胜负：再来一轮，同时竞选次数加一
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409204001319.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409204016657.png)

```java
sentinel选出了头目以后，
	这个头目就根据自己的四大原则，
	从备选服务器中，筛选出一个master
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409221142699.png)
上图：原则1 - 在线的
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409205128889.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409205505205.png)
上图：原则2 - 响应慢的
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020040922315578.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409223629880.png)
上图：原则3 - 与原master断开时间久的//即 与原master离得最近的
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409223929565.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409224037629.png)

```java
阶段三：故障转移阶段
	服务器列表中挑选备选master
		1.在线的
		2.响应慢的
		3.与原master断开时间久的//即 与原master离得最近的
		4.优先原则
			优先级
			offset
			runid
	发送指令（sentinel）
		向新的master发送slaveof no one		//让新的master与上一个master打开从属关系
		向其他slave发送slaveof新masterIP端口	//让其他的slave都连接、隶属于这个新的master的IP和Port
```

```java
总结

哨兵工作原理
	阶段三：故障转移阶段
		·监控
			同步信息//识别对方
		·通知
			保持联通//保持信息对称
		·故障转移
			发现问题
			竞选负责人
			优选新master
			新master上任，其他slave切换master，原master作为slave故障回复后连接
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409230804728.png)

```java
下图
	现在重新启动原来的master
	在哨兵sentinel的界面，可以看到，它转换为slave，slaveof于这个新的master
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200409231029327.png)

## 3.3 集群

### 3.3.1 集群简介

#### 102-集群-集群简介

```java
现状问题
	业务发展过程中遇到的峰值瓶颈
		redis提供的服务OPS可以达到10万/秒，当前业务OPS已经达到20万/秒
		内存单机容量达到256G，当前业务需求内存容量1T
	使用集群的方式可以快速解决上述问题
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410092257248.png)
一主一从

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410092314646.png)
多主多从

```java
集群架构
	集群就是使用网络将若干台计算机连通起来，并提供统一的管理方式，使其对外呈现单机的服务效果
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410092612193.png)

```java
集群作用
	分散单台服务器的访问压力，实现负载均衡
	分散单台服务器的存储压力，实现可扩展性
	降低单台服务器宕机带来的业务灾难
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410092941837.png)

### 3.3.2 Redis集群结构设计

#### 103-集群-集群存储结构设计

##### 1.数据存储设计

```java
集群存储结构设计
	1.数据存储设计
	2.集群内部通讯设计
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410101936101.png)

```java
上图
	数据通过算法计算，计算出保存的位置

	每一份存储空间，称为一个槽
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410102216704.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410102227256.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410102553383.png)

```java
上图
	增强可扩展性
		增加了新的存储空间(存储节点)时
		就会从原来的每个存储空间里面分出来一部分，存到新增加的这个存储空间

		所谓的增节点和去节点，就是改变这些槽的存储位置

		一个机器持有一定的槽，
			当加机器的时候，把它的槽分一部分给新的机器
			去机器的话，把它的槽，给其他的机器(存储节点)
```

##### 2.集群内部通讯设计

```java
三个存储机器
	它们之间互联
		谁存储着什么东西，大家心里都一清二楚
		也就是说，它们心里都有一个账本，记录着各个计算机里面存储的槽(存储空间)
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410105521335.png)

```java
总结
	槽用来区分数据内部的存储空间
	key通过算法运算以后，确定它存储的位置
		查找数据时，要么一次命中 要么两次命中，提高访问性能
```

### 3.3.3 cluster集群结构搭建

#### 104-集群-cluster集群搭建

```bash
cluster集群结构搭建
	cluster的conf配置
		·设置加入cluster，成为其中的节点
			cluster-enabled yeslno
		·cluster配置文件名，该文件属于自动生成，仅用于快速查找文件并查询文件内容
			cluster-config-file <filename>
		·节点服务响应超时时间，用于判定该节点是否下线或切换为从节点
			cluster-node-timeout <milliseconds>
		·master连接的slave最小数量
			cluster-migration-barrier <count>
```

```bash
##########################哨兵的配置文件 sentinel-26379.conf##########################
# 哨兵本身也是一个服务，它对外也有一个服务端口，通常是2+6379
port 26380

# 把哨兵设置为守护进程方式启动，在此不使用它，我们需要看日志文件
daemonize no

pidfile /var/run/redis-sentinel.pid
logfile ""

# 哨兵的信息存储在哪里
dir  /usr/local/redis-5.0.6/conf/logData

# mymaster(自定义的名称) ：检测的master，本处为 127.0.0.1 6379
# 2 ：2个哨兵认定master挂了，那么master就挂了；通常设定为哨兵数量的一半加一
sentinel monitor mymaster 127.0.0.1 6379 2

# 主机master多长时间没响应，认定它挂了，此处是30s(30秒认定主机下线)
sentinel down-after-milliseconds mymaster 30000

# 新的master上任以后，在进行数据同步以后，一次有多少个开始同步(越小，对服务器性能压力越小)
# 压力越小速度越慢，压力越大 速度越快
# 说白了就是，有几条线开始用时进行数据同步
sentinel parallel-syncs mymaster 1

# 多长时间内同步完成算有效，即超过这个时间同步没完成算超时(3分钟认定同步超时)
sentinel failover-timeout mymaster 180000

sentinel deny-scripts-reconfig yes

################# 开启cluster集群
# 开启cluster，这样才能成为集群中的节点
cluster-enabled yes
# 配置文件的名字
cluster-config-file nodes-6379.conf
# 这个节点下线的时间，（此处演示，设为10s）
cluster-node-timeout 10000
```

```bash
sed "s/6379/6380/g" redis-cluster-6379.conf > redis-cluster-6380.conf
...
sed "s/6379/6384/g" redis-cluster-6379.conf > redis-cluster-6384.conf
```

```java
开一个三主三从的集群结构
	master1 -- redis-server /usr/local/redis-5.0.6/conf/redis-cluster-6379.conf
	master2 -- redis-server /usr/local/redis-5.0.6/conf/redis-cluster-6380.conf
	master3 -- redis-server /usr/local/redis-5.0.6/conf/redis-cluster-6381.conf
	slave4  -- redis-server /usr/local/redis-5.0.6/conf/redis-cluster-6382.conf
	slave5  -- redis-server /usr/local/redis-5.0.6/conf/redis-cluster-6383.conf
	slave6  -- redis-server /usr/local/redis-5.0.6/conf/redis-cluster-6384.conf

	主命令操作客户端--大量命令都在这个client中进行操作
	master1-client
	slave1-client
	机动客户端--需要看其他master和slave客户端时，就用这个机动客户端去看
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410113954230.png)

```java
上图
	查看各个服务器是否都启动了
	下面，我们来把这些节点连接在一起
		需要用到redis/src目录下的一个redis命令：redis-trib.rb
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410114341175.png)

```java
			使用redis-trib.rb，需要安装：ruby、gem
				yum install ruby
				yum install gem

					[root@lwh src]# ruby -v
					ruby 2.0.0p648 (2015-12-16) [x86_64-linux]

					[root@lwh src]# gem -v
					2.0.14.1
					[root@lwh src]#
```

```java
使用redis-trib.rb创建集群
	cd /usr/local/redis-5.0.6/src/
	./redis-trib.rb  create --replicas 1 127.0.0.1:6379 127.0.0.1:6380 127.0.0.1:6381 127.0.0.1:6382 127.0.0.1:6383 127.0.0.1:6384

# create:创建集群
# --replicas 1 : 指定内部结构，1代表一个master连接一个slave ，2 代表一个master连接两个slave ...
# 127.0.0.1:6379 127.0.0.1:6380 127.0.0.1:6381 127.0.0.1:6382 127.0.0.1:6383 127.0.0.1:6384: 前面三个是master，后面三个是slave，它们会依次连接
```

```java
# 执行：
	./redis-trib.rb  create --replicas 1  127.0.0.1:6380 127.0.0.1:6381 127.0.0.1:6382 127.0.0.1:6383
# 发现并没有执行成功，这是因为：
	# 5.0之后 trib.rb 全部移植到了 redis-cli --cluster， 下面 ruby 和 gem 也不用下载
# 根据提示：指令变为
	redis-cli --cluster create 127.0.0.1:6379 127.0.0.1:6380 127.0.0.1:6381 127.0.0.1:6382 127.0.0.1:6383 127.0.0.1:6384 --cluster-replicas 1
# 运行这行指令，发现master6379出错，利用fix指令进行修复
#[ERR] Not all 16384 slots are covered by nodes.
	redis-cli --cluster fix  127.0.0.1:6379
# 利用check指令，检查是否已经完全修复，可以看出，16384个槽都已经正常
redis-cli --cluster check 127.0.0.1:6379
	...
	[OK] All nodes agree about slots configuration.
	>>> Check for open slots...
	>>> Check slots coverage...
	[OK] All 16384 slots covered.
```

正常的启动界面如下
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410125944444.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410125956673.png)

#### 105-集群-设置与获取数据

```java
集群中：
	数据的设置和获取
```

![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/2020041013090832.png)
上图的操作方式，太麻烦了；使用下图的方式操作即可解决
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410131104117.png)
![](https://cdn.jsdelivr.net/gh/9acme/assets@note/redis/20200410131441292.png)

#### 106-集群-主从下线与主从切换

```java
正常的操作，不是cluster最大的优势，它最大的优势是 出问题之后怎么办
```

```java
	cluster节点(手动)操作命令
		·查看集群节点信息
			cluster nodes
		·进入一个从节点redis，切换其主节点
			cluster replicate <master-id>
		·发现一个新节点，新增主节点
			cluster meet ip:port
		·忽略一个没有solt的节点
			cluster forget <id>
		·手动故障转移
			cluster failover
```