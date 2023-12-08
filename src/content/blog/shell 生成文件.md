---
title: "shell 生成文件"
pubDate: 2023-12-08
draft: false
description: "shell"
tags: ["shell"]
---

```shell
CURRENT_DIR=$(cd $(dirname $0)/../../; pwd)
cd $CURRENT_DIR/build/web-mobile

mkdir -p -m 777 package

cd package
cur_timestamp=$((`date '+%s'`*1000+`date '+%N'`/1000000))
echo '{
    "stamp": "'$cur_timestamp'"
}'>version.json

# cd $CURRENT_DIR/build/web-mobile
# zip -q -r web.zip *
# mv web.zip package
```
