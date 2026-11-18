# Li 2026 随机马赛克消色差镜核验

## 纳入与器件

Chi Li 等的 *Disordered mosaic metasurfaces with scalable functional density* 发表于 Nature Communications 17, 4835，DOI 10.1038/s41467-026-71774-5，在线发表日为 2026-04-09。2026-11-18 核对的 2025 年中科院分区升级版公开条目列该刊为综合性期刊大类一区。纳入实制焦斑和色散对照，本批测量为近红外。补充 Fig. S6 的可见光到红外结果属于模拟。

主文 PDF pp5–6 Fig. 4a/d–e 给出实制十一通道镜，圆形口径 8.1 mm，网格 1000×1000，元像素边长 8.1 μm。Methods 给出 100 nm a-Si 和 500 μm 石英基板。补充 p27 Table S3 的本研究行给 NA 0.15。测试为 1200–1400 nm 的十一处间隔 20 nm 的谱点。逐波长实测焦距与正式设计焦距留待补证。

[期刊原文](https://www.nature.com/articles/s41467-026-71774-5.pdf) · [2025 大类分区条目](https://www.ais.cn/journal/database/8402)

## 轴向色差与焦斑

- 主文 Fig. 4d 将 27.76 mm 标为跨谱图的共同轴向参考。主文仅报告相对单份额对照的焦移约 1/30。对照覆盖 1230–1330 nm，主镜覆盖 1200–1400 nm。两个量程分别保留，绝对焦移与逐波长焦位留空。
- Fig. 4c 单份额色散对照以 1280 nm 为中心，面积份额 p=1/11。图上印有三个焦距，沿各行轴向强度主峰定位，1230 nm 对应 27.2 mm，1280 nm 对应 26.1 mm，1330 nm 对应 25.1 mm。正文约 2 mm，按两端印字相减为 2.1 mm。单份额样片口径及轴向误差待核。
- 补充 pp10–11 Note 3B、Fig. S8 给 PSF 光路。圆偏振入射、交叉圆偏振检测、10× NA 0.3 物镜、1 μm 轴向步长。每谱点评价面选择及双轴物方标尺待核。
- 补充 p26 Table S2 列十一处 FWHM、Strehl 与旁瓣／主瓣比。保留 FWHM 和 Strehl 原表的 ±，其统计类型和重复数待核。FWHM 5.38–8.82 μm，Strehl 0.623–0.871，旁瓣／主瓣比 0.064–0.298。补充 p3 Note 1A 定义 Strehl 为实测和理想二维焦斑各按全强度积分归一后的峰值比。Fig. 4f 图注的约 0.78 与主文跨谱平均 0.78 ± 0.07 同值，逐点 1200 nm 采用 Table S2 的 0.809 ± 0.006。

[补充 PDF](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-026-71774-5/MediaObjects/41467_2026_71774_MOESM1_ESM.pdf)

## 效率及波长冲突

补充 p14 Fig. S13 的效率属于独立 800 μm 双份额样片。作者报告短、长两通道为 25.4%、37.5%，两份额平均约 32%。长波图内、图注与正文均为 1215 nm。短波面板 b 与共振正文写 1001 nm，图注写 1006 nm 激光，另有短波设计目标 1000 nm。短波效率原值保留，测量波长留空。约 2.5 nm 为该节所述激光线宽，功率分母和焦区积分口径未见明示。Note 2B 和 Fig. S4 的 3× 理想 FWHM 圈用于另组采样研究。8.1 mm 主镜效率留空。补充 p13 Fig. S12 的十份额透过谱也单独归档。

## 已公开数据与可复算边界

- Source Data 的 `fig4d` 工作表名称与内容不一致。A2:B54 是 53 个实测点，标题为 `exp_x_um` 与 `exp_y_norm`，对应主文 **Fig. 4f** 中 1200 nm 焦面的横向剖面。C2:D1001 是拟合，E2:F1001 是理论。A 列相邻坐标间隔约 0.7603125 μm 为本库计算。实验列梯形积分约为 1，与图注面积归一一致，当前只确认该剖面采样间隔。
- 作者 GitHub 数据仓库的 11 个 `MetasurfaceVecLH0LV*.mat` 均已核 blob SHA。每个文件含六个 60×60 的 `A/D/H/L/R/V` 阵列与 2448×2048 的 `imageData2D`。命名及阵列与同文矢量光偏振表征相符，未取得将它们对应 Fig. 4 透镜焦斑的元数据。评审记录只有当前轮结论。PMC 版本清单含同一 Source Data，没有额外公布的轴扫或 MTF 表。
- 复算光学 MTF 所需的二维焦面强度、双轴物方尺度及相关处理条件尚缺。逐频 MTF、主镜逐波长轴向峰位、实测横色差及主镜聚焦效率均留缺。

[出版社数表](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-026-71774-5/MediaObjects/41467_2026_71774_MOESM3_ESM.xlsx) · [作者仓库](https://github.com/Chi0000000001/raw_data_mosaic_work) · [PMC 文件清单](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC13223217.1%2F)
