export default [
    {
        url: '/api/fake_analysis_chart_data',
        method: 'get',
        response: ({ query }: { query: { token: string } }) => {
            console.log(query);
            return {
                success: true,
                data: {
                    "visitData": [
                        {
                            "x": "2025-09-18",
                            "y": 7
                        },
                        {
                            "x": "2025-09-19",
                            "y": 5
                        },
                        {
                            "x": "2025-09-20",
                            "y": 4
                        },
                        {
                            "x": "2025-09-21",
                            "y": 2
                        },
                        {
                            "x": "2025-09-22",
                            "y": 4
                        },
                        {
                            "x": "2025-09-23",
                            "y": 7
                        },
                        {
                            "x": "2025-09-24",
                            "y": 5
                        },
                        {
                            "x": "2025-09-25",
                            "y": 6
                        },
                        {
                            "x": "2025-09-26",
                            "y": 5
                        },
                        {
                            "x": "2025-09-27",
                            "y": 9
                        },
                        {
                            "x": "2025-09-28",
                            "y": 6
                        },
                        {
                            "x": "2025-09-29",
                            "y": 3
                        },
                        {
                            "x": "2025-09-30",
                            "y": 1
                        },
                        {
                            "x": "2025-10-01",
                            "y": 5
                        },
                        {
                            "x": "2025-10-02",
                            "y": 3
                        },
                        {
                            "x": "2025-10-03",
                            "y": 6
                        },
                        {
                            "x": "2025-10-04",
                            "y": 5
                        }
                    ],
                    "visitData2": [
                        {
                            "x": "2025-09-18",
                            "y": 1
                        },
                        {
                            "x": "2025-09-19",
                            "y": 6
                        },
                        {
                            "x": "2025-09-20",
                            "y": 4
                        },
                        {
                            "x": "2025-09-21",
                            "y": 8
                        },
                        {
                            "x": "2025-09-22",
                            "y": 3
                        },
                        {
                            "x": "2025-09-23",
                            "y": 7
                        },
                        {
                            "x": "2025-09-24",
                            "y": 2
                        }
                    ],
                    "salesData": [
                        {
                            "x": "1月",
                            "y": 661
                        },
                        {
                            "x": "2月",
                            "y": 630
                        },
                        {
                            "x": "3月",
                            "y": 556
                        },
                        {
                            "x": "4月",
                            "y": 925
                        },
                        {
                            "x": "5月",
                            "y": 567
                        },
                        {
                            "x": "6月",
                            "y": 549
                        },
                        {
                            "x": "7月",
                            "y": 1011
                        },
                        {
                            "x": "8月",
                            "y": 937
                        },
                        {
                            "x": "9月",
                            "y": 634
                        },
                        {
                            "x": "10月",
                            "y": 379
                        },
                        {
                            "x": "11月",
                            "y": 372
                        },
                        {
                            "x": "12月",
                            "y": 375
                        }
                    ],
                    "searchData": [
                        {
                            "index": 1,
                            "keyword": "搜索关键词-0",
                            "count": 30,
                            "range": 74,
                            "status": 0
                        },
                        {
                            "index": 2,
                            "keyword": "搜索关键词-1",
                            "count": 376,
                            "range": 84,
                            "status": 1
                        },
                        {
                            "index": 3,
                            "keyword": "搜索关键词-2",
                            "count": 694,
                            "range": 82,
                            "status": 0
                        },
                        {
                            "index": 4,
                            "keyword": "搜索关键词-3",
                            "count": 555,
                            "range": 4,
                            "status": 0
                        },
                        {
                            "index": 5,
                            "keyword": "搜索关键词-4",
                            "count": 942,
                            "range": 82,
                            "status": 0
                        },
                        {
                            "index": 6,
                            "keyword": "搜索关键词-5",
                            "count": 892,
                            "range": 97,
                            "status": 1
                        },
                        {
                            "index": 7,
                            "keyword": "搜索关键词-6",
                            "count": 189,
                            "range": 63,
                            "status": 0
                        },
                        {
                            "index": 8,
                            "keyword": "搜索关键词-7",
                            "count": 664,
                            "range": 80,
                            "status": 1
                        },
                        {
                            "index": 9,
                            "keyword": "搜索关键词-8",
                            "count": 920,
                            "range": 92,
                            "status": 0
                        },
                        {
                            "index": 10,
                            "keyword": "搜索关键词-9",
                            "count": 575,
                            "range": 16,
                            "status": 0
                        },
                        {
                            "index": 11,
                            "keyword": "搜索关键词-10",
                            "count": 492,
                            "range": 61,
                            "status": 0
                        },
                        {
                            "index": 12,
                            "keyword": "搜索关键词-11",
                            "count": 53,
                            "range": 55,
                            "status": 0
                        },
                        {
                            "index": 13,
                            "keyword": "搜索关键词-12",
                            "count": 620,
                            "range": 59,
                            "status": 0
                        },
                        {
                            "index": 14,
                            "keyword": "搜索关键词-13",
                            "count": 454,
                            "range": 95,
                            "status": 1
                        },
                        {
                            "index": 15,
                            "keyword": "搜索关键词-14",
                            "count": 395,
                            "range": 62,
                            "status": 1
                        },
                        {
                            "index": 16,
                            "keyword": "搜索关键词-15",
                            "count": 223,
                            "range": 60,
                            "status": 1
                        },
                        {
                            "index": 17,
                            "keyword": "搜索关键词-16",
                            "count": 970,
                            "range": 87,
                            "status": 1
                        },
                        {
                            "index": 18,
                            "keyword": "搜索关键词-17",
                            "count": 621,
                            "range": 0,
                            "status": 0
                        },
                        {
                            "index": 19,
                            "keyword": "搜索关键词-18",
                            "count": 538,
                            "range": 51,
                            "status": 1
                        },
                        {
                            "index": 20,
                            "keyword": "搜索关键词-19",
                            "count": 636,
                            "range": 68,
                            "status": 0
                        },
                        {
                            "index": 21,
                            "keyword": "搜索关键词-20",
                            "count": 511,
                            "range": 78,
                            "status": 0
                        },
                        {
                            "index": 22,
                            "keyword": "搜索关键词-21",
                            "count": 106,
                            "range": 81,
                            "status": 1
                        },
                        {
                            "index": 23,
                            "keyword": "搜索关键词-22",
                            "count": 969,
                            "range": 23,
                            "status": 1
                        },
                        {
                            "index": 24,
                            "keyword": "搜索关键词-23",
                            "count": 63,
                            "range": 15,
                            "status": 1
                        },
                        {
                            "index": 25,
                            "keyword": "搜索关键词-24",
                            "count": 698,
                            "range": 24,
                            "status": 0
                        },
                        {
                            "index": 26,
                            "keyword": "搜索关键词-25",
                            "count": 792,
                            "range": 68,
                            "status": 1
                        },
                        {
                            "index": 27,
                            "keyword": "搜索关键词-26",
                            "count": 351,
                            "range": 5,
                            "status": 1
                        },
                        {
                            "index": 28,
                            "keyword": "搜索关键词-27",
                            "count": 880,
                            "range": 38,
                            "status": 0
                        },
                        {
                            "index": 29,
                            "keyword": "搜索关键词-28",
                            "count": 890,
                            "range": 36,
                            "status": 0
                        },
                        {
                            "index": 30,
                            "keyword": "搜索关键词-29",
                            "count": 738,
                            "range": 60,
                            "status": 1
                        },
                        {
                            "index": 31,
                            "keyword": "搜索关键词-30",
                            "count": 478,
                            "range": 36,
                            "status": 1
                        },
                        {
                            "index": 32,
                            "keyword": "搜索关键词-31",
                            "count": 10,
                            "range": 50,
                            "status": 0
                        },
                        {
                            "index": 33,
                            "keyword": "搜索关键词-32",
                            "count": 278,
                            "range": 14,
                            "status": 1
                        },
                        {
                            "index": 34,
                            "keyword": "搜索关键词-33",
                            "count": 49,
                            "range": 64,
                            "status": 0
                        },
                        {
                            "index": 35,
                            "keyword": "搜索关键词-34",
                            "count": 695,
                            "range": 62,
                            "status": 1
                        },
                        {
                            "index": 36,
                            "keyword": "搜索关键词-35",
                            "count": 837,
                            "range": 44,
                            "status": 0
                        },
                        {
                            "index": 37,
                            "keyword": "搜索关键词-36",
                            "count": 399,
                            "range": 79,
                            "status": 1
                        },
                        {
                            "index": 38,
                            "keyword": "搜索关键词-37",
                            "count": 777,
                            "range": 99,
                            "status": 1
                        },
                        {
                            "index": 39,
                            "keyword": "搜索关键词-38",
                            "count": 998,
                            "range": 71,
                            "status": 1
                        },
                        {
                            "index": 40,
                            "keyword": "搜索关键词-39",
                            "count": 443,
                            "range": 70,
                            "status": 0
                        },
                        {
                            "index": 41,
                            "keyword": "搜索关键词-40",
                            "count": 685,
                            "range": 59,
                            "status": 1
                        },
                        {
                            "index": 42,
                            "keyword": "搜索关键词-41",
                            "count": 320,
                            "range": 96,
                            "status": 0
                        },
                        {
                            "index": 43,
                            "keyword": "搜索关键词-42",
                            "count": 153,
                            "range": 67,
                            "status": 1
                        },
                        {
                            "index": 44,
                            "keyword": "搜索关键词-43",
                            "count": 51,
                            "range": 44,
                            "status": 0
                        },
                        {
                            "index": 45,
                            "keyword": "搜索关键词-44",
                            "count": 983,
                            "range": 27,
                            "status": 1
                        },
                        {
                            "index": 46,
                            "keyword": "搜索关键词-45",
                            "count": 429,
                            "range": 27,
                            "status": 1
                        },
                        {
                            "index": 47,
                            "keyword": "搜索关键词-46",
                            "count": 991,
                            "range": 25,
                            "status": 1
                        },
                        {
                            "index": 48,
                            "keyword": "搜索关键词-47",
                            "count": 720,
                            "range": 16,
                            "status": 0
                        },
                        {
                            "index": 49,
                            "keyword": "搜索关键词-48",
                            "count": 653,
                            "range": 10,
                            "status": 0
                        },
                        {
                            "index": 50,
                            "keyword": "搜索关键词-49",
                            "count": 711,
                            "range": 49,
                            "status": 1
                        }
                    ],
                    "offlineData": [
                        {
                            "name": "Stores 0",
                            "cvr": 0.6
                        },
                        {
                            "name": "Stores 1",
                            "cvr": 0.8
                        },
                        {
                            "name": "Stores 2",
                            "cvr": 0.4
                        },
                        {
                            "name": "Stores 3",
                            "cvr": 0.6
                        },
                        {
                            "name": "Stores 4",
                            "cvr": 0.3
                        },
                        {
                            "name": "Stores 5",
                            "cvr": 0.9
                        },
                        {
                            "name": "Stores 6",
                            "cvr": 0.8
                        },
                        {
                            "name": "Stores 7",
                            "cvr": 0.4
                        },
                        {
                            "name": "Stores 8",
                            "cvr": 0.7
                        },
                        {
                            "name": "Stores 9",
                            "cvr": 0.6
                        }
                    ],
                    "offlineChartData": [
                        {
                            "date": "09:01",
                            "type": "客流量",
                            "value": 28
                        },
                        {
                            "date": "09:01",
                            "type": "支付笔数",
                            "value": 20
                        },
                        {
                            "date": "09:31",
                            "type": "客流量",
                            "value": 70
                        },
                        {
                            "date": "09:31",
                            "type": "支付笔数",
                            "value": 35
                        },
                        {
                            "date": "10:01",
                            "type": "客流量",
                            "value": 58
                        },
                        {
                            "date": "10:01",
                            "type": "支付笔数",
                            "value": 47
                        },
                        {
                            "date": "10:31",
                            "type": "客流量",
                            "value": 92
                        },
                        {
                            "date": "10:31",
                            "type": "支付笔数",
                            "value": 41
                        },
                        {
                            "date": "11:01",
                            "type": "客流量",
                            "value": 11
                        },
                        {
                            "date": "11:01",
                            "type": "支付笔数",
                            "value": 31
                        },
                        {
                            "date": "11:31",
                            "type": "客流量",
                            "value": 62
                        },
                        {
                            "date": "11:31",
                            "type": "支付笔数",
                            "value": 108
                        },
                        {
                            "date": "12:01",
                            "type": "客流量",
                            "value": 86
                        },
                        {
                            "date": "12:01",
                            "type": "支付笔数",
                            "value": 53
                        },
                        {
                            "date": "12:31",
                            "type": "客流量",
                            "value": 51
                        },
                        {
                            "date": "12:31",
                            "type": "支付笔数",
                            "value": 37
                        },
                        {
                            "date": "13:01",
                            "type": "客流量",
                            "value": 100
                        },
                        {
                            "date": "13:01",
                            "type": "支付笔数",
                            "value": 100
                        },
                        {
                            "date": "13:31",
                            "type": "客流量",
                            "value": 24
                        },
                        {
                            "date": "13:31",
                            "type": "支付笔数",
                            "value": 17
                        },
                        {
                            "date": "14:01",
                            "type": "客流量",
                            "value": 46
                        },
                        {
                            "date": "14:01",
                            "type": "支付笔数",
                            "value": 75
                        },
                        {
                            "date": "14:31",
                            "type": "客流量",
                            "value": 48
                        },
                        {
                            "date": "14:31",
                            "type": "支付笔数",
                            "value": 77
                        },
                        {
                            "date": "15:01",
                            "type": "客流量",
                            "value": 53
                        },
                        {
                            "date": "15:01",
                            "type": "支付笔数",
                            "value": 62
                        },
                        {
                            "date": "15:31",
                            "type": "客流量",
                            "value": 59
                        },
                        {
                            "date": "15:31",
                            "type": "支付笔数",
                            "value": 89
                        },
                        {
                            "date": "16:01",
                            "type": "客流量",
                            "value": 77
                        },
                        {
                            "date": "16:01",
                            "type": "支付笔数",
                            "value": 44
                        },
                        {
                            "date": "16:31",
                            "type": "客流量",
                            "value": 92
                        },
                        {
                            "date": "16:31",
                            "type": "支付笔数",
                            "value": 39
                        },
                        {
                            "date": "17:01",
                            "type": "客流量",
                            "value": 12
                        },
                        {
                            "date": "17:01",
                            "type": "支付笔数",
                            "value": 26
                        },
                        {
                            "date": "17:31",
                            "type": "客流量",
                            "value": 84
                        },
                        {
                            "date": "17:31",
                            "type": "支付笔数",
                            "value": 74
                        },
                        {
                            "date": "18:01",
                            "type": "客流量",
                            "value": 38
                        },
                        {
                            "date": "18:01",
                            "type": "支付笔数",
                            "value": 58
                        },
                        {
                            "date": "18:31",
                            "type": "客流量",
                            "value": 25
                        },
                        {
                            "date": "18:31",
                            "type": "支付笔数",
                            "value": 61
                        }
                    ],
                    "salesTypeData": [
                        {
                            "x": "家用电器",
                            "y": 4544
                        },
                        {
                            "x": "食用酒水",
                            "y": 3321
                        },
                        {
                            "x": "个护健康",
                            "y": 3113
                        },
                        {
                            "x": "服饰箱包",
                            "y": 2341
                        },
                        {
                            "x": "母婴产品",
                            "y": 1231
                        },
                        {
                            "x": "其他",
                            "y": 1231
                        }
                    ],
                    "salesTypeDataOnline": [
                        {
                            "x": "家用电器",
                            "y": 244
                        },
                        {
                            "x": "食用酒水",
                            "y": 321
                        },
                        {
                            "x": "个护健康",
                            "y": 311
                        },
                        {
                            "x": "服饰箱包",
                            "y": 41
                        },
                        {
                            "x": "母婴产品",
                            "y": 121
                        },
                        {
                            "x": "其他",
                            "y": 111
                        }
                    ],
                    "salesTypeDataOffline": [
                        {
                            "x": "家用电器",
                            "y": 99
                        },
                        {
                            "x": "食用酒水",
                            "y": 188
                        },
                        {
                            "x": "个护健康",
                            "y": 344
                        },
                        {
                            "x": "服饰箱包",
                            "y": 255
                        },
                        {
                            "x": "其他",
                            "y": 65
                        }
                    ],
                    "radarData": [
                        {
                            "name": "个人",
                            "label": "引用",
                            "value": 10
                        },
                        {
                            "name": "个人",
                            "label": "口碑",
                            "value": 8
                        },
                        {
                            "name": "个人",
                            "label": "产量",
                            "value": 4
                        },
                        {
                            "name": "个人",
                            "label": "贡献",
                            "value": 5
                        },
                        {
                            "name": "个人",
                            "label": "热度",
                            "value": 7
                        },
                        {
                            "name": "团队",
                            "label": "引用",
                            "value": 3
                        },
                        {
                            "name": "团队",
                            "label": "口碑",
                            "value": 9
                        },
                        {
                            "name": "团队",
                            "label": "产量",
                            "value": 6
                        },
                        {
                            "name": "团队",
                            "label": "贡献",
                            "value": 3
                        },
                        {
                            "name": "团队",
                            "label": "热度",
                            "value": 1
                        },
                        {
                            "name": "部门",
                            "label": "引用",
                            "value": 4
                        },
                        {
                            "name": "部门",
                            "label": "口碑",
                            "value": 1
                        },
                        {
                            "name": "部门",
                            "label": "产量",
                            "value": 6
                        },
                        {
                            "name": "部门",
                            "label": "贡献",
                            "value": 5
                        },
                        {
                            "name": "部门",
                            "label": "热度",
                            "value": 7
                        }
                    ]
                }
            }
        },
        timeout: 5000
    }
]
