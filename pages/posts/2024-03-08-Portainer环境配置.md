---
title: 服务端管理Docker软件-Portainer
lang: zh
excerpt: 简单安装示例
---
## 一、基础安装

### 1. 拉取最新的 Portainer
```
[root@CodeGuide portainer]# docker pull portainer/portainer
Using default tag: latest
latest: Pulling from portainer/portainer
94cfa856b2b1: Pull complete 
49d59ee0881a: Pull complete 
a2300fd28637: Pull complete 
Digest: sha256:fb45b43738646048a0a0cc74fcee2865b69efde857e710126084ee5de9be0f3f
Status: Downloaded newer image for portainer/portainer:latest
docker.io/portainer/portainer:latest
```
docker pull portainer/portainer
拉取 portainer

### 2. 安装和启动
```
[root@CodeGuide]# docker run -d --restart=always --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer

```


二、链接服务
地址：http://localhost:9000/#!/wizard/endpoints/create?envType=dockerStandalone

```
docker run -d -p 9001:9001 --name portainer_agent --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes portainer/agent:2.16.2
```