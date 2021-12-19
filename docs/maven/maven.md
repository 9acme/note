# Maven笔记

## Maven简介

Maven的本质是一个项目管理工具，将项目开发和管理过程抽象成一个项目对象模型(POM)
POM (Project Object Model)：项目对象模型
<img src="https://cdn.jsdelivr.net/gh/9acme/assets@note/maven/下午6.51.07.png" alt="下午6.51.07" style="zoom:50%;" />

Maven的作用：

1. 项目构建：提供标准的、跨平台的自动化项目构建方式
2. 依赖管理：方便快捷的管理项目依赖的资源（jar包），避免资源间的版本冲突问题
3. 统一开发结构：提供标准的、统一的项目结构



## Maven基础概念

仓库：用于存储资源，包含各种jar包
仓库分类：本地仓库和远程仓库（私服和中央仓库）

坐标：Maven中的坐标用于描述仓库中资源的位置
坐标的主要组成：
		groupId：定义当前Maven项目隶属组织名称（通常是域名反写）
		artifactId：定义当前Maven项目名称（通常是模块名称）
		version：定义当前版本号
		packaging：定义该项目的打包方式
坐标的作用：使用唯一的标识，唯一性定位资源位置，通过该标识可以将资源的识别与下载交由机器完成。

仓库配置：
本地仓库配置：默认位置与自定义位置
远程仓库配置：

```xml
<repositories>
  <repository>
		<id>central</id>
		<name>Central Repository</name>
    <url>https://repo.maven.apache.org/maven2</url> <layout>default</layout>
		<snapshots>
			<enabled>false</enabled>
    </snapshots>
	</repository>
</repositories>
```

镜像仓库配置：

```xml
<mirrors>
    <mirror>
    <!-- 此镜像的唯一标识符，用来区分不同的mirror元素 -->
	<id>nexus-aliyun</id>
    <!-- 对那种仓库进行镜像（就是替代哪种仓库）-->
	<mirrorOf>central</mirrorOf>
    <!-- 镜像名称 -->
	<name>Nexus aliyun</name>
    <!-- 镜像URL -->
	<url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
</mirrors>
```



## Maven项目

### 手动生成Maven项目

Maven工程目录结构
<img src="https://cdn.jsdelivr.net/gh/9acme/assets@note/maven/下午6.50.36.png" alt="下午6.50.36" style="zoom:50%;" />

Maven项目构建命令
Maven构建命令使用mvn开头，后面加功能参数，可以一次执行多个命令，使用空格分隔

```shell
mvn compile #编译
mvn clean #清理
mvn test #测试
mvn package	#打包
mvn install #安装到本地仓库
```

### IDEA生成Maven项目

使用原型创建Maven项目与不使用原型创建Maven项目
例：使用原型创建web项目，选择archetype-webapp进行项目创建，添加Tomcat插件

```xml
<build>
  <plugins>
	<plugin>
      		<groupId>org.apache.tomcat.maven</groupId>
      		<artifactId>tomcat7-maven-plugin</artifactId>
      		<version>2.1</version>
		<configuration>
			<port>80</port>
			<path>/</path>
      		</configuration>
	</plugin>
  </plugins>
</build>
```



## 依赖管理

1. 依赖配置

   依赖指的是当前项目运行所需要的jar，一个项目可以设置多个依赖
   格式：

   ```xml
   <!--设置当前项目所依赖的所有jar-->
   <dependencies>
     <!--设置具体的依赖-->
     <dependency>
       <!--依赖所属群组id-->
       <groupId></groupId>
       <!--依赖所属项目id-->
       <artifactId></artifactId>
       <!--依赖版本号-->
       <version></version>
     </dependency>
   </dependencies>
   ```



2. 依赖传递

   依赖具有传递性，包括直接传递和间接传递。
   直接传递：在当前项目中通过依赖配置建立的依赖关系（A使用B，A和B就是直接传递）
   间接传递：被依赖的资源如果依赖其他资源，当前项目间接依赖其他资源（比较拗口，意思是如果A依赖B，而B依赖C，那么A和C之间就是间接传递）

   依赖传递的冲突问题：路径优先：当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
   声明优先：当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
   特殊优先：当同级配置了相同资源的不同版本，后配置的覆盖先配置的

   <img src="https://cdn.jsdelivr.net/gh/9acme/assets@note/maven/下午6.49.40.png" alt="下午6.49.40" style="zoom:33%;" />

3. 可选依赖

   可选依赖指的是对外隐藏当前所依赖的资源

   ```xml
   <dependency>
     <groupId></groupId>
     <artifactId></artifactId>
     <version></version>
     <!--添加下面这一行-->
     <optional>true</optional>
   </dependency>
   ```

4. 排除依赖

   排除依赖指主动断开依赖的资源，被排除的资源无需指定版本

   ```xml
   <dependency>
     <groupId></groupId>
     <artifactId></artifactId>
     <version></version>
     <exclusions>
       <exclusion>
         <groupId></groupId>
         <artifactId></artifactId>
       </exclusion>
     </exclusions>
   </dependency>
   ```



5. 依赖范围

   依赖的jar包默认情况可以在任何地方使用，可以通过scope标签设定其作用范围
   作用范围：
   	主程序范围有效（main文件夹范围内）
   	测试程序范围有效（test文件夹范围内）
   	是否参与打包（package文件夹范围内）

   <img src="https://cdn.jsdelivr.net/gh/9acme/assets@note/maven/下午7.10.15.png" alt="下午7.10.15" style="zoom:50%;" />

