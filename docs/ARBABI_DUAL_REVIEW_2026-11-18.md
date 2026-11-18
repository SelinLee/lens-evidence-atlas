# Arbabi 2018 正交偏振双波长物镜

Ehsan Arbabi 等，*Nano Letters* 18(8), 4943–4948，DOI 10.1021/acs.nanolett.8b01737。出版社和 Crossref 的正式在线日期为 2018-07-17，卷期日期为 2018-08-08。2026-11-18 查 Crossref 109 次，按经典文献纳入。原始工作报告一只 1.6 mm、NA 0.5 的实制物镜，给出了同器件两通道的实测轴向峰位、横向焦斑和聚焦效率。[期刊入口](https://pubs.acs.org/doi/10.1021/acs.nanolett.8b01737) · [Crossref](https://api.crossref.org/works/10.1021/acs.nanolett.8b01737)

## 两色共焦设计及实测峰位

物镜由高 407 nm 的矩形多晶硅柱、熔石英基底和 SU-8 覆盖层组成，晶格周期 310 nm。利用矩形柱的结构双折射，设计分别控制 **605 nm 的 y 线偏振**与 **820 nm 的 x 线偏振**，名义焦距约 1386 μm。作者博士论文 §3.6 对应同篇原作，器件几何见印刷 pp68–69 Fig. 3.18，强度分布见 pp69–70 Fig. 3.19。[第一作者博士论文](https://thesis.caltech.edu/11481/8/Ehsan_s_Thesis-2019-05-02.pdf#page=89)

| 实验条件 | 实测轴向峰位 | 横向实测 FWHM | 作者理论宽度 | 实测聚焦效率及焦圈 |
| --- | --- | --- | --- | --- |
| 600 nm 中心、约 10 nm FWHM、y 线偏振 | 1380 μm | 约 0.68 μm | 0.62 μm | 27%，透镜焦面等效直径 5 μm |
| 822 nm 二极管、x 线偏振 | 1376 μm | 约 0.93 μm | 0.85 μm | 61%，透镜焦面等效直径 10 μm |

本库由作者两个轴向峰位计算差值 **4 μm**。计算对象为这两个实际光源和偏振。Fig. 3.19 左栏为 y–z 强度图，横轴以 μm 标 z，右栏为焦面 x–y 强度图，色标为 0–1 a.u.。实物轴扫采用准直照明，收集显微物镜 NA 0.95。作者正文讨论 595 与 605 nm 光源边缘间约 20 μm 的色散，用于解释短波轴向强度拉长。两个边缘各自的实测峰位、z 步长、空间采样、横向色差及测量不确定度待补。[博士论文 PDF pp90–91](https://thesis.caltech.edu/11481/8/Ehsan_s_Thesis-2019-05-02.pdf#page=90) · [正式补充 PDF p4 Fig. S3](https://authors.library.caltech.edu/records/3ngwx-46089/files/nl8b01737_si_001.pdf?download=1)

## 效率与像质的证据边界

- 27% 与 61% 的分母均为总入射功率，分子为经焦面圆孔的功率。探测器前孔径分别约 0.55、1.1 mm。Fig. S3b 的入射光束在透镜面约 550 μm FWHM，超过 99% 的入射光通过器件。轴扫和效率使用不同的测量光路。比较两通道的效率时须保留焦圈及不同带宽。[博士论文 PDF p91](https://thesis.caltech.edu/11481/8/Ehsan_s_Thesis-2019-05-02.pdf#page=91) · [正式补充 PDF p4 Fig. S3b](https://authors.library.caltech.edu/records/3ngwx-46089/files/nl8b01737_si_001.pdf?download=1)
- 补件 §S1 的平面波传播模型在 580–620 nm 取 41 点，以滤片透过率加权强度。直径 5 μm 圆内功率除以器件前总功率，模型给有限带宽约 38%、单色 600 nm 约 63%。作者用实测 27% 和模型修正估计单色实测效率约 45%。按三项印字计算，27%×63/38≈44.8%。入库保留估算来源和三项输入，实测单色效率留空。[正式补充 PDF p6 §S1](https://authors.library.caltech.edu/records/3ngwx-46089/files/nl8b01737_si_001.pdf?download=1)
- 显微系统的光路图和对照图归入独立配置。作者以同色标对读 Fig. 3.20b–c，超透镜图计数约为对照的 0.06，激发输入功率约为对照的 4.7 倍。该观察对应完整的激发与收集光路。[博士论文 PDF p92 Fig. 3.20](https://thesis.caltech.edu/11481/8/Ehsan_s_Thesis-2019-05-02.pdf#page=92) · [正式补充 PDF pp2、7](https://authors.library.caltech.edu/records/3ngwx-46089/files/nl8b01737_si_001.pdf?download=1)

已获取校方馆藏的正式补件 `nl8b01737_si_001.pdf`（7 页，1377438 字节，MD5 aa9d2ac65fd918528461d3070669ed55），以及作者博士论文（274 页，9278888 字节）。出版摘要和补件目录可核，出版社正式正文 PDF 的独立 Chrome 请求返回 403。馆藏记录只列补充 PDF，DataCite 精确关联 DOI 查询为零，作者组成果页回链期刊。未取得强度数组、相机标定、MTF 数表或曲线及 Strehl。图示标尺用于识别图的尺度，没有把渲染图作为原始 PSF 复算。[CaltechAUTHORS](https://authors.library.caltech.edu/records/3ngwx-46089) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1021%2Facs.nanolett.8b01737%22&page%5Bsize%5D=25) · [作者组成果索引](https://www.photonics.caltech.edu/publications.html)
