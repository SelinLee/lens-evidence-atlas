# Shen 2020 液晶超透镜的消色差与色散切换

Zhixiong Shen 等，*Advanced Photonics* 2(3), 036002，2020-05-12，DOI `10.1117/1.AP.2.3.036002`。2026-11-21 查 Crossref 138 次、OpenAlex 149 次。以经典原始研究纳入，实验在同一制备镜片上切换两种光学状态。南京大学存档正式 PDF 为 3529391 字节，SHA-256 `f8f1d5e60dd7451084a6064c4596221ff0e4c0b1a3c76c62014775a1598c6a44`。全部测量处于太赫兹频段。[期刊](https://doi.org/10.1117/1.AP.2.3.036002) · [正式 PDF](https://light.nju.edu.cn/upload/file/20250515/152_202505151551357801.pdf) · [Crossref](https://api.crossref.org/works/10.1117/1.ap.2.3.036002) · [OpenAlex](https://api.openalex.org/works/W3025422990)

p3 §2.1 报告设计半径 3240 μm，对应 54 个 60 μm 径向周期。据此换算设计全口径 **6.48 mm**。无偏压设计焦距 **15.0 mm**。硅柱的名义模型高度 200 μm，实物存在刻蚀高度梯度。主文未报明确 NA 数值或有效照明口径。硅柱谐振相位匹配目标色散斜率，图案化液晶提供额外的几何相位补偿。饱和偏压使液晶沿 z 取向，镜片保留硅柱造成的色散。[正式 PDF pp2–4](https://light.nju.edu.cn/upload/file/20250515/152_202505151551357801.pdf#page=3)

| 同一枚实物的状态 | p4 Fig. 3e 实测焦距 | Fig. 3f 横向强度 FWHM 的固定面 | p5 作者报告平均效率 |
| --- | --- | --- | --- |
| 0 V，无偏压 | 正文概述约 12 mm，逐频曲线见红色方块 | z=12 mm | 约 26.1% |
| 饱和，75 Vrms／1 kHz 交流方波 | 随频率升高而减小，逐频曲线见蓝色方块 | z=13 mm | 约 33.9% |

- 0.9–1.4 THz 是连续设计区间。Fig. 3e–g 分别有 0.9、1.0、1.1、1.2、1.3、1.4 THz 六个离散实验谱点。按真空光速换算记录整数 nm，保留 THz 原值。Fig. 3b,d 的归一化 xz／xy 场图各选 0.9、1.1、1.4 THz 展示。
- Fig. 3e 的纵轴为焦距 mm，Fig. 3f 的纵轴为 FWHM μm，Fig. 3g 的纵轴为效率 %。各图横轴均为 THz。§3.3 报告横向步进 0.25 mm、轴向步进 1 mm，对 Ex 场数据做插值。正文未给插值方法、轴向物理零点、F 的精确取峰协议或各面板误差条定义。
- p5 §2.2 把效率描述为焦平面 THz 强度与入射 LCP THz 功率的比。没有写积分径、取样窗、效率评价面具体 z 或光谱平均权重。两跨频均值为作者由实测计算，保留原文约值。逐频最佳焦位、残余轴差、相同场点的横向色差、单频宽度／效率数表、Strehl、原始 PSF 和 MTF 均留空。
- p5 §2.3 Fig. 4 用 24 mm 固定物距和 24 mm 固定像距观察金膜靶标，呈现 0.9 和 1.4 THz 的强度与相位。加偏压的 0.9 THz 图离焦，分别登记两种电压状态。有限共轭成像距离与焦距及 Fig. 3 的固定测量面分列。

[焦位、FWHM 与效率](https://light.nju.edu.cn/upload/file/20250515/152_202505151551357801.pdf#page=4) · [同面成像及效率定义](https://light.nju.edu.cn/upload/file/20250515/152_202505151551357801.pdf#page=5) · [扫描方法](https://light.nju.edu.cn/upload/file/20250515/152_202505151551357801.pdf#page=6)

## 补充材料与原始数据

正式 PDF 的补件链接和 DOI Handle 均指向 `AP_2_3_036002_ds001.docx`，独立无头 Chrome 打开直连得到 HTTP 200 的 HTML，未取得 DOCX。Crossref 组件登记可用。主文指明补件 S2／S3 为刻蚀偏差、S4 为跨频场分布及效率分析、S5 为成像。DataCite 按正式 DOI 的精确关联检索返回零项。本轮未核到逐频轴峰及原始场数组。[补件登记](https://api.crossref.org/works/10.1117/1.ap.2.3.036002.s01) · [原刊补件](https://doi.org/10.1117/1.AP.2.3.036002.s01) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1117%2F1.AP.2.3.036002%22)
