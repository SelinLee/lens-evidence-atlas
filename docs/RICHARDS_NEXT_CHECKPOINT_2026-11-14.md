# Richards 2023补证检查点

本检查点为批次前历史范围；001i本批已发布，当前结果和剩余缺口以[实际补证核验](RICHARDS_REVIEW_2026-11-14.md)及任务清单为准。

QUALITY-001i；2026-11-14。接续已发布Li2022批次；本记录不是已录入新测量的声明，持续目标保持active。

## 去重与入选

[Hybrid achromatic microlenses with high numerical apertures and focusing efficiencies across the visible](https://www.nature.com/articles/s41467-023-38858-y)，Corey A. Richards等，Nature Communications 14, 3119 (2023)，DOI **10.1038/s41467-023-38858-y**。已在`app_14`有`richards_main`及`richards_high`、目录来源`richards`，不能新建成第二篇论文。选择补证因为旧记录缺SI、逐波长效率及高NA不同配置；这项折射/衍射混合方案可作比较，但需明确不同于纯金属透镜，不能据此给全库排名。未用引用量或影响因子。

## 本轮已取得与核验

- 独立无头Google Chrome读正式网页HTTP200、PMC镜像HTTP203；取得正式主文11页和SI15页，未用DTU带封面页序替代正式PDF页码。
- SI已读§4/5/8相关文字与表格，视觉核**PDF p.9 Table S1**。四个实际测点488/542/612/633nm；NA列注明**at 633nm**，不默认各波长恒定。八配置对应主文Fig.5a–h。
- S1首行是10个相同打印透镜的均值，其余Fig.5b–h各测1个；32个效率值不可当32个独立物理配置，也不能把所有行设成n=10。表中Focusing Error为各配置汇总百分数，需要继续核主文定义/参考，不能直接改为μm焦移或逐点Δf。
- 已读SI p.5–6关于PSF/SR的文字：逐波长取最大强度焦面；每种结构随机选一镜，平滑降噪后与同NA理想参考比较；积分面积16πλ²，低NA衍射镜例外64πλ²。需视觉核图和Methods后才补具体协议，不从SR曲线估读数值。
- 正式Data availability称向通讯作者请求；页面附件只有SI及Peer Review File，未列Source Data。尚未完成作者仓库检索，不声称公开原始数据不存在。

## 接下来必须完成

1. 主文Fig.2/3/5及Methods、SI对应图视觉复核，确认各配置口径、设计焦距/结构、NA归属和高NA设计差异；实际焦距若只在曲线则留空，不用NA反算。
2. 逐格取S1效率与统计，核实实验分母、焦圈、逐波长最佳焦面与模拟分母的区别；主文最高效率不与十样品均值混用。旧`richards_high`的概述范围需和S1原表对应，而非直接替换成一个常数。
3. 在统一文献矩阵与已有app_14之间复用同一论文编号，主文/SI同研究；验证实现和数据引用，避免因目录/设备来源前缀生成双编号。同一几何配置跨域链接不计成两篇研究。
4. 核PSF/MTF原始数据、采样尺度及处理条件；仅有曲线不填作者原始数值。录入、测试、PR、Pages及Chrome验收后关闭本批，父目标继续。

## 材料定位

原文/图像仅在本机研究目录，不提交公开仓库。

| 文件 / 入口 | SHA256 |
| --- | --- |
| [`s41467-023-38858-y.pdf`](https://www.nature.com/articles/s41467-023-38858-y.pdf)，11页 | `53fb735d12653c6d702d8af7965e24612bde969163106fcad1afe20e83c272e9` |
| [`41467_2023_38858_MOESM1_ESM.pdf`](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-023-38858-y/MediaObjects/41467_2023_38858_MOESM1_ESM.pdf)，15页；S1位于p.9 | `1147b8418a04eed9a2a4ad08331ecf2be37bf5cf275c220eef2276cfab41d022` |

本机暂存：`/tmp/lens-mtf-audit/richards2023-main.pdf`、`richards2023-si.pdf`、对应layout文本及`richards2023-si9.png`。下轮以原文件/原图和当前仓库为准，不把此检查点当全文精读或数据库交付。
