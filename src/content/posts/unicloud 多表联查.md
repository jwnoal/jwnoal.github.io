---
title: "unicloud 多表联查"
published: 2024-05-25
draft: false
description: "unicloud 多表联查"
tags: ["uniapp"]
---

需求：获取打卡列表数据，并且从打卡详情表中获取状态和打卡次数

如果先获得打卡列表数据，再根据打卡列表数据遍历获取打卡详情数据，效率较低，不推荐。

使用表关联，将两张表合成一张表

```json
// clockInList.schema.json
{
	"bsonType": "object",
	"required": [],
	"permission": {
		"read": true,
		"create": false,
		"update": false,
		"delete": false
	},
	"properties": {
		"_id": {
			"description": "ID，系统自动生成"
		},
		"title": {
			"bsonType": "string"
		},
		"openId": {
			"bsonType": "string"
		}
	}
}

// clockInDetail.schema.json
{
	"bsonType": "object",
	"required": [],
	"permission": {
		"read": true,
		"create": false,
		"update": false,
		"delete": false
	},
	"properties": {
		"_id": {
			"description": "ID，系统自动生成"
		},
		"parentId": {
			"bsonType": "string",
			"foreignKey": "clockInList._id"
		},
		"clockStatus": {
			"bsonType": "int"
		},
		"fullDate": {
			"bsonType": "string"
		},
		"openId": {
			"bsonType": "string"
		}
	}
}
```

云函数

```js
"use strict";
exports.main = async (event, context) => {
  //event为客户端上传的参数
  // console.log('event : ', event)
  if (!event.openId) {
    return {
      code: -1,
    };
  }

  const fullDate = event.fullDate.split("-");
  const db = uniCloud.databaseForJQL();

  const mylist = db
    .collection("clockInList")
    .field("_id,openId,title")
    .getTemp();
  const mydetail = db
    .collection("clockInDetail")
    .field("parentId,openId,clockStatus,fullDate")
    .getTemp();

  const res = await db
    .collection(mylist, mydetail)
    .where({
      openId: event.openId,
    })
    .get();

  if (!res) {
    return {
      code: -1,
    };
  }

  let arr = [];
  for (let item of res.data) {
    const total = item._id.clockInDetail.filter(
      (item) => item.clockStatus == 2
    );
    const month = item._id.clockInDetail.filter((item) => {
      return item.fullDate.includes(fullDate[0] + "-" + fullDate[1]);
    });
    const today = item._id.clockInDetail.filter(
      (item) => item.fullDate == event.fullDate
    );
    let status = 0;
    if (today.length > 0) {
      status = today[0].clockStatus;
    }
    arr.push({
      _id: item._id._value,
      title: item.title,
      clockStatus: status,
      month: month.length,
      total: total.length,
    });
  }
  return {
    code: 0,
    data: arr,
  };
};
```
