# Hasegawa 2026 的缩比和柱面模型、实物测量

论文 *Millimeter-Scale Single-Layer RGB Achromatic Metalens via Time-Simultaneity-Free Design* 于 2026-11-11 在 *Laser & Photonics Reviews* 正式上线。期刊为 2025 年 3 月中科院升级版物理与天体物理大类一区。研究实制了 1 mm 单层 SiN 圆形镜片，以波长相关的常数相位偏置校正离散 RGB 光学焦点。沿同一文献编号补录主文 §§2.2–2.4 的模型。查期刊索引提供的正式版正文和图注。可见光实物的焦斑和 MTF 图由作者机构复刊核过。 [期刊正式稿](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174) · [期刊上线目录](https://onlinelibrary.wiley.com/toc/18638899/0/0?journalRedirectCheck=true) · [2025 分区](https://www.ais.cn/journal/database/5537) · [原实物核验](HASEGAWA_2026_REVIEW_2026-11-18.md)

## 30 μm 模型

主文印刷 pp.4–5 §2.2 和 Fig. 2d 明确作为聚焦模拟将模型缩至 D = 30 μm、NA = 0.1。镜片位于 z = 0，归一化轴向强度图比较 DC 偏置优化前后。作者汇总优化后的 450、532、633 nm 焦距为 **150 ± 6 μm**。原文未给逐色精确表值或说明 ± 对应标准差、误差界限或其他统计口径。中心值与 ± 印字作为原文汇总保存，逐波长模拟焦位列留空。 [主文 Fig. 2d](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=4)

p.9 §2.4 总结 Fig. S2 与 Table S3 的另一个 30 μm 模型评估。作者报告 x、y、LCP、RCP 四种偏振的模拟聚焦效率高于 80%，偏振依赖低于 4%。图表未取得，具体归一化分母、偏振统计及该配置与 Fig. 2d 的关系仍待核。仅按作者原述记录两项界限。紧邻的 Fig. S1 与 Table S2 段写明对设计波长 ±5 nm 作数值评估，其后又用实测措辞修饰焦距指标。2%／6%／5% 的器件归属、参考和证据性质等待对表。 [主文补件引用](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=9)

## 1 mm 柱面模型与圆形实物

主文 p.5 §2.3、p.6 Fig. 3c,e 的 1 mm 尺度对应 x 向单行元胞的柱面近似，NA 0.1。作者用 Rayleigh–Sommerfeld 积分计算焦面剖面。相位误差推得的单色 Strehl `Sφ = exp(−MSEλ)` 表征相位偏差引起的峰强损失。p.7 §2.4 对 Fig. 3c 优化后模型的 PSF 计算另一种 Strehl，将模拟和理想 x 向剖面分别在 50 μm 窗内等积分归一后比较峰值。两种模型指标使用各自的字段，实物 PSF Strehl 沿用实验字段。 [§2.3 与 Fig. 3](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=5) · [§2.4](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=7)

| 设计波长 (nm) | 柱面相位 Strehl，优化前 | 柱面相位 Strehl，优化后 | 柱面 PSF Strehl，优化后 | 圆形实物 PSF Strehl |
| --- | ---: | ---: | ---: | ---: |
| 450 | 0.74 | 0.78 | 0.98 | 0.80 |
| 532 | 0.53 | 0.61 | 0.97 | 0.97 |
| 633 | 0.33 | 0.54 | 0.95 | 0.95 |

优化后三项相位 Strehl 的乘积约 0.257，与作者取整的 0.26 一致。同节列出 Fig. 3b 的 1 mm、NA 0.1 Maréchal 相位效率 0.23，两处分别保存原文口径。此相位指标的分母涉及理想峰强，实物焦面透过功率归一化的聚焦效率另见 p.7–8。原文 p.7 给出 450、532、633 nm 的理论参考 FWHM 2.25、2.64、3.05 μm，已附在三个准直激光实测宽度的说明中。按正文印字，圆形实物准直激光三色焦距跨度为 90 μm，500 mm 物距卤素滤光三色峰位跨度为 30 μm。两项为各组最大值减最小值，印字精度 0.01 mm。 [主文模型及实验](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=7)

## 数据入口与缺口

p.14 列补件 `lpor72174-sup-0001-SuppMat.pdf`。补件直连、Wiley 下载接口和资源路径在本机独立无头 Chrome 均返回 403。已查期刊 Early View、题录、作者机构联合发布及补件文件名索引，未取得可核验补件原文件。Methods §4.3 将滤光片规格列于 Table S4，轴扫装置见 Figs. S5–S6。作者 Data Availability 指向合理请求。追加记录采用主文印字，逐偏振和失谐原表、横向实际采样、原始 PSF 和逐频 MTF 仍待核。 [补件入口](https://onlinelibrary.wiley.com/doi/suppl/10.1002/lpor.72174/supinfo/lpor72174-sup-0001-SuppMat.pdf) · [作者机构 MTF 复刊图](https://www.tuat.ac.jp/images/tuat/outline/disclosure/pressrelease/2026/20261111_01_03.png)

## 2026-11-20 复核两套实物光路的三色跨度

按主文 §2.4 与 §4.3 重核。Fig. 4 的 450、532、633 nm 是准直激光实测焦距，分别为 5070、5030、4980 μm，按原文印字计算跨度 **90 μm**。作者报告各点相对 5050 μm 的偏差为 −1.4% 至 +0.4%。Fig. 5b,d,f 是卤素灯、滤片、物距 500 mm 的有限共轭实验，分别直报 z = 5080、5100、5110 μm，三色峰位跨度为 **30 μm**。作者报告这些峰位相对 Fig. 5 中 5050 μm 的标称参考线的最大偏差小于 1.2%。三条峰位已移入有限共轭实测像距轴。计算的有符号距离差仍以作者图中 5050 μm 的设计焦距线为参考，有限共轭设计像距未报告。

两组跨度均关联各自三条测量记录，精度取决于原文 0.01 mm 印字。要量化测量不确定度，还缺轴扫步长、重复测量和定位规则。卤素光路的 400、490、580、680 nm 只有 Fig. 5 的强度图，数值继续留空。正文的 2%／6%／5% 属于 ±5 nm 失谐讨论。§2.4 一处称数值评估，紧接处又用测量措辞。该段的参考、器件归属和证据性质仍需 Fig. S1、Table S2 核对，数据库保留空值。[准直激光 §2.4](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=7) · [滤光扫描 Fig. 5](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=8) · [测量 §4.3](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=12)

补查原文致谢中的东京大学 ARIM 项目 JPMXP1226UTU1231。按完整项目号和论文题名检索未定位数据集。公开详细检索在无头 Chrome 返回 HTTP 202、空响应，报告索引 404，未完成馆内数据集检索。Iwami 课题组更新公告指向 Wiley 正式页和大学发布说明。Wiley 补件直连仍返回 403。现有原始记录仍可按正文重核，逐频 MTF、二维强度原数组以及 Table S2–4 尚缺。[ARIM 公共目录](https://nanonet.go.jp/data_service/) · [大学研究说明](https://www.tuat.ac.jp/outline/disclosure/pressrelease/2026/20261111_01.html) · [期刊补件](https://onlinelibrary.wiley.com/doi/suppl/10.1002/lpor.72174/supinfo/lpor72174-sup-0001-SuppMat.pdf)

## 2026-11-25 同一入射功率参照和理想焦斑

按 §2.4 pp.7–8 的两个实测功率比，设透过率 `T=P_out/P_in`、作者聚焦效率 `η_exp=P_focus/P_out`，其中 `P_in` 是 1 mm 口径内入射功率。仅对同一光路实物的三个准直激光波长作本库换算 `η_in=T×η_exp`。两个百分比输入为作者整数印字，换算结果保留约值、1 位小数及运算来源。焦区作者称 3×FWHM，半径/直径定义及积分形状待核。无逐次功率和不确定度原数。

| 波长 (nm) | 作者透过率 (%) | 作者透过功率分母效率 (%) | 本库换算入射功率分母效率 (约 %) | 实测 x 向 FWHM (μm) | 作者写明的理论 FWHM (μm) |
| --- | ---: | ---: | ---: | ---: | ---: |
| 450 | 55 | 8 | 4.4 | 2.75 | 2.25 |
| 532 | 80 | 26 | 20.8 | 2.65 | 2.64 |
| 633 | 82 | 23 | 18.9 | 3.39 | 3.05 |

原文的理论参考 FWHM 三值单独进入模型参考字段，基于 Fig. 4d 所用理想曲线，未核到精确公式。p.9 §2.5 作者从约 1.2 mm 的传感器有效像圈给总角视场 9.8°（±4.9°）；对应物距 20 mm、USAF 放大率 0.38 的实拍配置。Fig. 6c 文中给出 10 lp/mm 的亮暗差判据（高于最大值的 15%），其频率参考面、方向及明确对比度公式待核，不当作系统 MTF 数值。[正式稿 §2.4](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=7) · [§2.5](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174#page=9)

2026-11-25 本机独立无头 Chrome 取得大学正式发布 PDF 1337214 字节及 502×419 的复刊实测 MTF 图。图中频率轴 cycles/mm、x 截线、色彩图谱同前记录，未核到原 PSF 与逐频数表。Crossref 登记可达，Europe PMC 精确 DOI、DataCite 关联查找均零项。补件直连实际 403，另部分出版商入口连接复位。原文 ARIM 号 `JPMXP1226UTU1231`，大学发布 PDF p.5 则为 `JPMXP1226UT1231`。已查两种印字及课题号，尚未定位公开附属数据。失谐 2%／6%／5% 的归属和逐偏振原值继续留空。[大学联合发布 PDF](https://www.tuat.ac.jp/documents/tuat/outline/disclosure/pressrelease/2026/20261111_01.pdf) · [复刊图](https://www.tuat.ac.jp/images/tuat/outline/disclosure/pressrelease/2026/20261111_01_03.png)