## 生命周期与插件

Maven项目构建生命周期描述的是一次构建过程经历了多少个事件
Maven对项目构建的生命周期划分为3套
		clean：清理工作
		default：核心工作，例如编译、测试、打包、部署等
			compile -- test-compile -- test -- packege -- Install
		site：产生报告，发布站点等

插件：
插件与生命周期内的阶段绑定，在执行到对应的生命周期时执行对应的插件功能

```xml
<build>
  <plugins>
	<plugin>
      		<groupId>org.apache.maven.plugins</groupId>
      		<artifactId>maven-source-plugin</artifactId>
      		<version>2.2.1</version>
		<executions>
			<execution>
          			<goals>
					<goal>jar</goal>
          			</goals>
				<phase> generate-test-resources</phase> </execution>
			</executions>
    	</plugin>
  </plugins>
</build>
```



## 分模块开发与设计

参考视频进行实验即可

## 聚合

作用：聚合用于快速构建Maven工程，一次性构建多个项目/模块。
制作方式：创建一个空模块，打包类型定义为pom

```xml
<packaging>pom</packaging>
```

定义当前模块进行构建操作时关联的其他模块名称

```xml
<modules>
  <module>模块地址</module>
  <module>模块地址</module>
  <module>模块地址</module>
  <module>模块地址</module>
</modules>
```

注意：参与聚合操作的模块最终执行顺序与模块间的依赖关系有关，与配置顺序无关

## 继承

作用：通过继承可以实现在子工程中沿用父工程中的配置（与Java类似）
制作方式：在子工程中生命其父工程坐标与对应的位置

```xml
<!--定义该工程的父工程-->
<parent>
  <groupId></groupId>
  <artifactId></artifactId>
  <version></version>
  <!--填写父工程的pom文件-->
  <relativePath>父工程pom文件地址</relativePath>
</parent>
```

在父工程中定义依赖管理

```xml
<!--声明此处进行依赖管理-->
<dependencyManagement>
  <!--具体的依赖-->
  <dependencies>
    <dependency>
      <groupId></groupId>
      <artifactId></artifactId>
      <version></version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

继承依赖使用：在子工程中定义依赖关系，无需声明依赖版本，版本参照父工程中依赖的版本

```xml
<dependencies>
  <dependency>
    <groupId></groupId>
    <artifactId></artifactId>
  </dependency>
</dependencies>
```

### 继承与聚合

作用：聚合用于快速构建项目，继承用于快速配置
相同点：
		聚合与继承的pom.xml文件打包方式均为pom，可以将两种关系制作到同一个pom文件中
		聚合与继承均属于设计型模块，并无实际的模块内容
不同点：聚合是在当前模块中配置关系，聚合可以感知到参与聚合的模块有哪些
				继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己

## 属性

1. 自定义属性

   作用：等同于定义变量，方便统一维护
   定义格式：

   ```xml
   <!--定义自定义属性-->
   <properties>
     <spring.version>5.1.9.RELEASE</spring.version>
   	<junit.version>4.12</junit.version>
   </properties>
   ```

   调用格式：

   ```xml
   <dependency>
     <groupId>org.springframework</groupId>
     <artifactId>spring-context</artifactId>
     <version>${spring.version}</version>
   </dependency>
   ```

2. 内置属性

   作用：使用Maven内置属性，快速配置
   调用格式：

   ```xml
   ${basedir}
   ${version}
   ```

3. Setting属性

   作用：使用Maven配置文件setting.xml中的标签属性，用于动态配置
   调用格式：

   ```xml
   ${settings.localRepository}
   ```

4. Java系统属性

   作用：读取Java系统属性
   调用格式：

   ```xml
   ${user.home}
   ```

   系统属性查询方式：

   ```xml
   mvn help:system
   ```

5. 环境变量属性

   作用：使用Maven配置文件setting.xml中的标签属性，用于动态配置
   调用格式：

   ```xml
   ${env.JAVA_HOME}
   ```

   环境变量属性查询方式：

   ```xml
   mvn help:system
   ```



## 版本管理

SNAPSHOT（快照版本）		RELEASE（发布版本）
工程版本号约定

<img src="https://cdn.jsdelivr.net/gh/9acme/assets@note/maven/下午8.24.46.png" alt="下午8.24.46" style="zoom:50%;" />

## 资源配置

配置文件引用pom属性
作用：在任意配置文件中加载pom文件中定义的属性
调用格式

```xml
${地址}
```

开启配置文件加载pom属性

```xml
<!--配置资源文件对应的信息-->
<resources>
  <resource>
    <!--设定配置文件对应的位置目录，支持使用属性动态设定路径-->
    <directory>地址</directory>
    <!--开启对配置文件的资源加载过滤-->
    <filtering>true</filtering>
  </resource>
</resources>
```

## 多环境开发配置

```xml
<!--创建多环境-->
<profiles>
  <!--定义具体的环境：生产环境-->
  <profile>
    <!--定义环境对应的唯一名称-->
    <id>开发环境名称1</id>
    <!--定义环境中的专用的属性值-->
    <properties>
      <jdbc.url>jdbc链接</jdbc.url>
    </properties>
    <activation>
      <activeByDefault>true</activeByDefault>
    </activation>
  </profile>
  <!--定义具体的环境：开发环境-->
  <!--格式同上-->
</profiles>
```

## 私服

使用Nexus，按照视频进行操作即可
